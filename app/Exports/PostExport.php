<?php

namespace App\Exports;

use App\Interfaces\RepositoriesInterface;
use App\Repositories\PostRepository;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMapping;

class PostExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize
{
    private static function postRepository():PostRepository|RepositoriesInterface{
        return new PostRepository;
    }

    public function collection()
    {
        return $this->postRepository()->allWithEager(NULL)->get();
    }

    public function map($post) : array
    {
        return [
            $post->id,
            $post->owner->name,
            $post->subject,
            date("d-m-Y", strtotime($post->created_at)),
        ];
    }

    public function headings(): array
    {
        return [ "#", "User Name","Subject","Created at" ];
    }

}
