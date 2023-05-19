import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function InputField({size, setter, val, label, type, id, multiline, rows, variant}) {
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
                id={id}
                label={label}
                variant={variant}
                multiline={multiline}
                value={val}
                type={type}
                rows={rows}
                onChange={e => setter(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                  }}
            />
        </Box>

    );
};

export default InputField;