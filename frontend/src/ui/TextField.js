import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function InputField({size, setter, type, val}) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': size,
            }}
            noValidate
            autoComplete="off"
            >        
            <TextField 
                id="standard-basic" 
                label="Address" 
                variant="standard" 
                value={val}
                onChange={e => setter(e.target.value)}
            />
        </Box>

    );
};

export default InputField;