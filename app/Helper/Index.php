<?php

use Illuminate\Validation\ValidationException;

if (!function_exists("handleTrowable")) {
  function handleTrowable($th): never {
    $isProduction = config("app.env") === "production";
    report($th);
    if ($isProduction) {
      throw ValidationException::withMessages(["error_server" => __("message.error_server")]);
    }
    throw $th;
  }
}
