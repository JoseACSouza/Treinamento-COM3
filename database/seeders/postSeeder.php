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
            'subject'=>'Juntos Rumo ao Sucesso',
            'content'=>'Caros colaboradores da TechConnect Solutions,
            Queremos expressar nossa profunda gratidão por fazerem parte da nossa equipe e contribuírem para o nosso sucesso contínuo. Sem cada um de vocês, nosso crescimento e conquistas não seriam possíveis.',
            'users_id'=>1,
        ])->categories()->attach([1 , 3]);
    }
}
