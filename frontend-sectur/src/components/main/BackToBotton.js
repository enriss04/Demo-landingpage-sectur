import React from 'react'
import { useEffect, useState } from 'react';

export default function BackToBotton() {
    const [GoBotton, setGoBotton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setGoBotton(true);
            } else {
                setGoBotton(false);
            }
        })
    }, [])

    const scrollBotton = () => {
        window.scrollTo({
            top:700,
            behavior: "smooth"
        })
    }

    return (
        <div className=''>
            {/* {GoBotton && (*/}
            <button type="button" style={
                {
                    position: "fixed",
                    bottom: "25%",
                    right: "0%",
                    height: "45px",
                    width: "45px",
                }
            }
                onClick={scrollBotton}>
                    <img src={require("../../assets/assetsMap/icons/Botton.png")} alt="abajo"/>
                </button>
            {/*)}*/}
        </div>
    )
}
