import React from "react"

const MessageToast = () => {
    return (
        <div className=' fixed-bottom flex justify-center mx-9'>
            <p className=" mx-9 my-1 px-9 py-1 bg-red-300 
                  rounded-lg shadow-lg text-slate-600 font-semibold transition-all  duration-100 ease-in-out">
                Have error!</p>
        </div>)
}

export default MessageToast