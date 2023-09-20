import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PostCard from '@/Components/PostCard';
import NewPost from '@/Components/NewPost';

export default function Post({ auth, posts, allCategories}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
        >
            <Head title="Post" />
            <NewPost auth={auth} allCategories={allCategories}/>
            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {
                        posts.map((post, index)=>{
                            const { id, subject, content, owner, categories } = post;
                            return(
                            <PostCard
                                key={ index }
                                subject={ subject }
                                content={ content }
                                owner = { owner.name }
                                user = { auth.user }
                                id= { id }
                                ownerId={ owner.id }
                                categories={categories}
                            />)
                        }) }
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}

