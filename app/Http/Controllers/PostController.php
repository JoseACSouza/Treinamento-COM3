<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormRequestPost;
use App\Models\Category;
use App\Models\Commentary;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    public function index() {
        return Inertia::render('Post/Post',[
            'posts'=> Post::with('owner', 'categories', 'commentaries')->get(),
            'allCategories'=>Category::all(),
        ] );
    }

    public function deletePost(Request $request) {
        $request = Post::find(($request->id));
        $request->categories()->detach();
        $request->delete();
        return redirect()->back();
    }

    public function newPost(FormRequestPost $request) {
        if($request->method() == 'POST') {
            $data = $request->all();
            Post::create($data)->categories()->attach($request->categories);
        }
        return redirect()->back();
    }

    public function show($id){
        return Inertia::render('Post/SelectedPost',[
            'post'=> Post::with('owner', 'categories', 'commentaries.user')->get()->find($id),
            'owners'=>Commentary::with('user')->get(),
        ] );
    }

    public function updatePost(FormRequestPost $request) {
        if($request->method() == 'PUT') {
            $data = $request;
            $request = Post::find(($request->id));
            $request->categories()->detach();
            $request->update($data->all());
            $request->categories()->attach($data->categories);
        }
        return redirect()->back();
    }

}



