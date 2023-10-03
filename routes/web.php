<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentaryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/news', [PostController::class, 'index'])->name('post');
    Route::get('/news/{id}', [PostController::class, 'show'])->name('post.show');
    Route::delete('/post/delete', [PostController::class, 'deletePost'])->name('post.destroy');
    Route::post('/post/new', [PostController::class, 'newPost'])->name('post.new');
    Route::post('/post/filter', [PostController::class, 'filter'])->name('post.filter');
    Route::put('/post', [PostController::class, 'updatePost'])->name('post.update');



    Route::resource('categories', CategoryController::class);

    Route::resource('commentaries', CommentaryController::class);
});

require __DIR__.'/auth.php';
