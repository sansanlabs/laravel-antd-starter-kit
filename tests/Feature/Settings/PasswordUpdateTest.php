<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

test("password can be updated", function () {
  $user = User::factory()->create([
    "email_verified_at" => now(),
  ]);

  $response = $this->actingAs($user)
    ->withSession(["auth.password_confirmed_at" => time()])
    ->from("/dashboard/settings/password")
    ->put("/dashboard/settings/password", [
      "current_password" => "password",
      "password" => "new-password",
      "password_confirmation" => "new-password",
    ]);

  $response->assertSessionHasNoErrors()->assertRedirect("/dashboard/settings/password");

  expect(Hash::check("new-password", $user->refresh()->password))->toBeTrue();
});

test("correct password must be provided to update password", function () {
  $user = User::factory()->create([
    "email_verified_at" => now(),
  ]);

  $response = $this->actingAs($user)
    ->withSession(["auth.password_confirmed_at" => time()])
    ->from("/dashboard/settings/password")
    ->put("/dashboard/settings/password", [
      "current_password" => "wrong-password",
      "password" => "new-password",
      "password_confirmation" => "new-password",
    ]);

  $response->assertSessionHasErrors("current_password")->assertRedirect("/dashboard/settings/password");
});
