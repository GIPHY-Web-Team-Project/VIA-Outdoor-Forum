import React, { useState } from 'react';
import './SearchBar.css';
export default function SearchBar({ searchId, searchOptions, setData, originalData }) {
    const [selectedSearch, setSelectedSearch] = useState(searchOptions[0]);

    const handleSelectedOption = (value) => {
        setSelectedSearch(value);
    }

    /**
     * Handles the search operation based on the selected search option and input data.
     * Filters the original data and updates the state with the filtered data.
     *
     * @function handleSearchOption
     * @returns {void}
     */
    const handleSearchOption = () => {
        const searchData = document.getElementById(searchId).value.toLowerCase();
        if (!searchData) {
            setData(originalData);
            return;
        }

        const filteredData = originalData.filter(item => {
            if (selectedSearch === 'username' || selectedSearch === 'title') {
                return item[selectedSearch].toLowerCase().includes(searchData);
            }
            if (selectedSearch === 'email' || selectedSearch === 'author') {
                return item[selectedSearch].toLowerCase().includes(searchData);
            }
            if (selectedSearch === 'name') {
                return item.firstName.toLowerCase().includes(searchData) || item.lastName.toLowerCase().includes(searchData);
            }
            return false;
        });
        setData(filteredData);
    }

    return (
        <div id="search-container">
            <div id="search-icon-div">
                <input type="text" id={searchId} className="search-input" placeholder='Search' />
                <button id="search-icon" onClick={handleSearchOption}></button>
            </div>
            <span id="span-search-by">by</span>
            <select onChange={(e) => handleSelectedOption(e.target.value)} className="search-select">
                {searchOptions.map(option => (
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}