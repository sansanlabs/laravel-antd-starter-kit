<?php

use App\Models\User;

test("confirm password screen can be rendered", function () {
  $user = User::factory()->create();

  $response = $this->actingAs($user)->get("/auth/confirm-password");

  $response->assertStatus(200);
});

test("password can be confirmed", function () {
  $user = User::factory()->create();

  $response = $this->actingAs($user)->post("/auth/confirm-password", [
    "password" => "password",
  ]);

  $response->assertRedirect();
  $response->assertSessionHasNoErrors();
});

test("password is not confirmed with invalid password", function () {
  $user = User::factory()->create();

  $response = $this->actingAs($user)->post("/auth/confirm-password", [
    "password" => "wrong-password",
  ]);

  $response->assertSessionHasErrors();
});
