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

        Post::factory()
        ->count(40)
        ->create()
        ->each(function (Post $post) {
            $min = random_int(1,3);
            $max = random_int(1,3);
            $post->categories()
            ->attach([$min, $max !== $min ? $max : random_int(1,3)]);
        });
    }
}
