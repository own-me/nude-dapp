import React from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

const LoginFormContainer = styled.div`
    height: 100%;
`;

const EmailInput = styled.input`

`;

const PasswordInput = styled.input`

`;

export default function LoginForm() {
    const name = useAppSelector(state => state.user.name);
    const dispatch = useAppDispatch();

    return (
        <LoginFormContainer>
            <EmailInput />
            <PasswordInput />
        </LoginFormContainer>
    )
}