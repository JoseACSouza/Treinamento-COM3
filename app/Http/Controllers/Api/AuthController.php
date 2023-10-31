<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use HttpResponses;

    public function login(Request $request){
        if(Auth::attempt($request->only(['email', 'password']))){
            return $this->response('Authorized',200, [
                'token'=> $request->user()->createToken('user')->plainTextToken,
                'user'=>$request->user(),
                'role'=>$request->user()->isAn('admin') ? 'admin' : 'regular',
            ]);
        }
        return $this->response('Not Authorized',401);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return $this->response('Logout success!',200);
    }
}
