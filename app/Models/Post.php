<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'subject',
        'content',
        'users_id',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function getAllPosts(){
        $allPosts = Post::all()->map(function ($post){
            return [
                'id'=>$post->id,
                'subject'=>$post->subject,
                'content'=>$post->content,
                'postOwner'=>$post->owner->name,
                'ownerId'=>$post->users_id,
            ];
        });
        return $allPosts;
    }

}
