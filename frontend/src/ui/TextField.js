import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function InputField({size, setter, val, label, type, id, multiline, rows, variant, labelFontSize, maxLength}) {
    console.log("maxLength", maxLength)
    const theme = createTheme({
        palette: {
          primary: {
            main:"#36454F"
          },
        },
        typography: {
          fontSize: 17, // change the default font size
        },
      });
    
    if(!maxLength) maxLength = null;

    return (
        <ThemeProvider theme={theme}>

            <Box
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
                        style: { fontSize: labelFontSize }, // or any other size you want
                    }}
                  
                />
            </Box>
        </ThemeProvider>

    );
};

export default InputField;