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


    public function index(Request $request) {
            return Inertia::render('Post/Post',[
                'posts'=> $this->postRepository()->allWithEager($request)->paginate(5),
                'allPostOwners'=> $this->postRepository()->allWithEager(NULL)->get(),
                'allCategories'=>$this->categoriesRepository()->all(),
            ] );
    }

    public function deletePost(Request $request) {
        $this->postRepository()->deleteAttachments($request);
        return redirect()->back();
    }

    public function newPost(FormRequestPost $request) {
        if($request->method() == 'POST') {
            $this->postRepository()->createAndAttachCategories($request);
        }
        return redirect()->back();
    }

    public function show($id){
        return Inertia::render('Post/SelectedPost',[
            'post'=>$this->postRepository()->allWithEager(NULL)->find($id),
            'commentaries'=>$this->commentariesRepository()->getCommentsByPost([$id])->paginate(5),
        ] );
    }

    public function updatePost(FormRequestPost $request) {
        if($request->method() == 'PUT') {
            $this->postRepository()->updateAndAttachCategories($request);
        }
        return redirect()->back();
    }

}



