import React from 'react'
import classes from './SearchField.module.css'

const SearchField = ({...searchProps}) => {
    return (
        <input className={classes.SearchField} type="text" placeholder="Search" {...searchProps}/>
    )
}

export default SearchField;