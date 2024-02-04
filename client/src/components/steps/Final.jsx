import React from 'react'
import ReactLoading from "react-loading";

const refresh = () => window.location.reload(true)


const Final = ({ displayedResult }) => {
    if (displayedResult === "") {
        return <div className="flex flex-col mx-auto items-center">
            <p className="m-4">Please wait we are generating result..</p>
            <ReactLoading
                type="spinningBubbles"
                color="#000000"
                height={100}
                width={50}
            />
        </div>
    }
    else {
        return <div  className='mx-auto h-12 w-[150px] bg-blue-600 flex items-center justify-center rounded text-white'>
            <button onClick={refresh}>Generate Again</button>
        </div>
    }

}

export default Final