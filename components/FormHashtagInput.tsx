import React, { memo } from "react";
import styled from "styled-components";
import FormInput, { FormInputProps } from "./FormInput";

const HashtagInput = styled(FormInput)`
    font-family: Poppins, Open Sans;
    width: 100%;
    margin: 10px 0px;
    position: relative;
`;

interface FormHashtagInputProps extends FormInputProps {
    onChange: (value) => void;
}

const FormHashtagInput = memo((props: FormHashtagInputProps) => {
    const handleChange = (e) => {
        let value = String(e.target.value);
        if (value.charAt(0) !== "#") {
            value = "#" + value;
        }
        if (value.charAt(value.length - 1) === " ") {
            value = value + "#";
        }
        props.onChange(value);
    };

    return (
        <HashtagInput label="Hashtags" type="text" onChange={handleChange} inputValue={String(props.value)} />
    );
});

export default FormHashtagInput;