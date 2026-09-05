import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const LANGUAGES = [
  { value: "ru", label: "Русский" },
  { value: "cs", label: "Чешский" },
  { value: "en", label: "Английский" },
];

export const LangSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}) => {
  return (
    <FormControl>
      <InputLabel id="lang-select-label">Язык мероприятия</InputLabel>

      <Select
        labelId="lang-select-label"
        value={value}
        label="Язык мероприятия"
        onChange={onChange}
      >
        {LANGUAGES.map(({ value, label }) => (
          <MenuItem value={value} key={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
