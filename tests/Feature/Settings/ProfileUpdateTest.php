<?php

use App\Models\User;

test("profile page is displayed", function () {
  $user = User::factory()->create([
    "email_verified_at" => now(),
  ]);

  $response = $this->actingAs($user)
    ->withSession(["auth.password_confirmed_at" => time()])
    ->get("/dashboard/settings/profile");

  $response->assertOk();
});

test("profile information can be updated", function () {
  $user = User::factory()->create([
    "email_verified_at" => now(),
  ]);

  $response = $this->actingAs($user)
    ->withSession(["auth.password_confirmed_at" => time()])
    ->put("/dashboard/settings/profile", [
      "name" => "Test User",
      "email" => "test@example.com",
    ]);

  $response->assertSessionHasNoErrors()->assertRedirect("/dashboard/settings/profile");

  $user->update([
    "email_verified_at" => now(),
  ]);

  $user->refresh();

  $response = $this->actingAs($user)
    ->withSession(["auth.password_confirmed_at" => time()])
    ->get("/dashboard/settings/profile");

  expect($user->name)->toBe("Test User");
  expect($user->email)->toBe("test@example.com");
  expect($user->email_verified_at)->toBeNull();
});

test("email verification status is unchanged when the email address is unchanged", function () {
  $user = User::factory()->create([
    "email_verified_at" => now(),
  ]);

  $response = $this->actingAs($user)
    ->withSession(["auth.password_confirmed_at" => time()])
    ->put("/dashboard/settings/profile", [
      "name" => "Test User",
      "email" => $user->email,
    ]);

  $response->assertSessionHasNoErrors()->assertRedirect("/dashboard/settings/profile");

  expect($user->refresh()->email_verified_at)->not->toBeNull();
});

test("user can delete their account", function () {
  $user = User::factory()->create([
    "email_verified_at" => now(),
  ]);

  $response = $this->actingAs($user)
    ->withSession(["auth.password_confirmed_at" => time()])
    ->delete("/dashboard/settings/profile", [
      "password" => "password",
    ]);

  $response->assertSessionHasNoErrors()->assertRedirect("/");

  $this->assertGuest();
  expect($user->fresh())->toBeNull();
});

test("correct password must be provided to delete account", function () {
  $user = User::factory()->create([
    "email_verified_at" => now(),
  ]);

  $response = $this->actingAs($user)
    ->withSession(["auth.password_confirmed_at" => time()])
    ->from("/dashboard/settings/profile")
    ->delete("/dashboard/settings/profile", [
      "password" => "wrong-password",
    ]);

  $response->assertSessionHasErrors("password")->assertRedirect("/dashboard/settings/profile");

  expect($user->fresh())->not->toBeNull();
});
