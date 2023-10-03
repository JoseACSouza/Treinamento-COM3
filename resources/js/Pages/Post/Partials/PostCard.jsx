import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import DangerButton from "../../../Components/DangerButton";
import Modal from "../../../Components/Modal";
import SecondaryButton from "../../../Components/SecondaryButton";
import UpdatePost from "./UpdatePost";
import ButtonCard from "../../../Components/ButtonCard";
import CommentariesIcon from "../../Commentaries/Partials/commentariesIcon";

export default (postInfo) => {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [confirmingUserUpdation, setConfirmingUserUpdation] = useState(false);
    const { id, subject, content, owner, user, ownerId, categories, selectPost, countCommentaries } = postInfo;

    const {
        data,
        delete: destroy,
        processing,
        reset,
    } = useForm();

    const deletePost = (e) => {
        e.preventDefault();
        data.id = id;
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
                    <h2 className="text-sm">{owner}</h2>
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <h1 className="font-bold text-xl block my-2">{subject}</h1>
                            <div className="flex" >
                                {
                                    categories.map((item, index) =>
                                        <div key={index} className=" bg-yellow-100 ml-2 px-2 py-1 text-xs rounded">
                                            {item.category}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        {(owner === user.name && ownerId == user.id && selectPost === false) ?
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
                            : <></>}
                    </div>
                </div>
                <p className="my-2 bg-sky-600/20 p-1 rounded">{content}</p>
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
                {
                    !selectPost ? (
                        <div className="flex items-center justify-end">

                            <Link
                                href={`/news/${id}`}
                                method="get"
                                as="button"
                                type="button"
                                className="flex pointer-events-auto rounded-md p-1.5 text-[0.8125rem] font-semibold leading-5 hover:bg-blue-500 mx-1">
                                <CommentariesIcon/>
                                <p className="text-xs ml-1">{`${countCommentaries} ${countCommentaries === 1 ? 'comentário' : 'comentários'}`}</p>
                            </Link>
                        </div>
                    ) : <></>
                }
            </>
            }
        </div>
    )
}
