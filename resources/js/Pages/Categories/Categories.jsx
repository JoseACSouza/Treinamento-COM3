import { Head, Link } from "@inertiajs/react";
import CategoryList from "./CategoryList";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default ({ auth, categories }) => {

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>
                    <Link
                        href='/categories/create'
                        method="get"
                        as="button"
                        type="button"
                        className="pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 bg-cyan-600">
                            Adicionar Categoria
                    </Link>
                </div>
                }
            >
            <div className="flex flex-col justify-center m-4">
            <Head title="Categorias" />
                {
                    <CategoryList
                        categories = {categories}
                    />
                }
            </div>
        </AuthenticatedLayout>
    );
}

