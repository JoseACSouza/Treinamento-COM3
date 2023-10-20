<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Bouncer;

class userSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name'=>'Jose Alexandre',
            'email'=>'alexandrecordeiro15@outlook.com',
            'password'=>'$2y$10$MZWUEIyF/8OA.EzARMgnfOsBuQbU.NHCne8ZuR6oZa6JXFx1G6BCm',
        ]);

        Bouncer::assign('admin')->to($user);

    }
}
