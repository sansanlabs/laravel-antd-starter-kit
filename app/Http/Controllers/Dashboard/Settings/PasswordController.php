<?php

namespace App\Http\Controllers\Dashboard\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Response;

class PasswordController extends Controller {
  public function index(): Response {
    inertia()->share([
      "activeMenuContent" => "password",
      "breadcrumb" => [
        [
          "title" => __("lang.settings"),
          "url" => route("profile.index"),
        ],
        [
          "title" => __("lang.password"),
        ],
      ],
    ]);
    return inertia("dashboard/settings/password/index");
  }

  public function update(Request $request): RedirectResponse {
    $validatedData = $request->validate([
      "current_password" => ["required", "current_password"],
      "password" => ["required", Password::defaults(), "confirmed"],
    ]);

    $request->user()->update([
      "password" => Hash::make($validatedData["password"]),
    ]);

    return to_route("password.index");
  }
}
