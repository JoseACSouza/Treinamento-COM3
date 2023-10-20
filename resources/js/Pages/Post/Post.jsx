import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PostCard from './Partials/PostCard';
import NewPost from './Partials/NewPost';
import Filter from '@/Components/Filter';

export default function Post({ auth, posts, allCategories, allPostOwners }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
            roles = {auth.roles}
        >
            {
                console.log(auth)
            }
            {
                console.log(auth.user)
            }
            <Head title="Post" />
            <NewPost auth={auth} allCategories={allCategories} />
            <Filter
                allCategories={allCategories}
                owners={allPostOwners.map((owners) => owners.owner)}
            />
            {console.log(posts)}
            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {
                        posts.data.map((post, index) => {
                            const { id, subject, content, owner, categories, commentaries, storages } = post;
                            console.log(storages);
                            return (
                                <PostCard
                                    key={index}
                                    countCommentaries={commentaries.length}
                                    subject={subject}
                                    content={content}
                                    owner={owner}
                                    user={auth.user}
                                    id={id}
                                    categories={categories}
                                    allCategories={allCategories}
                                    selectPost={false}
                                    isAdmin = { auth.roles && auth.roles.includes('admin') ? true : false }
                                    file={storages.length > 0 ? storages[0].file : ''}
                                />)
                        })
                    }
                </div>
                <div className='flex justify-center'>
                    <Link
                        href={posts.prev_page_url}
                        method="get"
                        as="button"
                        type="button"
                        disabled={!posts.prev_page_url}
                        className="disabled:opacity-75 pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 bg-sky-600">
                        {'<'}
                    </Link>
                    <p
                        className="ml-4 pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white bg-sky-600">
                        {posts.current_page}
                    </p>
                    <Link
                        href={posts.next_page_url}
                        method="get"
                        as="button"
                        type="button"
                        disabled={!posts.next_page_url}
                        className="disabled:opacity-75 ml-4 pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 bg-sky-600">
                        {'>'}
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

