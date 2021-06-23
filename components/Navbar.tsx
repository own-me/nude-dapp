import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { setName } from '../redux/slices/user';

const NavbarContainer = styled.div`
     height: 60px;
     width: 100%;
     background-color: pink;
`;

export default function Navbar() {
    const name = useSelector(state => state.user.name);
    const dispatch = useDispatch();

    console.log(name);

    return (
        <NavbarContainer>
            <button onClick={() => dispatch(setName("hello"))}>hehe</button>
            {name}
        </NavbarContainer>
    )
}