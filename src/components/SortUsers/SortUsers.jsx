export default function SortUsers({ setSort }) {
    return (
        <>
            <h4>Sort by: </h4>
            <select onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Recent</option>
                <option value="oldest">Oldest</option>
                <option value="name">Name</option>
            </select>
        </>
    );
}