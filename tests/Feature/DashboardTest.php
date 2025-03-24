<?php

use App\Models\User;

test("guests are redirected to the login page", function () {
  $this->get("/dashboard")->assertRedirect("/auth/login");
});

it("redirects unverified users to email verification page", function () {
  $user = User::factory()->create([
    "email_verified_at" => null,
  ]);

  $this->actingAs($user)->get("/dashboard")->assertRedirect("/auth/verify-email");
});

it("redirects users without confirmed password", function () {
  $user = User::factory()->create([
    "email_verified_at" => now(),
  ]);

  $this->actingAs($user)->get("/dashboard")->assertRedirect("/auth/confirm-password");
});

it("allows authenticated, verified users with confirmed password", function () {
  $user = User::factory()->create([
    "email_verified_at" => now(),
  ]);

  $this->actingAs($user)
    ->withSession(["auth.password_confirmed_at" => time()])
    ->get("/dashboard")
    ->assertOk();
});
