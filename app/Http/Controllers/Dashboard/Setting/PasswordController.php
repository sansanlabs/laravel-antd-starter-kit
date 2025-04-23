<?php

namespace App\Http\Controllers\Dashboard\Setting;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Inertia\Response;

class PasswordController extends Controller {
  public function index(): Response {
    inertia()->share([
      "activeMenuContent" => "password",
      "breadcrumb" => [
        [
          "title" => __("lang.settings"),
          "url" => route("settings.profile.index"),
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

    return to_route("settings.password.index");
  }
}
