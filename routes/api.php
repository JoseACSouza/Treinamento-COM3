<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentaryController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::apiResource('/users', UserController::class, array("as" => "api"));

Route::prefix('/v1')->group(function(){
    Route::post('/login', [AuthController::class, 'login'], array("as" => "api"));

    Route::middleware('auth:sanctum')->group( function(){
        Route::apiResource('/posts', PostController::class, array("as" => "api"));
        Route::apiResource('/commentaries', CommentaryController::class, array("as" => "api"))->except([
        'index'
        ]);
        Route::post('/logout', [AuthController::class, 'logout'], array("as" => "api"));
    });
});

