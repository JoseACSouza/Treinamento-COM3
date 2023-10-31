<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormRequestCommentaries;
use App\Http\Requests\FormRequestcommentary;
use App\Http\Resources\V1\CommentaryResource;
use App\Interfaces\RepositoriesInterface;
use App\Models\Commentary;
use App\Repositories\CommentariesRepository;
use App\Repositories\commentaryRepository;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Ramsey\Uuid\Type\Integer;

class CommentaryController extends Controller
{
    private static function commentaryRepository():CommentariesRepository|RepositoriesInterface{
        return new CommentariesRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function show($postID)
    {
        return CommentaryResource::collection($this->commentaryRepository()->getCommentsByPost([$postID])->get());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(FormRequestCommentaries $request)
    {
        try {
            $this->commentaryRepository()->createAndAttach($request);
            return response()->json(['message'=> 'Comentário criado com sucesso!'], 201);
        } catch (\Throwable $th) {
            return response()->json($th->errorInfo[2], 422);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FormRequestCommentaries $request, $commentaries)
    {
        try {
            $this->commentaryRepository()->find($commentaries)->update($request->all());
            return response()->json(['message'=> 'Comentário atualizado com sucesso!'], 201);
        } catch (\Throwable $th) {
            return response()->json($th->errorInfo[2], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $this->commentaryRepository()->deleteApi($id);
            return response()->json(['message'=> 'Comentário deletado com sucesso!'], 200);
        } catch (\Throwable $th) {
            return response()->json($th->errorInfo[2], 422);
        }
    }
}
