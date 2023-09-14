<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __construct(Post $post)
    {
        $this->post = $post;
    }
    public function index(){
        return Inertia::render('Post/Post',[
            'props'=>$this->post->getAllPosts()
        ] );
    }
}
