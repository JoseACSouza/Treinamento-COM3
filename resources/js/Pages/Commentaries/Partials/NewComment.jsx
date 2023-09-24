import { useForm } from "@inertiajs/react";
import TextAreaInput from "../../../Components/TextAreaInput";
import TextInput from "../../../Components/TextInput";
import ButtonCard from "../../../Components/ButtonCard";


export default ({ auth, postInfo, className }) => {
    const { data, setData, post, errors, reset, get } = useForm({
        'content': '',
        'user_id': auth.user.id,
        'post_id': postInfo.id,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/commentaries',{
        preserveScroll: true,
        onSuccess: () => get(route('post.show', postInfo.id)),
        });
        reset();
    }

    return (
        <form onSubmit={handleSubmit}
            className={`flex flex-col p-3 bg-cyan-600/40 rounded ${className}`}>
            <TextAreaInput
                onChange={e => setData('content', e.target.value)}
                value={data.content}

            />
            {errors.subject && <div className="text-red-400 text-sm">{errors.subject}</div>}
            <div className="flex self-end scratch">
                <TextInput
                    className="max-w-xs bg-transparent text-sm read-only border-0 p-0 "
                    value={auth.user.name}
                    disabled
                />
                <ButtonCard
                    type="button"
                    className="mr-2 h-10 bg-red-600 self-end"
                    onClick={()=>get(`/news/${postInfo.id}`)}
                > Cancelar
                </ButtonCard>
                <ButtonCard
                    type="submit"
                    className="mr-2 h-10 bg-cyan-600 self-end"
                > Enviar comentário
                </ButtonCard>
            </div>
        </form>
    );
};
