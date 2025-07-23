<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectDetail extends Model
{
    protected $fillable = ['project_id', 'position', 'type', 'content'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
} 