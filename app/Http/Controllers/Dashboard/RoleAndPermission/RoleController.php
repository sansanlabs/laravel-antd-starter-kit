<?php

namespace App\Http\Controllers\Dashboard\RoleAndPermission;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleAndPermission\RoleRequest;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;

class RoleController extends Controller {
  protected function pluckPermission($permissions): array {
    $result = [];
    foreach ($permissions as $item) {
      $nameParts = explode(".", $item["name"]);
      $groupKey = $nameParts[0];

      if (!isset($result[$groupKey])) {
        $result[$groupKey] = [
          "name" => $groupKey,
          "options" => [],
        ];
      }

      $result[$groupKey]["options"][] = $item;
    }

    return array_values($result);
  }

  public function index(Request $request): Response {
    $parameters = initializeQueryParams($request);
    $rolesResult = Role::query()
      ->with(["permissions", "creator", "editor"])
      ->search($parameters["search"])
      ->sort($parameters["column"], $parameters["sort"])
      ->paginate($parameters["size"])
      ->toArray();
    $roles = initializeResultArray($rolesResult, $parameters);

    $pemissionsTotal = Permission::count();

    return inertia("dashboard/roles-and-permissions/roles/index", [
      "queryResult" => $roles,
      "pemissionsTotal" => $pemissionsTotal,
    ]);
  }

  public function create(): Response {
    $permissions = Permission::all()
      ->select(["id", "name"])
      ->toArray();

    $result = $this->pluckPermission($permissions);

    return inertia("dashboard/role/create", [
      "permissions" => $result,
    ]);
  }

  public function store(RoleRequest $request): RedirectResponse {
    $dataValidated = $request->validated();

    DB::beginTransaction();
    try {
      $newRole = Role::create(["name" => $dataValidated["name"]]);
      $newRole->syncPermissions($dataValidated["permissions"]);
      $newPermissions = $newRole
        ->permissions()
        ->select(["id", "name", "guard_name"])
        ->get()
        ->toArray();

      activity(config("permission.table_names.role_has_permissions"))
        ->on($newRole)
        ->by(auth()->user())
        ->event("updated")
        ->withProperties([
          "attributes" => $newPermissions,
        ])
        ->log("updated " . config("permission.table_names.role_has_permissions") . " pivot (:subject.name)");
      DB::commit();
      return redirect()->route("roles.show", ["role" => $newRole->id]);
    } catch (\Throwable $th) {
      DB::rollBack();
      handleTrowable($th);
    }
  }

  public function show(Role $role): Response {
    $role->permissions = $role->permissions()->pluck("name");

    $permissions = Permission::all()
      ->select(["id", "name"])
      ->toArray();
    $result = $this->pluckPermission($permissions);

    return inertia("dashboard/role/show", [
      "role" => $role,
      "permissions" => $result,
      "permissionTotal" => count($permissions),
    ]);
  }

  public function edit(Role $role): Response {
    $role->permissions = $role->permissions()->pluck("name");

    $permissions = Permission::all()
      ->select(["id", "name"])
      ->toArray();

    $result = $this->pluckPermission($permissions);

    return inertia("dashboard/role/edit", [
      "role" => $role,
      "permissions" => $result,
    ]);
  }

  public function update(Role $role, RoleRequest $request): RedirectResponse {
    $dataValidated = $request->validated();

    DB::beginTransaction();
    try {
      $oldPermissions = $role
        ->permissions()
        ->select(["id", "name", "guard_name"])
        ->get()
        ->makeHidden("pivot")
        ->toArray();

      $role->update(["name" => $dataValidated["name"]]);

      $role->syncPermissions($dataValidated["permissions"]);
      $role->touch();

      $newPermissions = $role
        ->permissions()
        ->select(["id", "name", "guard_name"])
        ->get()
        ->makeHidden("pivot")
        ->toArray();

      activity(config("permission.table_names.role_has_permissions"))
        ->on($role)
        ->by(auth()->user())
        ->event("updated")
        ->withProperties([
          "old" => $oldPermissions,
          "attributes" => $newPermissions,
        ])
        ->log("updated " . config("permission.table_names.role_has_permissions") . " pivot (:subject.name)");
      DB::commit();

      DB::commit();
      return redirect()->route("roles.show", ["role" => $role->id]);
    } catch (\Throwable $th) {
      DB::rollBack();
      handleTrowable($th);
    }
  }

  public function destroy(Role $role): RedirectResponse {
    try {
      $role->delete();
      return redirect()->route("roles.index");
    } catch (\Throwable $th) {
      handleTrowable($th);
    }
  }
}
