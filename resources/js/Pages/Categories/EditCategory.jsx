import ButtonCard from "@/Components/ButtonCard";
import InputLabel from "@/Components/InputLabel";
import {Head} from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default ({auth, categories})=>{
    const {
        data, setData, put, errors, reset
    } = useForm({
        'category':categories.category
    });
    function handleSubmit(e) {
        e.preventDefault();
        put(`/categories/${categories.id}`);
        reset();
      }
    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Categoria</h2>}
        >
        <Head title='Editar Categoria' />
        <form onSubmit={handleSubmit} className="flex mx-14">
                    <InputLabel className="flex flex-col my-2 m-4"> Categoria:
                        <TextInput
                            className="max-w-xs bg-[#FFFFFF]/60 text-sm font-bold text-md"
                            placeholder="Nova categoria"
                            onChange={e => setData('category', e.target.value)}
                            value={ data.category }
                            id="category"
                        />
                        {errors.category && <div>{errors.category}</div>}
                    </InputLabel>
                    <ButtonCard
                        type='submit'
                        className='bg-cyan-600 w-24 mx-4 my-2 h-10 self-end'
                    >
                        Salvar
                    </ButtonCard>
            </form>
        </AuthenticatedLayout>
    )
}
