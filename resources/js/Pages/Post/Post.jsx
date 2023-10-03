import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PostCard from './Partials/PostCard';
import NewPost from './Partials/NewPost';
import Filter from '@/Components/Filter';
import FilteredPost from './Partials/FilteredPost';

export default function Post({ auth, posts, allCategories, filter }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
        >
            <Head title="Post" />
            <NewPost auth={auth} allCategories={allCategories} />
            <Filter
                allCategories={allCategories}
                owners={posts.map((post) => post.owner)}
            />
            {console.log(posts[0].categories.map((a) => a.id))}
            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {
                        filter ?
                        <FilteredPost
                            posts={posts}
                            auth={auth}
                            allCategories={allCategories}
                            filter={filter}
                        /> :
                        posts.map((post, index) => {
                            const { id, subject, content, owner, categories, commentaries } = post;
                            return (
                                <PostCard
                                    key={index}
                                    countCommentaries={commentaries.length}
                                    subject={subject}
                                    content={content}
                                    owner={owner.name}
                                    user={auth.user}
                                    id={id}
                                    ownerId={owner.id}
                                    categories={categories}
                                    allCategories={allCategories}
                                    selectPost={false}
                                />)
                        })
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

