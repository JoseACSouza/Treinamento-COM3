<?php

namespace App\Http\Controllers;

use App\Interfaces\RepositoriesInterface;
use App\Repositories\CommentariesRepository;
use App\Repositories\PostRepository;
use Illuminate\Http\Request;

class CommentaryController extends Controller
{
    private static function commentariesRepository():CommentariesRepository|RepositoriesInterface{
        return new CommentariesRepository;
    }

    private static function postsRepository():PostRepository|RepositoriesInterface{
        return new PostRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        self::commentariesRepository()->createAndAttach($request);
        self::commentariesRepository()->sendEmailToPostOwner(self::postsRepository()->allWithEager(NULL)->find($request->post_id)->owner);
        return to_route('posts.show', $request->post_id);
    }

    /**
     * Display the specified resource.
     */
    public function show($commentary)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($commentary)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $commentary)
    {
        self::commentariesRepository()->find($commentary->id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        self::commentariesRepository()->deleteAttachments($request);
        return to_route('posts.show', $request->postId);
    }
}
