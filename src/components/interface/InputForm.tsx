import React from 'react'

const InputForm = (props: any) => {
    return (
        <div>
            <h1>{props.text}</h1>
            <input
                type={props.type}
                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                placeholder={props.placeholder}
                required
            />
        </div>
    )
}

export default InputForm
