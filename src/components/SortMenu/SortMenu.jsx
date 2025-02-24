import { useContext } from "react";
import { AppContext } from "../../store/app.context";
import { sortPosts } from '../../services/posts.services';

export default function SortMenu({ posts, setPosts, yourPosts }) {

    const { user } = useContext(AppContext);

    const handleSort = (posts, setPosts, sortBy) => {
        const sortedPosts = sortPosts(posts, sortBy)
    };

    if (!user) {
        return (
            <>
                <button onClick={() => handleSort(posts, setPosts, 'recent')}>Most Recent</button>
                <button onClick={() => handleSort(posts, setPosts, 'comments')}>Most Commented</button>
            </>
        );
    }

    return (
        <>
            <h4>Sort by: </h4>
            <select onChange={(e) => handleSort(posts, setPosts, e.target.value)}>
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
                <option value="likes">Most Likes</option>
                <option value="comments">Most Comments</option>
                {!yourPosts && <option value="author">Author</option>}
            </select>
        </>
    );
}