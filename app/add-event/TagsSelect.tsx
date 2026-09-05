import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { Tag } from "@/app/types";
import { getTagName } from "@/app/utils";

const TAGS: Tag[] = [
  "diskuze",
  "workshop",
  "festival",
  "děti",
  "charita",
  "performance",
  "komentovaná prohlídka",
  "film",
  "výstava",
];

export const TagsSelect = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
}) => {
  return (
    <FormControl>
      <InputLabel id="tags-select-label">Категории</InputLabel>

      <Select
        labelId="tags-select-label"
        label="Категории"
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) =>
          selected.map((tag) => getTagName(tag as Tag)).join(", ")
        }
      >
        {TAGS.map((tag) => {
          const selected = value.includes(tag);

          const SelectionIcon = selected
            ? CheckBoxIcon
            : CheckBoxOutlineBlankIcon;

          return (
            <MenuItem key={tag} value={tag} dense>
              <SelectionIcon
                fontSize="small"
                style={{
                  marginRight: 8,
                  padding: 9,
                  boxSizing: "content-box",
                }}
              />
              <ListItemText primary={getTagName(tag)} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
