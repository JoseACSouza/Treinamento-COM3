<?php

namespace App\Http\Controllers;

use App\Models\Commentary;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentaryController extends Controller
{
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
        $data = $request->all();
        Commentary::create($data);
        $PostId = $request->post_id;
        return to_route('post.show', $PostId);
    }

    /**
     * Display the specified resource.
     */
    public function show(Commentary $commentary)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Commentary $commentary)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Commentary $commentary)
    {
        Commentary::find($commentary->id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commentary $commentary)
    {
        $PostId = $commentary->post_id;
        $commentary = Commentary::find($commentary->id);
        $commentary->delete();
        return to_route('post.show', $PostId);
    }
}
