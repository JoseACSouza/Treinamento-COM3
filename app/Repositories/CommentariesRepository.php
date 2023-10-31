<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Mail\CommentAlert;
use App\Models\Commentary;
use App\Models\Storage;
use Illuminate\Support\Facades\Mail;

class CommentariesRepository extends AbstractRepository
{
    protected static $model = Commentary::class;

    public static function getCommentsByPost(array $post_id = []){
        return self::loadModel()::with('user', 'storages')->whereIn('post_id', $post_id);
    }

    public static function createAndAttach($request)
    {
        $commentFile = $request->storage;
        $data = $request->all();
        if ($commentFile) {
            $file = Storage::create(['file'=>$commentFile->store('commentaries')]);
            self::loadModel()::create($data)->storages()->attach($file);
        } else {
            self::loadModel()::create($data);
        }
    }

    public static function sendEmailToPostOwner($userInfo)
    {
        $email = $userInfo->email;
        $name = $userInfo->name;
        return Mail::to($email, $name)->send(new CommentAlert);
        var_dump('E-mail enviado');
    }

    public static function deleteAttachments($request)
    {
        $request = self::loadModel()::find(($request->commentId));
        if($request->storages()){
            $request->storages()->delete();
            $request->delete();
        } else {
            $request->delete();
        }
    }

    public static function deleteApi($id)
    {
        $request = self::loadModel()::find($id);
        if($request->storages()){
            $request->storages()->delete();
            $request->delete();
        } else {
            $request->delete();
        }
    }

}
