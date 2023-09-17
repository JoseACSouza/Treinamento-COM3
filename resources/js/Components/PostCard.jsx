import { useState } from "react";
import { useForm } from "@inertiajs/react";
import DangerButton from "./DangerButton";
import Modal from "./Modal";
import SecondaryButton from "./SecondaryButton";
import UpdatePost from "./UpdatePost";
import ButtonCard from "./ButtonCard";

export default (postInfo) => {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [confirmingUserUpdation, setConfirmingUserUpdation] = useState(false);
    const { id, subject, content, owner, user, ownerId } = postInfo;

    const {
        data,
        delete: destroy,
        processing,
        reset,
    } = useForm();

    const deletePost = (e) => {
        e.preventDefault();
        data.id=id;
        destroy(route('post.destroy'), {
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
     <div className="bg-sky-500/20 rounded-lg p-3 m-3">
     {confirmingUserUpdation ? <UpdatePost
                    previous={postInfo}
                /> : <>
        <div>
            <h2 className="text-sm">{ owner }</h2>
            <div className="flex justify-between items-end">
                <h1 className="font-bold text-xl block">{ subject }</h1>
                { (owner === user.name && ownerId == user.id) ?
                    <div className=" flex justify-end">
                        <ButtonCard
                            type="button"
                            className="bg-cyan-600 mr-2"
                            onClick={handleUpdate}
                            > Editar
                        </ButtonCard>
                        <ButtonCard
                            type="submit"
                            className="bg-red-600"
                            onClick={confirmUserDeletion}
                            > Delete
                        </ButtonCard>
                    </div>
                : <></> }
            </div>
        </div>
        <p className="my-3">{ content }</p>
        <Modal show={confirmingUserDeletion} onClose={closeModal}>
            <form onSubmit={deletePost} className="p-6" name="param">
                <h2 className="text-lg font-medium text-gray-900">
                    Tem certeza que deseja apagar este post?
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
