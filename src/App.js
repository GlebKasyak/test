import React, { useState, useEffect, useCallback }  from 'react';
import "./assets/styles/app.scss";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { InputField, Button, Icon, FilmList } from "./components";

import Icons from "./assets/images";
import { API_KEY } from "./shared/constants";

const App = () => {
    const [active, setActive] = useState("watched");

    const [list, setList] = useState([]);
    const [addedFilms, setAddedFilms] = useState([]);
    const [unwatchedFilmList, setUnwatchedFilmList] = useState([]);
    const [watchedFilmList, setWatchedFilmList] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    const [filmTitle, setFilmTitle] = useState("");

    const changeStatusHandler = name => {
        setActive(name);
    };

    const setWatchedFilms = filmId => {
        const watchedFilm = addedFilms.map(film => {
            if(film.id === filmId) {
                return {
                    ...film,
                    watched: !film.watched
                }
            };

            return film;
        });

        setAddedFilms(watchedFilm);
    }

    const fetchData = useCallback(async () => {
        const fetchData = await fetch(`https://api.themoviedb.org/3/list/1?api_key=${ API_KEY }`);
        const data = await fetchData.json();

        const updateData = data.items.map(film => {
            film.watched = false;
            return film
        })

        setList(updateData);
    }, []);

    const searchHandler = ({ target }) => {
        setSearchValue(target.value.trim());
    };

    useEffect(() => {
        if(searchValue) {
            const matchFilter = new RegExp(searchValue, "i");
            const data = active === "watched"
                ? addedFilms.filter(film => film.watched)
                : addedFilms.filter(film => !film.watched);
            const changeMethod = active === "watched" ? setWatchedFilmList : setUnwatchedFilmList;

            const filteredData = data.filter(({ title }) => !searchValue || matchFilter.test(title))
            changeMethod(filteredData)
        }
    }, [searchValue, unwatchedFilmList.length, watchedFilmList.length, active])

    useEffect(() => {
        setUnwatchedFilmList(addedFilms.filter(film => !film.watched));
        setWatchedFilmList(addedFilms.filter(film => film.watched));
    }, [addedFilms]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const addFilmHandler = () => {
        if(filmTitle) {
            const data = list.find(film => film.title === filmTitle);
            setAddedFilms(prevState => [...prevState, data]);
        }
    };

    return (
        <div className="container" >
            <div className="add-movie-container" >
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={ list.map(film => film.title) }
                    renderInput={(params) => (
                        <TextField
                            {...params }
                            onSelect={ ({ target }) => setFilmTitle(target.value.trim()) }
                            style={{ height: 40, fontSize: 14, margin: "0 10px 0 0", borderWidth: 5 }}
                            className="input_material-ui"
                            placeholder="Add Movie"
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                />
                <Button text="Add" onClick={ addFilmHandler }  />
            </div>
            <div className="control" >
                <div className="icons-block" >
                    <Icon
                        icon={ active === "watched" ? Icons.watchedActive : Icons.watched }
                        text="Watched"
                        name="watched"
                        activeName={ active }
                        onClick={ changeStatusHandler }
                    />
                    <Icon
                        icon={ active === "unwatched" ? Icons.unwatchedActive : Icons.unwatched }
                        text="Unwatched"
                        name="unwatched"
                        activeName={ active }
                        onClick={ changeStatusHandler }
                    />
                </div>
                <InputField
                    placeholder="Search Movies"
                    width={300}
                    height={35}
                    value={ searchValue }
                    onChange={ searchHandler }
                />
            </div>
            { active === 'watched'
                ?  <FilmList data={ watchedFilmList } onWatch={ setWatchedFilms } />
                :  <FilmList data={ unwatchedFilmList } onWatch={ setWatchedFilms } />
            }
        </div>
    );
};

export default App;
