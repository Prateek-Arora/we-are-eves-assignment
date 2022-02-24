import React from 'react'
import classes from './Dropdown.module.css'

const Dropdown = ({options, ...dropdownProps}) => {

    return (
        <div className={classes.Dropdown} {...dropdownProps}>
            <label>
                <select className={classes.selectBox }>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </label>

        </div>
    )
}

export default Dropdown
