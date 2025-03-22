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

      return back();
    } catch (\Throwable $th) {
      throw $th;
    }
  }
}
