import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/searchBar.css';

class SearchBar extends Component {
    static propTypes = {
        onChangeSearchTerm: PropTypes.func.isRequired,
        searchFunction: PropTypes.func.isRequired,
    };

    render() {
        // valid patient IDs include 2744010, 4342012, 4342009
        return (
            <div className='search-bar'>
                <input onChange={this.props.onChangeSearchTerm}
                       placeholder="Enter Patient ID (i.e. 2744010)"
                       className='search-input'/>
                <button onClick={this.props.searchFunction}>Search</button>
            </div>
        );
    }
}

export default SearchBar;