import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import tmdbApi from "../../services/tmdbApi";
import { MovieCardSearch, TvCardSearch } from "../MovieCard";
import {
    Form,
    SearchHasil,
    SearchHasilNot,
    Input,
    Button,
    NotFound,
} from "./Style";

const Search = () => {
    const [query, setQuery] = useState("");

    const [items, setItems] = useState([]);
    const [itemsTv, setItemsTv] = useState([]);

    const onChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    };

    useEffect(() => {
        const getList = async () => {
            try {
                let response = null;
                if (query === "") {
                    console.log("query belum ada");
                } else {
                    const category = "movie";
                    const params = {
                        query: query,
                    };
                    response = await tmdbApi.search(category, {
                        params,
                    });
                }
                setItems(response.results);

                // setTotalPage(response.total_pages);
            } catch {
                // console.log("query belum dimasukan");
            }
        };
        getList();
    }, [query]);

    useEffect(() => {
        const getList = async () => {
            try {
                let response = null;
                if (query === "") {
                    // console.log("");
                } else {
                    const category = "tv";
                    const params = {
                        query: query,
                    };
                    response = await tmdbApi.search(category, {
                        params,
                    });
                }
                setItemsTv(response.results);
            } catch {
                // console.log("");
            }
        };
        getList();
    }, [query]);

    // const data = { ...items, ...itemsTv };

    // console.log(data);
    // console.log(itemsTv);

    const [state, setState] = useState(false);
    const node = useRef();
    const inputFocus = useRef();

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // cleanup event when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    // On click outside, change input state to false
    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            return;
        } else {
            setState(false);
        }
        // outside click
    };

    return (
        <>
            <div className="header__item">
                <div className="search">
                    <Form
                        state={state}
                        onClick={() => {
                            setState(true);
                            inputFocus.current.focus();
                        }}
                        ref={node}
                    >
                        <Button type="submit" state={state}>
                            <FaSearch />
                        </Button>
                        <Input
                            onChange={onChange}
                            ref={inputFocus}
                            value={query}
                            state={state}
                            type="text"
                            placeholder="search for a movie or tv..."
                        />
                        {query === "" ? null : items.length !== 0 ? (
                            <SearchHasil state={state}>
                                {query === "" ? null : (
                                    <>
                                        {items &&
                                            items.map((item, i) => (
                                                <MovieCardSearch
                                                    key={i}
                                                    className="card_slide"
                                                    item={item}
                                                    category="movie"
                                                />
                                            ))}
                                        {itemsTv &&
                                            itemsTv.map((item, i) => (
                                                <TvCardSearch
                                                    key={i}
                                                    className="card_slide"
                                                    item={item}
                                                    category="tv"
                                                />
                                            ))}
                                    </>
                                )}
                            </SearchHasil>
                        ) : (
                            <SearchHasilNot state={state}>
                                <NotFound>
                                    <h4>Not Found</h4>
                                </NotFound>
                            </SearchHasilNot>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Search;
