<?php

namespace App\Models;

use SanSanLabs\Userstamps\Concerns\HasUserstamps;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission {
  use HasUserstamps;
  use LogsActivity;

  protected $fillable = ["description"];

  public function getActivitylogOptions(): LogOptions {
    return LogOptions::defaults()
      ->logAll()
      ->logOnlyDirty()
      ->useLogName("permissions")
      ->setDescriptionForEvent(fn(string $eventName) => "{$eventName} permission (:subject.name)");
  }

  public function scopeSearch($query, $search): mixed {
    return $query->whereAny(["name"], "LIKE", "%$search%");
  }

  public function scopeSort($query, $column, $sort): mixed {
    if (!$column) {
      return $query->orderBy("name", "asc");
    }
    return $query->orderBy($column, $sort);
  }
}
