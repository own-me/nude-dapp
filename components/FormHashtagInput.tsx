import React, { memo } from "react";
import styled from "styled-components";
import FormInput, { FormInputProps } from "./FormInput";

const HashtagInput = styled(FormInput)`
    font-family: Poppins, Open Sans;
    width: 100%;
    margin: 10px 0px;
    position: relative;
`;

const FormHashtagInput = memo((props: FormInputProps) => {
    return (
        <HashtagInput {...props} type="text" />
    );
});

export default FormHashtagInput;