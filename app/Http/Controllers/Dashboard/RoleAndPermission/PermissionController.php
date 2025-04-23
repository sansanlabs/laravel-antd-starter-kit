<?php

namespace App\Http\Controllers\Dashboard\RoleAndPermission;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Response;

class PermissionController extends Controller {
  public function index(Request $request): Response {
    $parameters = initializeQueryParams($request);
    $permissionsResult = Permission::query()
      ->with(["permissions", "creator", "editor"])
      ->search($parameters["search"])
      ->sort($parameters["column"], $parameters["sort"])
      ->paginate($parameters["size"])
      ->toArray();
    $permissions = initializeResultArray($permissionsResult, $parameters);

    return inertia("dashboard/roles-and-permissions/permissions/index", [
      "queryResult" => $permissions,
    ]);
  }
}
