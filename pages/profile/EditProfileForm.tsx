import React, { memo } from "react";
import styled from "styled-components";

const EditProfileFormContainer = styled.div`

`;

const Header = styled.h1`
    font-family: "Poppins", sans-serif;
    padding: 0px 40px;
`

interface EditProfileFormProps {
    
}

const EditProfileForm = memo(() => {
    return (
        <EditProfileFormContainer>
            <Header>Edit Profile</Header>
        </EditProfileFormContainer>
    );
});

export default EditProfileForm;