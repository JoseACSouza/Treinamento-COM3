import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import PostCard from './Partials/PostCard';
import CommentCard from '../Commentaries/Partials/CommentCard';
import ButtonCard from '@/Components/ButtonCard';
import NewComment from '../Commentaries/Partials/NewComment';

export default ({ auth, post, commentaries }) => {
    const { id, subject, content, owner, categories, storages } = post;
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
                    {console.log(storages.length > 0 ? storages[0].file : '')}
                    <PostCard
                        subject={subject}
                        content={content}
                        owner={owner.name}
                        user={auth.user}
                        id={id}
                        ownerId={owner.id}
                        categories={categories}
                        selectPost={true}
                        file={storages.length > 0 ? storages[0].file : ''}
                    />
                </div>
            </div>
            { console.log(commentaries) }
            {
                commentaries.data.map((item, index) => {
                    return (
                        <CommentCard
                            key={index}
                            content={item.content}
                            user={auth.user}
                            postId={item.post_id}
                            ownerId={item.user_id}
                            owner={item.user.name}
                            commentId={item.id}
                            file={ item.storages[0] ? item.storages[0].file : '' }
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
                                <div className='flex justify-center'>
                    <Link
                        href={commentaries.prev_page_url}
                        method="get"
                        as="button"
                        type="button"
                        disabled={!commentaries.prev_page_url}
                        className="disabled:opacity-75 pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 bg-sky-600">
                        {'<'}
                    </Link>
                    <p
                        className="ml-4 pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white bg-sky-600">
                        {commentaries.current_page}
                    </p>
                    <Link
                        href={commentaries.next_page_url}
                        method="get"
                        as="button"
                        type="button"
                        disabled={!commentaries.next_page_url}
                        className="disabled:opacity-75 ml-4 pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 bg-sky-600">
                        {'>'}
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

