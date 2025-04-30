<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail {
  use HasFactory;
  use HasRoles;
  use HasUuids;
  use LogsActivity;
  use Notifiable;

  protected $fillable = ["name", "email", "password"];

  protected $hidden = ["password", "remember_token"];

  protected function casts(): array {
    return [
      "email_verified_at" => "datetime",
      "password" => "hashed",
    ];
  }

  public function getActivitylogOptions(): LogOptions {
    return LogOptions::defaults()
      ->logAll()
      ->logOnlyDirty()
      ->useLogName("users")
      ->setDescriptionForEvent(fn(string $eventName) => "{$eventName} user (:subject.name)");
  }
}
