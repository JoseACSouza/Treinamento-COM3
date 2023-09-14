<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class userSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'=>'Jose Ale',
            'email'=>'alexandrecordeiro15@outlook.com',
            'password'=>'$2y$10$MZWUEIyF/8OA.EzARMgnfOsBuQbU.NHCne8ZuR6oZa6JXFx1G6BCm',
        ]);
    }
}
