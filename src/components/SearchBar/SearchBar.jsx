import React, { useState } from 'react';

export default function SearchBar({ searchId, searchOptions, data, setData, originalData }) {
    const [dropOpen, setDropOpen] = useState(false);
    const [selectedSearch, setSelectedSearch] = useState(searchOptions[0]);

    const handleDropDownSearch = () => {
        setDropOpen(!dropOpen);
    }

    const handleSelectedOption = (value) => {
        setSelectedSearch(value);
        setDropOpen(false);
    }

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
            <label htmlFor={searchId}>Search:</label>
            <input type="text" id={searchId} />
            <button onClick={handleDropDownSearch}>{selectedSearch}</button>
            {dropOpen && (
                <div id="search-dropdown">
                    <ul>
                        {searchOptions.map(option => (
                            <li key={option} onClick={() => handleSelectedOption(option)}>{option}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button onClick={handleSearchOption}>Search</button>
        </div>
    );
}