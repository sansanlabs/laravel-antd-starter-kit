<?php

namespace App\Traits;

trait TestTrait {
  public static function bootLogsRequestData(): void {
    static::creating(function ($model): void {
      $model->url = request()->fullUrl();
      $model->method = request()->method();
      $model->ip = request()->ip();
      $model->agent = request()->header("user-agent");
    });
  }
}
