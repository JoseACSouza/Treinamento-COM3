import ButtonCard from "@/Components/ButtonCard";
import { Head } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default ({auth})=>{
    const {
        data, setData, post, errors,
    } = useForm({
        'category':''
    });
    const handleSubmit = (e)=>{
        e.preventDefault();
        post('/categories');
      }
    console.log('a');
    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Category</h2>}
        >
            <Head title="Nova Categoria" />
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
                        Adicionar
                    </ButtonCard>
            </form>
        </AuthenticatedLayout>
    )
}
