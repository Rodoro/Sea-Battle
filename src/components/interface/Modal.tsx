import React from 'react'

const Modal = ({ children, visible, setVisible }: any) => {


    return (
        <div className={visible ? "visible" : "invisible"}>
            <div className="flex min-h-screen flex-col items-center justify-between p-44 bg-slate-800/50 absolute inset-0" onClick={() => setVisible(false)}>
                <div className=" bg-[#212121] p-8 rounded shadow-md w-96" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal
