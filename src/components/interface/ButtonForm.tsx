import React from 'react'

const ButtonForm = ({children, ...props}: any) => {
    return (
        <button {...props} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            {children}
        </button>
    )
}

export default ButtonForm
