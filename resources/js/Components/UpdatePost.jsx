import { useState, } from "react";
import { router, useForm } from "@inertiajs/react";
import TextInput from "./TextInput";

export default ({previous})=>{
    const { subject, content, user, id } = previous;
    const [values, setValues] = useState({
        id: id,
        subject: subject,
        content: content,
        users_id: user.id,
      })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
      }

      function handleSubmit(e) {
        e.preventDefault();
        router.put('post', values);
        cancelar();
      }

      function cancelar(){
        router.get('news');
      }

    return(
        <div className="bg-sky-500/20 rounded-lg p-3 m-3 h-72">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col item-start ">
                <TextInput
                    className="max-w-xs bg-transparent text-sm read-only border-0"
                    value={ user.name }
                    disabled
                />
                <TextInput
                    className="max-w-md bg-[#FFFFFF]/60 text-sm font-bold text-xl"
                    placeholder="Título"
                    onChange={handleChange}
                    value={ values.subject }
                    id="subject"
                />
                </div>
                <div className="flex flex-col">
                    <textarea
                        className="resize-none min-w-fit text-md h-32 my-2 border-0 bg-[#FFFFFF]/60"
                        placeholder="Escreva algo legal"
                        onChange={handleChange}
                        value={ values.content }
                        id="content"
                        />
                        <div className="flex flex-row self-end">

                    <button
                        type="button"
                        className="pointer-events-auto rounded-md bg-cyan-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 mr-2 w-20 "
                        onClick={cancelar}
                        > Cancelar
                    </button>
                    <button
                        type="submit"
                        className="pointer-events-auto rounded-md bg-cyan-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 mr-2 w-20 self-end"
                        > Editar
                    </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
