<?php

namespace App\Http\Controllers;

use App\Repositories\PostRepository;
use App\Http\Requests\FormRequestPost;
use App\Interfaces\RepositoriesInterface;
use App\Repositories\CategoriesRepository;
use App\Repositories\CommentariesRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    private static function postRepository():PostRepository|RepositoriesInterface{
        return new PostRepository;
    }

    private static function commentariesRepository():CommentariesRepository|RepositoriesInterface{
        return new CommentariesRepository;
    }

    private static function categoriesRepository():CategoriesRepository|RepositoriesInterface{
        return new CategoriesRepository;
    }


    public function index() {
        return Inertia::render('Post/Post',[
            'posts'=> self::postRepository()->allWithEager(),
            'allCategories'=>self::categoriesRepository()->all(),
        ] );
    }

    public function filter(Request $request) {
        return Inertia::render('Post/Post',[
            'posts'=> self::postRepository()->allWithEager(),
            'allCategories'=>self::categoriesRepository()->all(),
            'filter'=>$request->all(),
        ] );
    }

    public function deletePost(Request $request) {
        self::postRepository()->delete($request->id);
        return redirect()->back();
    }

    public function newPost(FormRequestPost $request) {
        if($request->method() == 'POST') {
            $data = $request->all();
            self::postRepository()->createAndAttachCategories($data, $request->categories);
        }
        return redirect()->back();
    }

    public function show($id){
        // dd(self::commentariesRepository()->allWithEager()->find($id));
        return Inertia::render('Post/SelectedPost',[
            'post'=>self::postRepository()->allWithEager()->find($id),
            'commentaries'=>self::commentariesRepository()->getCommentsByPost([$id]),
        ] );
    }

    public function updatePost(FormRequestPost $request) {
        if($request->method() == 'PUT') {
            self::postRepository()->updateAndAttachCategories($request);
        }
        return redirect()->back();
    }

}



