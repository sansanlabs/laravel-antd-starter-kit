<?php

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    $permissions = [
      // Role Permissions
      [
        "name" => "Roles.Index",
        "description" => "View the list of all roles",
      ],
      [
        "name" => "Roles.Create",
        "description" => "Create a new role with specific permissions",
      ],
      [
        "name" => "Roles.Detail",
        "description" => "View detailed information about a specific role",
      ],
      [
        "name" => "Roles.Edit",
        "description" => "Modify the details or permissions of an existing role",
      ],
      [
        "name" => "Roles.Delete",
        "description" => "Remove a role from the system",
      ],

      // Permission Permissions
      [
        "name" => "Permissions.Index",
        "description" => "View the list of all permissions in the system",
      ],

      // Laravel Telescope
      [
        "name" => "LaravelTelescope.Index",
        "description" => "Grants access to the Laravel Telescope main dashboard",
      ],
    ];

    foreach ($permissions as $permission) {
      Permission::create($permission);
    }

    // Create role super-admin
    $allPermission = Permission::all();
    Role::create([
      "name" => "SuperAdmin",
      "description" => "Has full access to all features and permissions across the system, including administrative functions",
    ])->givePermissionTo($allPermission);
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    //
  }
};
