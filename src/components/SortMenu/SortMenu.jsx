import { useContext } from "react";
import { AppContext } from "../../store/app.context";

export default function SortMenu({ setSort, setFilterMethod, myPosts }) {

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
        <div id="sort-filter-container">
            <h4 className="sort-filter-label">Sort by: </h4>
            <select className="sort-filter-element" onChange={(e) => setSort(e.target.value)}>
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
                <option value="likes">Most Likes</option>
                <option value="comments">Most Comments</option>
                {myPosts !== 'my-posts' && <option value="author">Author</option>}
            </select>
            <h4 className="sort-filter-label">Filter by:</h4>
            <select className="sort-filter-element" onChange={(e) => setFilterMethod(e.target.value)}>
                <option value="all">All</option>
                <option value="likes">Likes</option>
                <option value="Recent (Last week)">This week</option>
            </select>
        </div>
    );
}