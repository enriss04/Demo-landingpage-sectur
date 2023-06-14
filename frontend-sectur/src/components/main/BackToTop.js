import React from 'react';
import { useEffect, useState } from 'react';

export default function BackToTop() {

    const [GoTop, setGoTop] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setGoTop(true);
            } else {
                setGoTop(false);
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className=''>
            {/* {GoTop && (*/}
            <button type="button" style={
                {
                    position: "fixed",
                    bottom: "45%",
                    right: "0%",
                    height: "45px",
                    width: "45px",        
                }
            }
                onClick={scrollUp}>
                    <img src={require("../../assets/assetsMap/icons/Up.png")} alt="arriba"/>
                </button>
            {/*)}*/}
        </div>
    )
}
