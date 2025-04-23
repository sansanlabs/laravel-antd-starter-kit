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

if (!function_exists("initializeQueryParams")) {
  function initializeQueryParams($request): array {
    $column = $request->column ?? null;
    $page = intval($request->page ?? 1);
    $size = intval($request->size ?? 10);
    $search = $request->search ?? null;
    $sort = $request->sort ?? null;

    return compact("column", "search", "sort", "page", "size");
  }
}

if (!function_exists("initializeResultArray")) {
  function initializeResultArray($result, $parameters): array {
    return [
      "data" => $result["data"],
      "column" => $parameters["column"],
      "page" => $parameters["page"],
      "size" => $parameters["size"],
      "search" => $parameters["search"],
      "sort" => $parameters["sort"],
      "total" => $result["total"],
    ];
  }
}
