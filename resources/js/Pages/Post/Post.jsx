import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PostCard from '@/Components/PostCard';

export default function Post({ auth, props}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
        >
            <Head title="Post" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="p-6 text-gray-900">Post Page</div>
                        { props.map((...post)=>{
                            return (
                                <PostCard
                                subject={ subject }
                                content={ content }
                                owner = { owner }
                                user = { auth.user.name }
                            />
                            );
                        }) }
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}


