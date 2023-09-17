import { useForm } from "@inertiajs/react";
import TextInput from "./TextInput";
import ButtonCard from "./ButtonCard";
import TextAreaInput from "./TextAreaInput";
import InputLabel from "./InputLabel";

export default ({previous})=>{
    const { subject, content, user, id } = previous;
    const { data, setData, put, processing, errors, get } = useForm({
        id: id,
        subject: subject,
        content: content,
        users_id: user.id,
      });


      function handleSubmit(e) {
        e.preventDefault();
        put('post');
        cancelar();
      }

      function cancelar(){
        get('news');
      }

    return(
        <div className="bg-sky-500/20 rounded-lg p-3 m-3 h-76">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col item-start ">
                <TextInput
                    className="max-w-xs bg-transparent text-sm read-only border-0"
                    value={ user.name }
                    disabled
                />
                <InputLabel className="flex flex-col my-2"> Título:
                    <TextInput
                    className="max-w-md bg-[#FFFFFF]/60 text-sm font-bold text-xl"
                    placeholder="Escreva um título para seu post"
                    onChange={e => setData('subject', e.target.value)}
                    value={ data.subject }
                    id="subject"
                />
                </InputLabel>
                {errors.subject && <div>{errors.subject}</div>}
                </div>
                <div className="flex flex-col">
                    <InputLabel className="flex flex-col"> Conteúdo do post:
                        <TextAreaInput
                            placeholder="Escreva algo legal"
                            onChange={e => setData('content', e.target.value)}
                            value={ data.content }
                            id="content"
                        />
                    </InputLabel>

                    <div className="flex flex-row self-end">

                        <ButtonCard
                            type="button"
                            className="bg-red-600 mr-2"
                            onClick={cancelar}
                        >
                            Cancelar
                        </ButtonCard>
                        <ButtonCard
                            type="submit"
                            className="bg-cyan-600 self-end"
                            disabled={processing}
                        >
                            Salvar
                        </ButtonCard>
                    </div>
                </div>
            </form>
        </div>
    );
}
