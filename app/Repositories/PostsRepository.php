<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Post;

class PostRepository extends AbstractRepository
{
    protected static $model = Post::class;

    // public static function findByMarca(string $nome_marca){
    //     return self::loadModel()::query()->where(['nome' => $nome_marca])->first();
    // }

    // public static function getMarcaWhereInIds(array $marcas_parceiras_id = []){
    //     return self::loadModel()::query()->whereIn('id', $marcas_parceiras_id)->get();
    // }
}
