<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class categorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'category'=>'Anúncios Oficiais',
        ]);
        Category::create([
            'category'=>'Social',
        ]);
        Category::create([
            'category'=>'RH',
        ]);
    }
}
