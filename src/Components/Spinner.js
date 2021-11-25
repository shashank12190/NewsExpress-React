import React from 'react'
import loading from "./loading.gif"
export default function Spinner() {
    return (
        <div className="text-center mb-3" >
            <img src={loading} alt="loading" />
        </div>
    )
}
