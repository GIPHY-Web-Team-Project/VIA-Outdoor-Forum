import { useContext } from "react";
import { AppContext } from "../../store/app.context";

export default function SortMenu({ setSort }) {

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
                <option value="comments">Most Likes</option>
                <option value="author">Author</option>
            </select>
        </>
    );
}