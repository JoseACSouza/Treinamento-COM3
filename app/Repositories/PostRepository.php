<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Exports\PostExport;
use App\Models\Post;
use App\Models\Storage;
use Illuminate\Support\Facades\App;
use Maatwebsite\Excel\Facades\Excel;

class PostRepository extends AbstractRepository
{
    protected static $model = Post::class;

    public static function allWithEager($request)
    {
        if (!$request || !$request->filterOwner && !$request->filterCategory) {
            return self::loadModel()::with('owner', 'categories', 'commentaries', 'storages');
        }
        if ($request->filterOwner && $request->filterCategory) {
            return self::loadModel()::with('owner', 'categories', 'commentaries', 'storages')
                ->whereHas('categories', function ($query) use ($request) {
                    $query->where('category_id', $request->filterCategory);
                })
                ->where('users_id', 'like', $request->filterOwner);
        }
        if ($request->filterOwner) {
            return self::loadModel()::with('owner', 'categories', 'commentaries', 'storages')
                ->where('users_id', 'like', $request->filterOwner);
        }
        if ($request->filterCategory) {
            return self::loadModel()::with('owner', 'categories', 'commentaries', 'storages')
                ->whereHas('categories', function ($query) use ($request) {
                    $query->where('category_id', $request->filterCategory);
                });
        }
    }

    public static function createAndAttachCategories($request)
    {
        $postCategories= $request->categories;
        $postFile = $request->storage;
        $data=$request->all();
        if ($postFile) {
            $file = Storage::create(['file'=>$postFile->store('posts')]);
            $data = self::loadModel()::create($data);
            $data->storages()->attach($file);
            $data->categories()->attach($postCategories);
        } else {
            self::loadModel()::create($data)->categories()->attach($postCategories);
        }
    }

    public static function exportsPostsLog($request)
    {
        if($request->exportType == 'excel'){
            return Excel::download(new PostExport, 'posts-log.xlsx');
        } elseif($request->exportType == 'pdf'){
            $pdf = App::make('dompdf.wrapper');
            $posts = self::allWithEager(NULL)->get();
            $pdf->getDomPDF()->set_option("enable_php", true);
            $pdf->loadView('PostLog', compact('posts'));
            return $pdf->download('postlog.pdf');
        }
    }

    public static function updateAndAttachCategories($request)
    {
        $data = $request;
        $request = self::loadModel()::find(($request->id));
        $request->categories()->detach();
        $request->storages()->detach();
        $request->update($data->all());
        $request->categories()->attach($data->categories);
        $request->storages()->attach($data->storage);
    }

    public static function deleteAttachments($id)
    {
        $request = self::loadModel()::find(($id));
        $commentaries = $request->commentaries()->with('storages')->get();
        if($commentaries){
            foreach ($commentaries as $commentary){
                if($commentary->storages()){
                    $commentary->storages()->delete();
                }
            }
        }
        if($request->storages()){
            $request->storages()->delete();
            $request->delete();
        } else {
            $request->delete();
        }
    }
}
