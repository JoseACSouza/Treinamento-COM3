<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */

    public function run(): void
    {
        $this->call([
            userSeeder::class,
            BouncerSeeder::class,
            categorySeeder::class,
            postSeeder::class,
            commentariesSeeder::class,
            categorySeeder::class,
            User::factory(10)->create(),
        ]);
    }
}
