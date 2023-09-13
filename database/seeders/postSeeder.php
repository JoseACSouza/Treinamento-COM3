<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class postSeeder extends Seeder
{
    public function run(): void
    {
        Post::create([
            'subject'=>'Carros voadores',
            'content'=>'Carros voadores são um sonho ultramodernista pós segunda guerra mundial, período onde carros e aviões eram populares. Então sempre esteve no imaginário das pessoas a união desses dois veículos',
            'user_id'=>1,
        ]);
    }
}
