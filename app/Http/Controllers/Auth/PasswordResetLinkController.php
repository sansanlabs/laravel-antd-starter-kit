<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Inertia\Response;

class PasswordResetLinkController extends Controller {
  /**
   * Show the password reset link request page.
   */
  public function create(Request $request): Response {
    return inertia("auth/forgot-password", [
      "status" => $request->session()->get("status"),
    ]);
  }

  /**
   * Handle an incoming password reset link request.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(Request $request): RedirectResponse {
    $request->validate([
      "email" => ["required", "email"],
    ]);

    try {
      Password::sendResetLink($request->only("email"));

      return back()->with("status", __("auth.forgot_password_status"));
    } catch (\Throwable $th) {
      handleTrowable($th);
    }
  }
}
