import React from 'react'

const Button = ({className, btnText, ...btnProps}) => {
    return (
        <button className={className} {...btnProps}>{btnText}</button>
    )
}

export default Button
