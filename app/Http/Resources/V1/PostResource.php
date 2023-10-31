<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'subject'=>$this->subject,
            'content'=>$this->content,
            'user'=>$this->owner,
            'categories'=>$this->categories,
            'commentaries'=>$this->commentaries,
            'storages'=>$this->storages,
        ];
    }
}
