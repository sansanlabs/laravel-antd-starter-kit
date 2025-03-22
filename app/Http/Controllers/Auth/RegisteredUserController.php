<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;

class RegisteredUserController extends Controller {
  /**
   * Show the registration page.
   */
  public function create(): Response {
    return inertia("auth/register");
  }

  /**
   * Handle an incoming registration request.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(RegisterRequest $request): RedirectResponse {
    $validatedData = (object) $request->validated();

    try {
      $user = User::create([
        "name" => $validatedData->name,
        "email" => $validatedData->email,
        "password" => Hash::make($validatedData->password),
      ]);

      event(new Registered($user));

      auth()->login($user);

      return to_route("dashboard.index");
    } catch (\Throwable $th) {
      handleTrowable($th);
    }
  }
}
