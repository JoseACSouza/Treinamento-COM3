<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormRequestPost;
use App\Interfaces\RepositoriesInterface;
use App\Repositories\CategoriesRepository;
use App\Repositories\CommentariesRepository;
use App\Repositories\PostRepository;
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

    public function index(Request $request)
    {
        return Inertia::render('Post/Post',[
            'posts'=> $this->postRepository()->allWithEager($request)->paginate(5),
            'allPostOwners'=> $this->postRepository()->allWithEager(NULL)->get(),
            'allCategories'=>$this->categoriesRepository()->all(),
        ] );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FormRequestPost $request)
    {
        if($request->method() == 'POST') {
            $this->postRepository()->createAndAttachCategories($request);
        }
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Post/SelectedPost',[
            'post'=>$this->postRepository()->allWithEager(NULL)->find($id),
            'commentaries'=>$this->commentariesRepository()->getCommentsByPost([$id])->paginate(5),
        ] );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FormRequestPost $request)
    {
        $this->postRepository()->updateAndAttachCategories($request);
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->postRepository()->deleteAttachments($id);
        return redirect()->back();
    }
}
