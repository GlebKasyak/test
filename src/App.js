import React, { useState, useEffect } from "react";
import "./assets/styles/app.scss";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { InputField, Button, Icon, FilmList } from "./components";

import Icons from "./assets/images";
import { API_KEY } from "./shared/constants";

const App = () => {
    const [active, setActive] = useState("watched");
    const wathed = active === "watched";

    const [list, setList] = useState([]);
    const [addedFilms, setAddedFilms] = useState([]);
    const [unwatchedFilmList, setUnwatchedFilmList] = useState([]);
    const [watchedFilmList, setWatchedFilmList] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    const [filmTitle, setFilmTitle] = useState("");

    // const [value, setValue] = useState("");

    const setWatchedFilms = filmId => {
        const watchedFilm = addedFilms.map(film => {
            if (film.id === filmId) {
                return {
                    ...film,
                    watched: !film.watched
                };
            }

            return film;
        });

        setAddedFilms(watchedFilm);
    };

    useEffect(() => {
        if (searchValue) {
            const matchFilter = new RegExp(searchValue, "i");
            const data = wathed
                ? addedFilms.filter(film => film.watched)
                : addedFilms.filter(film => !film.watched);
            const changeMethod = wathed ? setWatchedFilmList : setUnwatchedFilmList;

            const filteredData = data.filter(
                ({ title }) => !searchValue || matchFilter.test(title)
            );
            changeMethod(filteredData);
        }
    }, [
        searchValue,
        unwatchedFilmList.length,
        watchedFilmList.length,
        wathed,
        addedFilms
    ]);

    useEffect(() => {
        setUnwatchedFilmList(addedFilms.filter(film => !film.watched));
        setWatchedFilmList(addedFilms.filter(film => film.watched));
    }, [addedFilms]);

    useEffect(() => {
        let ignore = false;

        const fetchData = async () => {
            const fetchData = await fetch(
                `https://api.themoviedb.org/3/list/1?api_key=${API_KEY}`
            );
            const data = await fetchData.json();

            const updateData = data.items.map(film => {
                film.watched = false;
                return film;
            });

            setList(updateData);
        };

        !ignore && fetchData();

        return () => {
            ignore = true;
        };
    }, []);

    const addFilmHandler = () => {
        const data = list.find(film => film.title === filmTitle);

        setAddedFilms(prevState => {
            const isRepeat = prevState.some(film => film.title === filmTitle);

            if (isRepeat) {
                return prevState;
            } else {
                return [...prevState, data];
            }
        });
    };
    //
    // const changeHandler = ({ target }) => {
    //     const regex = /[~@#%$]/;
    //     const isValid = regex.test(target.value);
    //     if(!isValid) {
    //         setValue(target.value)
    //     }
    // }

    return (
        <div className="container">
            <div className="add-movie-container">
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={list.map(film => film.title)}
                    renderInput={params => (
                        <TextField
                            {...params}
                            onSelect={({ target }) => setFilmTitle(target.value.trim())}
                            className="input_material-ui"
                            placeholder="Add Movie"
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                />
                <Button text="Add" onClick={addFilmHandler} disabled={!filmTitle} />
            </div>
            <div className="control">
                <div className="icons-block">
                    <Icon
                        icon={ Icons.watched }
                        text="Watched"
                        name="watched"
                        activeName={active}
                        onClick={setActive}
                    />
                    <Icon
                        icon={ Icons.unwatched }
                        text="Unwatched"
                        name="unwatched"
                        activeName={active}
                        onClick={setActive}
                    />
                </div>
                <InputField
                    placeholder="Search Movies"
                    value={searchValue}
                    onChange={({ target }) => setSearchValue(target.value.trim())}
                />
                {/*<InputField*/}
                {/*    placeholder="Test"*/}
                {/*    value={value}*/}
                {/*    onChange={changeHandler}*/}
                {/*/>*/}
            </div>
            {active === "watched"
                ? !!watchedFilmList.length && (
                <FilmList data={watchedFilmList} onWatch={setWatchedFilms} />
            )
                : !!unwatchedFilmList.length && (
                <FilmList data={unwatchedFilmList} onWatch={setWatchedFilms} />
            )}
        </div>
    );
};

export default App;
