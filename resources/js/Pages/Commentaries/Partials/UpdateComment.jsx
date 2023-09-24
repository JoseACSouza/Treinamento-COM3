import { useForm } from "@inertiajs/react";
import TextAreaInput from "../../../Components/TextAreaInput";
import TextInput from "../../../Components/TextInput";
import ButtonCard from "../../../Components/ButtonCard";

export default (previous) => {

    const { postId, content, user, ownerId, commentId } = previous.previous;
    console.log(postId);
    const { data, setData, put, errors, reset, get } = useForm({
        'content': content,
        'user_id': ownerId,
        'post_id': postId,
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/commentaries/${commentId}`);
        get('/news/' + postId);
        reset();
    }

    return (
    <form onSubmit={handleSubmit}
        className={`flex flex-col p-3 bg-cyan-600/40 rounded`}>
        <TextAreaInput
            onChange={e => setData('content', e.target.value)}
            value={data.content}

        />
        {errors.subject && <div className="text-red-400 text-sm">{errors.subject}</div>}
        <div className="flex self-end scratch">
            <TextInput
                className="max-w-xs bg-transparent text-sm read-only border-0 p-0 "
                value={user.name}
                disabled
            />
            <ButtonCard
                type="button"
                className="mr-2 h-10 bg-red-600 self-end"
                onClick={() => get(`/news/${postId}`)}
            > Cancelar
            </ButtonCard>
            <ButtonCard
                type="submit"
                className="mr-2 h-10 bg-cyan-600 self-end"
            > Enviar comentário
            </ButtonCard>
        </div>
    </form>
    )
}
