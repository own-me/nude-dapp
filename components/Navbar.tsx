import React from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setName } from "../redux/slices/user";

const NavbarContainer = styled.div`
     height: 60px;
     width: 100%;
     background-color: pink;
`;

export default function Navbar() {
    const name = useAppSelector(state => state.user.name);
    const dispatch = useAppDispatch();

    return (
        <NavbarContainer>
            <button onClick={() => dispatch(setName("hello"))}>hehe</button>
            {name}
        </NavbarContainer>
    )
}