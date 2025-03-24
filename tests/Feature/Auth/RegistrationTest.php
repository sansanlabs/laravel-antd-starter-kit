<?php

test("registration screen can be rendered", function () {
  $response = $this->get("/auth/register");

  $response->assertStatus(200);
});

test("new users can register", function () {
  $response = $this->post("/auth/register", [
    "name" => "Test User",
    "email" => "test@example.com",
    "password" => "password",
    "password_confirmation" => "password",
  ]);

  $this->assertAuthenticated();
  $response->assertRedirect(route("dashboard.index", absolute: false));
});
