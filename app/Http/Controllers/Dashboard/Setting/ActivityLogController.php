<?php

namespace App\Http\Controllers\Dashboard\Setting;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Response;

class ActivityLogController extends Controller {
  public function index(Request $request): Response {
    $parameters = initializeQueryParams($request);
    $activityLogsResult = ActivityLog::query()
      ->with(["subject", "causer"])
      ->where("causer_id", auth()->id())
      ->search($parameters["search"])
      ->sort($parameters["column"], $parameters["sort"])
      ->paginate($parameters["size"])
      ->toArray();
    $activityLogs = initializeResultArray($activityLogsResult, $parameters);

    return inertia("dashboard/settings/activity-logs/index", [
      "queryResult" => $activityLogs,
    ]);
  }
}
