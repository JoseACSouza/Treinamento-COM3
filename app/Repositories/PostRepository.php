<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Post;

class PostRepository extends AbstractRepository
{
    protected static $model = Post::class;

    public static function allWithEager(){
        return self::loadModel()::with('owner', 'categories', 'commentaries')->get();
    }

    public static function createAndAttachCategories($data, $toAttach){
        return self::loadModel()::create($data)->categories()->attach($toAttach);
    }

    public static function updateAndAttachCategories($request){
        $data = $request;
        $request = self::loadModel()::find(($request->id));
        $request->categories()->detach();
        $request->update($data->all());
        $request->categories()->attach($data->categories);
    }

}
