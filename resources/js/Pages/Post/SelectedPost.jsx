import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import PostCard from './Partials/PostCard';
import CommentCard from '../Commentaries/Partials/CommentCard';
import ButtonCard from '@/Components/ButtonCard';
import NewComment from '../Commentaries/Partials/NewComment';

export default ({ auth, post }) => {
    const { id, subject, content, owner, categories, commentaries } = post;
    const [state, setState] = useState(false);

    const handleState = () => {
        if (state) {
            setState(false);
        } setState(true);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Post</h2>}
        >
            <Head title={`Post ${id}`} />
            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <PostCard
                        subject={subject}
                        content={content}
                        owner={owner.name}
                        user={auth.user}
                        id={id}
                        ownerId={owner.id}
                        categories={categories}
                        selectPost={true}
                    />
                </div>
            </div>

            {
                commentaries.map((item, index) => {
                    console.log(commentaries);
                    return (
                        <CommentCard
                            key={index}
                            content={item.content}
                            user={auth.user}
                            postId={item.post_id}
                            ownerId={item.user_id}
                            owner={item.user.name}
                            commentId={item.id}
                        />
                    )
                })
            }
            <div className="flex ml-11 mr-10 lg:px-8 flex-col my-3">
                {
                    state ?
                        <NewComment
                            auth={auth}
                            postInfo={post}
                            className="self-end"
                        />
                        :
                        <ButtonCard
                            onClick={handleState}
                            className="bg-cyan-600 self-end"
                        >
                            Comentar
                        </ButtonCard>
                }
            </div>
        </AuthenticatedLayout>
    );
}

