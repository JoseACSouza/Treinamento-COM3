<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormRequestPost extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $request = [];
        if($this->method() == "POST"|| $this->method() == "PUT") {
            $request = [
                'subject'=>['required','string'],
                'content'=>['required','string'],
                'users_id'=>['required'],
                'categories'=>['required'],
                'storage'=>['nullable', 'max:5120'],
            ];
        }
        return $request;
    }
}
