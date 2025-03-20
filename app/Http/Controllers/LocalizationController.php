<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LocalizationController extends Controller {
  public function update(Request $request): RedirectResponse {
    $language = $request->validate([
      "language" => ["required", "string", "max:2", "in:en,id,ja"],
    ])["language"];

    session()->put("locale", $language);

    return back();
  }
}
