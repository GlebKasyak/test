import React, { useEffect, useState } from "react";
import "./style.scss";

import FilmItem from "./FilmItem";

const FilmList = ({ data, onWatch }) => {
    const [windowWidth, swtWindowWidth] = useState(window.innerWidth);

    const isMobile =  windowWidth <= 575;

    useEffect(() => {
        window.addEventListener("resize", updateWindowDimensions);

        return () => {
            window.removeEventListener("resize", updateWindowDimensions);
        }
    }, []);

    const updateWindowDimensions = () => {
        swtWindowWidth(window.innerWidth);
    };

    return (
        <div className="film-list" >
            { !!data.length && data.map(film => (
                <FilmItem film={ film } key={ film.id } onWatch={ onWatch } isMobile={ isMobile } />
            )) }
        </div>
    );
};

export default FilmList;
