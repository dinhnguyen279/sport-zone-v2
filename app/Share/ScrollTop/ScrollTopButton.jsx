import React, { useState, useEffect } from 'react';
import { AiOutlineArrowUp } from "react-icons/ai"
function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleButtonClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <button className={`scroll-to-top-button ${isVisible ? '' : 'hidden-scrolltop'}`} onClick={handleButtonClick}>
            <AiOutlineArrowUp />
        </button>
    );
}

export default ScrollToTopButton;
