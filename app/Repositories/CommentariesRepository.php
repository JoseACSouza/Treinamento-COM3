<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Mail\CommentAlert;
use App\Models\Commentary;
use Illuminate\Support\Facades\Mail;

class CommentariesRepository extends AbstractRepository
{
    protected static $model = Commentary::class;

    public static function getCommentsByPost(array $post_id = []){
        return self::loadModel()::with('user')->whereIn('post_id', $post_id)->get();
    }

    public static function sendEmailToPostOwner($userInfo)
    {
        $email = $userInfo->email;
        $name = $userInfo->name;
        return Mail::to($email, $name)->send(new CommentAlert);
        var_dump('E-mail enviado');
    }
}
