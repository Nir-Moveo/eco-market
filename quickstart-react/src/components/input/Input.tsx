import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
export interface ITextInput {
    label: string;
    description: string;

    setValue: any
}
const Input: React.FC<ITextInput> = (props: ITextInput) => {
    const [value, setValue] = useState<string>('')
    const [titleError, setTitleError] = useState<boolean>(false)

    return (

        <div>
            <InputLabel shrink htmlFor="input">
                {props.label}
            </InputLabel>
            <TextField
                onChange={(e) => setValue(e.target.value)}
                variant="outlined"
                placeholder={props.description}
                fullWidth
                required
                error={titleError}
                id="input"
            />
        </div>
    )
}
export default Input;
