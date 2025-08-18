import React  from "react";


const Privateroute = ({children})=>{

    const token   = localStorage.getItem('token');
    if(!token){
        return (
            <>
            <div>
                page is protected
            </div>
            
            </>
        )
    }
    else{
        return children
    }
}

export default Privateroute;