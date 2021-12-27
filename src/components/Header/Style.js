import styled from "styled-components";

export const Form = styled.div`
    position: relative;
    background: #1a1d29;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 0.1px solid rgba(255, 255, 255, 0.3); */
    width: ${(props) => (props.state ? "19rem" : "32px")};
    cursor: ${(props) => (props.state ? "auto" : "pointer")};
    outline: none;
    gap: ${(props) => (props.state ? "20px" : "0")};
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
    border-radius: 8px;

    @media only screen and (min-device-width: 320px) and (max-device-width: 420px) {
        display: none;
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
        width: ${(props) => (props.state ? "16rem" : "32px")};
    }
`;

export const Input = styled.input`
    font-size: 14px;
    line-height: 1;
    font-weight: 300;
    background-color: transparent;
    padding: 0px;
    width: 100%;
    margin-left: ${(props) => (props.state ? "-20px" : "0rem")};
    border: none;
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

    &:focus,
    &:active {
        outline: none;
    }
    &::placeholder {
        color: #fff;
    }
`;

export const Button = styled.button`
    line-height: 1;
    pointer-events: ${(props) => (props.state ? "auto" : "none")};
    cursor: ${(props) => (props.state ? "pointer" : "none")};
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    display: flex;
    padding: 8px;
    font-size: 16px;
    margin-left: 0px;
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

export const SearchHasil = styled.div`
    margin-top: 10px;
    /* width: 300px; */
    height: 300px;
    background-color: #1a1d29;
    border-radius: 8px;
    overflow-y: auto;
    display: ${(props) => (props.state ? "block" : "none")};
    position: absolute;
    margin-top: 350px;

    ::-webkit-scrollbar {
        display: none;
    }
`;

export const SearchHasilNot = styled.div`
    margin-top: 250px;
    width: 100%;
    height: 200px;
    background-color: #1a1d29;
    // overflow: hidden;
    border-radius: 8px;
    overflow-y: auto;
    display: ${(props) => (props.state ? "block" : "none")};
    position: absolute;
`;

export const NotFound = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 14px;
`;
