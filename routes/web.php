<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\Settings\PasswordController;
use App\Http\Controllers\Dashboard\Settings\ProfileController;
use App\Http\Controllers\LocalizationController;
use Illuminate\Support\Facades\Route;
use Inertia\Response;

// Home
Route::get("/", function (): Response {
    return inertia("welcome");
})->name("home");

// Localization
Route::put("/localization", [LocalizationController::class, "update"])->name("localization.update");

Route::prefix("dashboard")->middleware(["auth", "verified", 'password.confirm'])->group(function (): void {
    // Dashboard
    Route::get("/", [DashboardController::class, "index"])->name("dashboard.index");

    // Settings
    Route::prefix("settings")->group(function(): void{
        Route::get("/profile", [ProfileController::class, "index" ])->name("profile.index" );
        Route::put("/profile", [ProfileController::class, "update"])->name("profile.update");

        // Password
        Route::get("/password", [PasswordController::class, "index" ])->name("password.index" );
        Route::put("/password", [PasswordController::class, "update"])->name("password.update");
    });
});

require __DIR__."/auth.php";
