<?php

use Illuminate\Validation\ValidationException;

if (!function_exists("handleTrowable")) {
  function handleTrowable($th): never {
    report($th);
    throw ValidationException::withMessages(["error_server" => __("message.error_server")]);
  }
}
