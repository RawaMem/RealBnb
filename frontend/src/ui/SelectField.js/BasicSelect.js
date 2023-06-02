import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function BasicSelect({value, label, style, handleChange, maxGuest}) {

    const dropDownVal = [];
    for(let i = 1; i <= maxGuest; i ++) {
        dropDownVal.push(i)
    };
  
    return (
      <Box sx={style}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            onChange={handleChange}
          >
            {dropDownVal.map(val => (
                <MenuItem key={val} value={val}>{val}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  