<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormRequestPost;
use App\Models\Category;
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
            'posts'=> Post::with('owner','categories')->get(),
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

    public function updatePost(FormRequestPost $request) {
        if($request->method() == 'PUT') {
            Post::find($request->id)->update($request->all());
            return redirect()->back();
        }
        return redirect()->back();
    }

}



