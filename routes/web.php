<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LocalizationController;
use Illuminate\Support\Facades\Route;
use Inertia\Response;

Route::get("/", function (): Response {
    return inertia("welcome");
})->name("home");

// Localization
Route::put("/localization")->uses([LocalizationController::class, "update"])->name("localization.update");

Route::middleware(["auth", "verified"])->group(function () {
    // Dashboard
    Route::get("dashboard", [DashboardController::class, "index"])->name("dashboard.index");
});

require __DIR__."/auth.php";
