import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';


const CheckboxComponent = (props: any) => {
    const [checked, setChecked] = useState<boolean>(false);


    const handleChange = (event: any) => {
        setChecked(checked => !checked);

        props.onChange(event);
    }
    return (
        <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
                <FormControlLabel
                    value="End"
                    control={<Checkbox
                        checked={checked}
                        onChange={(e: any) => handleChange(e)} />}
                    label="End"
                    labelPlacement="end"
                />
            </FormGroup>
        </FormControl>
    );
}
export default CheckboxComponent
