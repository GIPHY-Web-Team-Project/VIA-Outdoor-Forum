import { useContext } from "react";
import { AppContext } from "../../store/app.context";
import { useNavigate } from 'react-router-dom';

export default function SortMenu({ setSort, setFilterMethod, id }) {
    const { user, userData } = useContext(AppContext);

    const navigate = useNavigate();

    if (!user) {
        return (
            <div className='anon-btns'>
                <button className='btn' onClick={() => setSort('recent')}>Most Recent</button>
                <button className='btn' onClick={() => setSort('comments')}>Most Commented</button>
            </div>
        );
    }

    return (
        <div id="sort-filter-container">
            <h4 className="sort-filter-label">Sort by: </h4>
            <select className="sort-filter-element" onChange={(e) => setSort(e.target.value)}>
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
                <option value="likes">Most Likes</option>
                {id !== 'comments' && <option value="comments">Most Comments</option>}
                {id !== 'my-posts' && <option value="author">Author</option>}
            </select>
            <h4 className="sort-filter-label">Filter by:</h4>
            <select className="sort-filter-element" onChange={(e) => setFilterMethod(e.target.value)}>                    <option value="all">All</option>
                <option value="likes">Likes</option>
                <option value="Recent (Last week)">This week</option>
            </select>
             
        </div>
    );
}