<?php

namespace App\Http\Controllers\Dashboard\Setting;

use App\Http\Controllers\Controller;
use App\Models\Session;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class DeviceSessionController extends Controller {
  public function index(Request $request): Response {
    $parameters = initializeQueryParams($request);
    $deviceSessionsResult = Session::query()
      ->where("user_id", auth()->id())
      ->search($parameters["search"])
      ->sort($parameters["column"], $parameters["sort"])
      ->paginate($parameters["size"])
      ->toArray();
    $deviceSessions = initializeResultArray($deviceSessionsResult, $parameters);

    $sessionId = session()?->getId() ?? "";

    return inertia("dashboard/settings/device-sessions/index", [
      "queryResult" => $deviceSessions,
      "sessionId" => $sessionId,
    ]);
  }

  public function destroy(Session $deviceSession): RedirectResponse {
    try {
      $deviceSession->delete();
      return back();
    } catch (\Throwable $th) {
      handleTrowable($th);
    }
  }

  public function destroyAll(): RedirectResponse {
    try {
      $sessionId = session()?->getId();
      Session::where("user_id", auth()->id())
        ->whereNot("id", $sessionId)
        ->delete();
      return back();
    } catch (\Throwable $th) {
      handleTrowable($th);
    }
  }
}
