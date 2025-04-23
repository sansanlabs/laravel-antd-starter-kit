<?php

use App\Models\Permission;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Permission::create([
      "name" => "User.Index",
      "description" => "Show all list of users",
    ]);
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    //
  }
};
