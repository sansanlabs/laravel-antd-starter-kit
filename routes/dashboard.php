<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\RoleAndPermission\PermissionController;
use App\Http\Controllers\Dashboard\RoleAndPermission\RoleController;
use App\Http\Controllers\Dashboard\Setting\ActivityLogController as SettingActivityLogController;
use App\Http\Controllers\Dashboard\Setting\DeviceSessionController as SettingDeviceSessionController;
use App\Http\Controllers\Dashboard\Setting\PasswordController as SettingPasswordController;
use App\Http\Controllers\Dashboard\Setting\ProfileController as SettingProfileController;

Route::prefix("dashboard")->middleware(["auth"])->group(function (): void {
    // Dashboard
    Route::get("/", [DashboardController::class, "index"])->name("dashboard.index");

    // Users
    Route::prefix("users")->group(function(): void{
        Route::get   ("/", [SettingProfileController::class, "index"  ])->name("settings.profile.index"  );
        Route::put   ("/", [SettingProfileController::class, "update" ])->name("settings.profile.update" );
        Route::delete("/profile", [SettingProfileController::class, "destroy"])->name("settings.profile.destroy");

        // Password
        Route::get("/password", [SettingPasswordController::class, "index" ])->name("settings.password.index" );
        Route::put("/password", [SettingPasswordController::class, "update"])->name("settings.password.update");
    });

    // Settings
    Route::prefix("settings")->group(function(): void{
        // Profile
        Route::prefix("profile")->group(function(): void {
            Route::get   ("/",        [SettingProfileController::class, "index"  ])->name("settings.profile.index"  );
            Route::put   ("/update",  [SettingProfileController::class, "update" ])->name("settings.profile.update" );
            Route::delete("/destroy", [SettingProfileController::class, "destroy"])->name("settings.profile.destroy");
        });

        // Password
        Route::prefix("password")->group(function(): void {
            Route::get("/",       [SettingPasswordController::class, "index" ])->name("settings.password.index" );
            Route::put("/update", [SettingPasswordController::class, "update"])->name("settings.password.update");
        });

        // Activity Logs
        Route::prefix("activity-logs")->group(function(): void {
            Route::get("/", [SettingActivityLogController::class, "index" ])->name("settings.activity-logs.index" );
        });

        // Device Sessions
        Route::prefix("device-sessions")->group(function(): void {
            Route::get(   "/",                  [SettingDeviceSessionController::class, "index"     ])->name("settings.device-sessions.index"      );
            Route::delete("/{session}/destroy", [SettingDeviceSessionController::class, "destroy"   ])->name("settings.device-sessions.destroy"    );
            Route::delete("/destroy-all",       [SettingDeviceSessionController::class, "destroyAll"])->name("settings.device-sessions.destroy-all");
        });
    });

    // Roles and Permissions
    Route::prefix("roles-and-permissions")->group(function ():void {
        // Roles
        Route::prefix("roles")->group(function ():void {
            Route::get(   "/",               [RoleController::class, "index"  ])->name("roles.index"  );
            Route::get(   "/create",         [RoleController::class, "create" ])->name("roles.create" );
            Route::post(  "/store",          [RoleController::class, "store"  ])->name("roles.store"  );
            Route::get(   "/{role}/show",    [RoleController::class, "show"   ])->name("roles.show"   );
            Route::get(   "/{role}/edit",    [RoleController::class, "edit"   ])->name("roles.edit"   );
            Route::put(   "/{role}/update",  [RoleController::class, "update" ])->name("roles.update" );
            Route::delete("/{role}/destroy", [RoleController::class, "destroy"])->name("roles.destroy");
        });
       
        // Permissions
        Route::prefix("permissions")->group(function ():void {
            Route::get("/", [PermissionController::class, "index"])->name("permissions.index");
        });
    });
});