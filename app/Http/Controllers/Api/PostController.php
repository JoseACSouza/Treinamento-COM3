<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormRequestPost;
use App\Http\Resources\V1\PostResource;
use App\Interfaces\RepositoriesInterface;
use App\Models\Post;
use App\Repositories\PostRepository;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Stmt\TryCatch;

class PostController extends Controller
{
    private static function postRepository():PostRepository|RepositoriesInterface{
        return new PostRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PostResource::collection($this->postRepository()->allWithEager(null)->get());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(FormRequestPost $request)
    {
        try {
            $this->postRepository()->createAndAttachCategories($request);
            return response()->json(['message'=> 'Post criado com sucesso!'], 201);
        } catch (\Throwable $th) {
            return response()->json($th->errorInfo[2], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new PostResource($this->postRepository()->allWithEager(null)->findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FormRequestPost $request)
    {
        try {
            $this->postRepository()->updateAndAttachCategories($request);
            return response()->json(['message'=> 'Post atualizado com sucesso!'], 201);
        } catch (\Throwable $th) {
            return response()->json($th->errorInfo[2], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->postRepository()->deleteAttachments($id);
            return response()->json(['message'=> 'Post deletado com sucesso!'], 200);
        } catch (\Throwable $th) {
            return response()->json($th->errorInfo[2], 422);
        }
    }
}
