import React, { useRef, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { MovieCardSearch, TvCardSearch } from "../MovieCard";
import tmdbApi from "../../services/tmdbApi";

const Form = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #1a1d29;
    width: ${(props) => (props.state ? "19rem" : "32px")};
    cursor: ${(props) => (props.state ? "auto" : "pointer")};
    gap: ${(props) => (props.state ? "20px" : "0")};
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
    border-radius: 8px;
    outline: none;

    @media only screen and (min-device-width: 320px) and (max-device-width: 420px) {
        display: none;
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
        width: ${(props) => (props.state ? "16rem" : "32px")};
    }
`;

const Input = styled.input`
    margin-left: ${(props) => (props.state ? "-20px" : "0rem")};
    background-color: transparent;
    font-weight: 300;
    font-size: 14px;
    line-height: 1;
    padding: 0px;
    border: none;
    width: 100%;
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

    &:focus,
    &:active {
        outline: none;
    }
    &::placeholder {
        color: #fff;
    }
`;

const Button = styled.button`
    display: flex;
    pointer-events: ${(props) => (props.state ? "auto" : "none")};
    cursor: ${(props) => (props.state ? "pointer" : "none")};
    background-color: transparent;
    margin-left: 0px;
    font-size: 16px;
    line-height: 1;
    outline: none;
    border: none;
    padding: 8px;
    color: #fff;
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const SearchHasil = styled.div`
    display: ${(props) => (props.state ? "block" : "none")};
    background-color: #1a1d29;
    position: absolute;
    border-radius: 8px;
    margin-top: 350px;
    overflow-y: auto;
    height: 300px;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const SearchHasilNot = styled.div`
    display: ${(props) => (props.state ? "block" : "none")};
    background-color: #1a1d29;
    position: absolute;
    border-radius: 8px;
    margin-top: 250px;
    overflow-y: auto;
    height: 200px;
    width: 100%;
`;

const NotFound = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    height: 100%;
`;

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
                    // console.log("query belum ada");
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
                        placeholder="Search for a movie or tv..."
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
    );
};

export default Search;
