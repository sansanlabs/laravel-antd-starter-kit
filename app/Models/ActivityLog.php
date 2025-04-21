<?php

namespace App\Models;

use App\Traits\LogsRequestData;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Spatie\Activitylog\Models\Activity;

class ActivityLog extends Activity {
  use HasUuids;
  use LogsRequestData;

  protected $fillable = ["url", "method", "ip", "agent"];
}
