import { useState, } from "react";
import { router } from "@inertiajs/react";
import TextInput from "./TextInput";

export default ({auth})=>{

    const [values, setValues] = useState({
        subject: "",
        content: "",
        users_id: auth.user.id,
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
        router.post('post', values);
        setValues({
            subject: "",
            content: "",
            users_id: auth.user.id,
          });
      }

    return(
        <div className="bg-sky-500/20 rounded-lg p-3 m-3 h-72">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col item-start ">
                <TextInput
                    className="max-w-xs bg-transparent text-sm read-only border-0"
                    value={ auth.user.name }
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
                    <button
                        type="submit"
                        className="pointer-events-auto rounded-md bg-cyan-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 mr-2 w-20 self-end"
                        > Postar
                    </button>
                </div>
            </form>
        </div>
    );
}
