<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Storage extends Model
{
    use HasFactory;

    protected $fillable = ['file'];

    public function posts()
    {
        return $this->morphedByMany(Post::class, 'storagables');
    }

    public function commentaries()
    {
        return $this->morphedByMany(Commentary::class, 'storagables');
    }
}
