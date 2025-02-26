import { useContext } from "react";
import { AppContext } from "../../store/app.context";

/**
 * SortMenu component renders sorting and filtering options for posts or comments.
 * It provides different options based on whether the user is logged in or not.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.setSort - Function to set the sorting method.
 * @param {Function} props.setFilterMethod - Function to set the filtering method.
 * @param {string} props.id - Identifier to determine the context (e.g., 'comments', 'my-posts').
 * @returns {JSX.Element} The rendered SortMenu component.
 */
export default function SortMenu({ setSort, setFilterMethod, id }) {
    const { user } = useContext(AppContext);

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
            <select className="sort-filter-element" onChange={(e) => setFilterMethod(e.target.value)}>                    
                <option value="all">All</option>
                <option value="likes">Likes</option>
                <option value="Recent (Last week)">This week</option>
            </select>
             
        </div>
    );
}