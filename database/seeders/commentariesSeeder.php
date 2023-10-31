<?php

namespace Database\Seeders;

use App\Models\Commentary;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class commentariesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Commentary::create([
            'content'=>'Caro time da TechConnect Solutions,

            Fico extremamente grato por essa mensagem inspiradora! É realmente incrível ver como nossa empresa está crescendo e conquistando reconhecimento pelo nosso trabalho árduo e dedicação.',
            'user_id'=>1,
            'post_id'=>1,
        ]);
    }
}
