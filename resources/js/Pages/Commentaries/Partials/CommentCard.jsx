import { useState } from "react";
import { useForm } from "@inertiajs/react";
import DangerButton from "../../../Components/DangerButton";
import Modal from "../../../Components/Modal";
import SecondaryButton from "../../../Components/SecondaryButton";
import SmallButtonCard from "../../../Components/ButtonCard";
import UpdateComment from "./UpdateComment";

export default (commentInfo) => {
    const [confirmingCommentDeletion, setConfirmingUserDeletion] = useState(false);
    const [confirmingUserUpdation, setConfirmingUserUpdation] = useState(false);
    const { postId, content, user, ownerId, owner, commentId } = commentInfo;

    const {
        data,
        delete: destroy,
        processing,
        reset,
    } = useForm();

    const deletePost = (e) => {
        e.preventDefault();
        data.id = postId;
        destroy(route('commentaries.destroy', commentId ), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => <p>Woops! Ocorreu algum erro na exclusão do Post</p>,
            onFinish: () => reset(),
        });
    };
    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        setConfirmingUserUpdation(true);

        reset();
    };

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    return (
        <div className="bg-sky-400/20 rounded-lg px-2 pb-3 pt-1 m-3 mx-40">
            {confirmingUserUpdation ? <UpdateComment
                previous={commentInfo}
            /> : <>
                <p className="my-3 text-m font-bold">{owner + ':'}</p>
                <p className="my-3 text-sm">{content}</p>
                    {(ownerId == user.id) ?
                        <div className="flex justify-end">
                            <SmallButtonCard
                                type="button"
                                className="bg-cyan-600 mr-2 text-xs"
                                onClick={handleUpdate}
                            > Editar
                            </SmallButtonCard>
                            <SmallButtonCard
                                type="submit"
                                className="bg-red-600 text-xs"
                                onClick={confirmUserDeletion}
                            > Delete
                            </SmallButtonCard>
                        </div>
                        : <></>}
                <Modal show={confirmingCommentDeletion} onClose={closeModal}>
                    <form onSubmit={deletePost} className="p-6" name="param">
                        <h2 className="text-lg font-medium text-gray-900">
                            Tem certeza que deseja apagar este comentário?
                        </h2>
                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Melhor não!</SecondaryButton>
                            <DangerButton className="ml-3" disabled={processing}>
                                Sim, delete-o!
                            </DangerButton>
                        </div>
                    </form>
                </Modal>
            </>
            }
        </div>
    )
}
