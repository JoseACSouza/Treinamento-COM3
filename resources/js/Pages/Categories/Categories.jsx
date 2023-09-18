import { Head } from "@inertiajs/react";
import { useForm }from "@inertiajs/react";
import CategoryList from "./CategoryList";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ButtonCard from "@/Components/ButtonCard";

export default ({ auth, categories }) => {
    const { get } = useForm();


    const clickButton= (e) => {
        e.preventDefault();
        get('categories/create');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>
                    <ButtonCard
                        className="bg-cyan-600"
                        onClick={clickButton}
                    >
                        Adicionar Categoria
                    </ButtonCard>
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

