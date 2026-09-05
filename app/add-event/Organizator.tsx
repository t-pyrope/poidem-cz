import { useState } from "react";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

export const Organizator = ({
  register,
}: {
  register: UseFormRegister<any>;
}) => {
  const [isOrganization, setIsOrganization] = useState(false);

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            value={isOrganization}
            onChange={() => setIsOrganization(!isOrganization)}
          />
        }
        label="Мероприятие проводит организация"
      />

      {isOrganization ? (
        <TextField label="Название организации" {...register("organization")} />
      ) : (
        <TextField label="Организатор" {...register("organizer")} />
      )}
    </>
  );
};
