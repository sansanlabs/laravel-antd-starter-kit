<?php

use App\Http\Controllers\LocalizationController;
use Illuminate\Support\Facades\Route;
use Inertia\Response;

// Home
Route::get("/", fn (): Response => inertia("welcome"))->name("home");

// Localization
Route::put("/localization", [LocalizationController::class, "update"])->name("localization.update");

require __DIR__."/auth.php";
require __DIR__."/dashboard.php";
