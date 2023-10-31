<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Category;

class CategoriesRepository extends AbstractRepository
{
    protected static $model = Category::class;

}
