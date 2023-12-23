import React from 'react'

const Error = (props: any) => {
    return (
        <div>
            <p className="text-red-600 text-[16px] mb-4">
                {props.text}
            </p>
        </div>
    )
}

export default Error
