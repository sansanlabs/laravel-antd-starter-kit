<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Session;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class SessionController extends Controller {
  public function index(User $user, Request $request): Response {
    $parameters = initializeQueryParams($request);
    $deviceSessionsResult = Session::query()
      ->where("user_id", $user->id)
      ->search($parameters["search"])
      ->sort($parameters["column"], $parameters["sort"])
      ->paginate($parameters["size"])
      ->toArray();
    $deviceSessions = initializeResultArray($deviceSessionsResult, $parameters);

    $sessionId = session()?->getId() ?? "";

    return inertia("dashboard/user/device-session/index", [
      "user" => $user,
      "queryResult" => $deviceSessions,
      "sessionId" => $sessionId,
    ]);
  }

  public function destroy(User $user, Session $session): RedirectResponse {
    try {
      $session->delete();
      return back();
    } catch (\Throwable $th) {
      handleTrowable($th);
    }
  }

  public function destroyAll(User $user): RedirectResponse {
    try {
      $sessionId = session()?->getId();
      Session::where("user_id", $user->id)->whereNot("id", $sessionId)->delete();
      return back();
    } catch (\Throwable $th) {
      handleTrowable($th);
    }
  }
}
