<?php

namespace App\Http\Controllers\Dashboard\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class ProfileController extends Controller {
  public function index(): Response {
    inertia()->share([
      "activeMenuContent" => "profile",
      "breadcrumb" => [
        [
          "title" => __("lang.settings"),
          "url" => route("profile.index"),
        ],
        [
          "title" => __("lang.profile"),
        ],
      ],
    ]);
    return inertia("dashboard/settings/profile/index");
  }

  public function update(Request $request): RedirectResponse {
    $authUserId = auth()->id();
    $validatedData = $request->validate([
      "name" => ["required", "string", "max:255"],
      "email" => ["required", "string", "lowercase", "email", "max:255", "unique:users,email,{$authUserId}"],
    ]);

    try {
      $request->user()->fill($validatedData);

      if ($request->user()->isDirty("email")) {
        $request->user()->email_verified_at = null;
        $request->user()->sendEmailVerificationNotification();
      }

      $request->user()->save();

      return to_route("profile.index");
    } catch (\Throwable $th) {
      handleTrowable($th);
    }
  }

  public function destroy(Request $request): RedirectResponse {
    $request->validate([
      "password" => ["required", "current_password"],
    ]);

    try {
      $user = $request->user();

      auth()->logout();

      $user->delete();

      $request->session()->invalidate();
      $request->session()->regenerateToken();

      return to_route("home");
    } catch (\Throwable $th) {
      handleTrowable($th);
    }
  }
}
