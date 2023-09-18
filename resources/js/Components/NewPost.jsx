import { useForm } from "@inertiajs/react";
import TextInput from "./TextInput";
import ButtonCard from "./ButtonCard";
import TextAreaInput from "./TextAreaInput";
import InputLabel from "./InputLabel";

export default ({auth})=>{
    const { data, setData, post, errors, reset } = useForm({
        'id': '',
        'subject': '',
        'content': '',
        'users_id': auth.user.id,
      });


      function handleSubmit(e) {
        e.preventDefault();
        post('post/new');
        reset();
      }

    return(
        <div className="bg-sky-500/20 rounded-lg p-3 m-3 h-76">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col item-start ">
                <TextInput
                    className="max-w-xs bg-transparent text-sm read-only border-0 p-0 "
                    value={ auth.user.name }
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
                    {errors.content && <div>{errors.content}</div>}
                    <ButtonCard
                        type="submit"
                        className="mr-2 w-20 bg-cyan-600 self-end"
                        > Postar
                    </ButtonCard>
                </div>
            </form>
        </div>
    );
}
