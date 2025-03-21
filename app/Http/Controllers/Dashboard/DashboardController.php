<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Response;

class DashboardController extends Controller {
  public function index(): Response {
    inertia()->share([
      "activeMenu" => "dashboard",
    ]);
    return inertia("dashboard");
  }
}
