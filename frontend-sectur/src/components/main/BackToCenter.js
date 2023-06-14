import React from 'react'
import { useEffect, useState } from 'react';

export default function BackToCenter() {
    const [GoCenter, setGoCenter] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setGoCenter(true);
            } else {
                setGoCenter(false);
            }
        })
    }, [])

    const scrollCenter = () => {
        window.scrollTo({
            top: 270,
            behavior: "smooth"
        })
    }

    return (
        <div className=''>
            {/* {GoCenter && (*/}
            <button type="button" style={
                {
                    position: "fixed",
                    bottom: "35%",
                    right: "0%",
                    height: "45px",
                    width: "45px",
                }
            }
                onClick={scrollCenter}>
                    <img src={require("../../assets/assetsMap/icons/center.png")} alt="centro"/>
                </button>
            {/*)}*/}
        </div>
    )
}
