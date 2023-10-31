import { useForm } from "@inertiajs/react";
import TextAreaInput from "../../../Components/TextAreaInput";
import TextInput from "../../../Components/TextInput";
import ButtonCard from "../../../Components/ButtonCard";
import InputLabel from "@/Components/InputLabel";

export default (previous) => {

    const { postId, content, user, ownerId, commentId } = previous.previous;
    const { data, setData, put, errors, reset, get, progress } = useForm({
        'content': content,
        'user_id': ownerId,
        'post_id': postId,
        'storage': null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/commentaries/${commentId}`);
        get('/posts/' + postId);
        reset();
    }

    return (
        <form onSubmit={handleSubmit}
            className={`flex flex-col p-3 bg-cyan-600/40 rounded`}>
            <TextAreaInput
                onChange={e => setData('content', e.target.value)}
                value={data.content}

            />
            {errors.content && <div className="text-red-400 text-sm">{errors.content}</div>}
            <InputLabel className="flex flex-col"> Adicionar anexo:
                <input type="file" filename={data.storage} onChange={e => setData('storage', e.target.files[0])} />
                {progress && (
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}
            </InputLabel>
            <div className="flex self-end scratch">
                <TextInput
                    className="max-w-xs bg-transparent text-sm read-only border-0 p-0 "
                    value={user.name}
                    disabled
                />
                <ButtonCard
                    type="button"
                    className="mr-2 h-10 bg-red-600 self-end"
                    onClick={() => get(`/posts/${postId}`)}
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
