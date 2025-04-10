<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\Localization;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
  ->withRouting(web: __DIR__ . "/../routes/web.php", commands: __DIR__ . "/../routes/console.php", health: "/up")
  ->withMiddleware(function (Middleware $middleware) {
    $middleware->encryptCookies(except: ["appearance"]);

    $middleware->web(append: [Localization::class, HandleAppearance::class, HandleInertiaRequests::class, AddLinkHeadersForPreloadedAssets::class]);
  })
  ->withExceptions(function (Exceptions $exceptions) {
    $exceptions->respond(function (Response $response, Throwable $exception, Request $request): RedirectResponse|Response {
      if (app()->environment(["production"]) && in_array($response->getStatusCode(), [500, 503, 404, 403])) {
        if (!$request->hasSession()) {
          $middlewares = [
            app(EncryptCookies::class),
            app(AddQueuedCookiesToResponse::class),
            app(StartSession::class),
            app(ShareErrorsFromSession::class),
            app(HandleInertiaRequests::class),
          ];

          $responseHandler = function ($request) use ($response) {
            return inertia("error", [
              "status" => $response->getStatusCode(),
            ])
              ->toResponse($request)
              ->setStatusCode($response->getStatusCode());
          };

          foreach (array_reverse($middlewares) as $middleware) {
            $next = $responseHandler;
            $responseHandler = fn($req) => $middleware->handle($req, $next);
          }

          return $responseHandler($request);
        }

        return inertia("error", [
          "status" => $response->getStatusCode(),
        ])
          ->toResponse($request)
          ->setStatusCode($response->getStatusCode());
      }

      if ($response->getStatusCode() === 419) {
        return back()->with([
          "message" => "The page expired, please try again.",
        ]);
      }

      return $response;
    });
  })
  ->create();
