<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('verifyAdmin');
        return Inertia::render('Categories/Categories',[
            'categories'=>Category::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('verifyAdmin');
        return Inertia::render('Categories/NewCategory',[
            'categories'=>Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('verifyAdmin');
        $data = $request->all();
        Category::create($data);
        return to_route('categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        Gate::authorize('verifyAdmin');
        return Inertia::render('Categories/EditCategory',[
            'categories'=>Category::find($category->id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        Gate::authorize('verifyAdmin');
        Category::find($category->id)->update($request->all());
        return to_route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        Gate::authorize('verifyAdmin');
        $category = Category::find(($category->id));
        $category->delete();
        return to_route('categories.index');
    }
}
