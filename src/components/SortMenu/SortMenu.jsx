import { useContext } from "react";
import { AppContext } from "../../store/app.context";

export default function SortMenu({ setSort, myPosts }) {

    const { user } = useContext(AppContext);

    

    if (!user) {
        return (
            <>
                <button onClick={() => setSort('recent')}>Most Recent</button>
                <button onClick={() => setSort('comments')}>Most Commented</button>
            </>
        );
    }

    return (
        <>
            <h4>Sort by: </h4>
            <select onChange={(e) => setSort(e.target.value)}>
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
                <option value="likes">Most Likes</option>
                <option value="comments">Most Comments</option>
                {myPosts !== 'my-posts' && <option value="author">Author</option>}
            </select>
            <h4>Filter by:</h4>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="likes">Likes</option>
                <option value="Recent (Last week)">This week</option>
            </select>
        </>
    );
}