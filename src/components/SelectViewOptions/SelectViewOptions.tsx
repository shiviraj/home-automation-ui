import {FormControl, MenuItem, Select, Stack} from '@mui/material';

type SelectViewOptionsType = { options: Array<{ value: string, label: string }>, option: string, setIndex: (index: number) => void }

const SelectViewOptions = ({options, option, setIndex}: SelectViewOptionsType) => {
  const handleChange = (event: { target: { value: string } }) => {
    const value = event.target.value;
    setIndex(options.findIndex((item) => item.value === value));
  };

  return <Stack justifyContent={'right'} direction={'row'}>
    <FormControl sx={{minWidth: 200, mr: 4}} variant={'standard'}>
      <Select value={option} onChange={handleChange}>
        {options.map(({label, value}, index) => <MenuItem key={index} value={value}>
          {label}
        </MenuItem>)}
      </Select>
    </FormControl>
  </Stack>;
};

export default SelectViewOptions;