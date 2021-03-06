import React, {useState} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import "./style.scss";

import Images from "../../assets/images";

const FilmItem = ({film, onWatch, isMobile}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={"film-item " + (open ? "film-item--open" : "")}>
            {open ? (
                <div className="film-info padding-left">
                    <div className="film-info__title-wrapper">
            <span className="film-item__title" onClick={() => setOpen(false)}>
              {film.title}
            </span>
                        {!isMobile && (
                            <CheckBoxApp
                                watched={film.watched}
                                onClick={onWatch.bind(null, film.id)}
                            />
                        )}
                    </div>
                    <div className="film-info__block">
                        <img
                            src={Images.defaultImage}
                            alt={film.title}
                            className="film-info__image"
                        />
                        <div className="film-info__description">
              <span className="film-info__text">
                Year: {film.release_date.split("-")[0]}{" "}
              </span>
                            <span className="film-info__text">Runtime: unknown</span>
                            <span className="film-info__text">
                IMDB Score: {film.vote_average ? film.vote_average : "unknown"}
              </span>
                            {isMobile && (
                                <CheckBoxApp
                                    watched={film.watched}
                                    onClick={onWatch.bind(null, film.id)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <span
                    className="film-item__title padding-left"
                    onClick={() => setOpen(true)}
                >
          {film.title}
        </span>
            )}
        </div>
    );
};

const CheckBoxApp = ({watched, onClick}) => (
    <div onClick={onClick} className="checkbox-component">
        <Checkbox checked={watched}/>
        <span style={{marginLeft: 4}}>Watched</span>
    </div>
);

export default FilmItem;
