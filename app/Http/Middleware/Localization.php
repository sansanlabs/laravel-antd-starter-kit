<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Localization {
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response {
    if (session()->has("locale")) {
      app()->setLocale(session("locale"));
    } else {
      session()->put("locale", "en");
      app()->setLocale("en");
    }
    $response = $next($request);

    return $response;
  }
}
