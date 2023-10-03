import PostCard from "./PostCard";
export default (...props) => {
    const { posts, auth, allCategories, filter } = props[0];

    const isNull = val => val === null;
    let { filterCategory, filterOwner } = filter;
    filterCategory = isNull(filterCategory) ? '' : filterCategory;
    filterOwner = isNull(filterOwner) ? '' : filterOwner;
    console.log(posts[0].owner.id == filterOwner || filterOwner === '');
    return (
        posts
            .filter((c) => c.categories.map((c) => c.id).toString()
                .includes(filterCategory))
            .filter((o) => o.owner.id == filterOwner || filterOwner === '')
            .map((post, index) => {
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
            }))
}
