<?php

namespace App\Http\Controllers\Dashboard\RoleAndPermission;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Response;

class PermissionController extends Controller {
  public function index(): Response {
    $permissions = Permission::with("roles")->get()->toArray();

    $permissions = permissionFormatted($permissions);
    $totalRoles = Role::count();

    return inertia("dashboard/roles-and-permissions/permissions/index", [
      "allPermissions" => $permissions,
      "totalRoles" => $totalRoles,
    ]);
  }
}
