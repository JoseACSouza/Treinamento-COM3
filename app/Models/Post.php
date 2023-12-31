<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject',
        'content',
        'users_id',
    ];

    public function owner() : BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function categories() : BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function commentaries() : HasMany
    {
        return $this->hasMany(Commentary::class);
    }

    public function storages()
    {
        return $this->morphToMany(Storage::class, 'storagables');
    }

}
