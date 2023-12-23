import React from 'react'

const Button = ({children, ...props}: any) => {
    return (
        <button {...props} className="p-2 px-5 -mt-1 bg-blue-800 rounded-full">
            {children}
        </button>
    )
}

export default Button
