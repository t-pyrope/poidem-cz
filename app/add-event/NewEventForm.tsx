"use client";

import { Controller, useForm } from "react-hook-form";
import { eventSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { TagsSelect } from "@/app/add-event/TagsSelect";
import { Organizator } from "@/app/add-event/Organizator";
import { LangSelect } from "@/app/add-event/LangSelect";
import dayjs from "dayjs";
import { toast } from "sonner";

type FormInput = z.input<typeof eventSchema>;
type FormOutput = z.output<typeof eventSchema>;

export const NewEventForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<FormInput, undefined, FormOutput>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      link: "",
      date: new Date().toISOString(),
      tags: [],
      organization: "",
      organizer: "",
      address: "",
      lang: "ru",
      minPrice: 0,
      maxPrice: 0,
    },
  });

  const onSubmit = async (values: FormOutput) => {
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      toast("Заявка на добавление отправлена");
      reset();
    } catch (e) {
      console.error(e);
      toast.error("Что-то пошло не так, попробуйте еще раз чуть позже");
    }
  };

  return (
    <Stack
      spacing={3}
      sx={{ width: "100%", maxWidth: 400 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Название"
        {...register("title")}
        error={!!errors.title?.message}
        helperText={errors.title?.message}
      />

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <DateTimePicker
            label="Дата и время начала события"
            sx={{
              "& .MuiPickersOutlinedInput-notchedOutline": {
                borderRadius: "2rem",
              },
              "& .MuiIconButton-edgeEnd": { marginRight: "0" },
              "& .MuiPickersOutlinedInput-root:hover": {
                "& .MuiPickersOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.23)",
                },
              },
            }}
            value={dayjs(field.value)}
            onChange={(val) => field.onChange(val?.toISOString())}
          />
        )}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <TagsSelect value={field.value} onChange={field.onChange} />
        )}
      />

      <Organizator register={register} />

      <TextField
        label="Ссылка"
        {...register("link")}
        error={!!errors.link?.message}
        helperText={errors.link?.message}
      />

      <TextField label="Адрес" {...register("address")} />

      <Controller
        name="lang"
        control={control}
        render={({ field }) => (
          <LangSelect
            value={field.value}
            onChange={field.onChange}
          ></LangSelect>
        )}
      />

      <TextField label="Минимальная цена" {...register("minPrice")} />
      <TextField label="Максимальная цена" {...register("maxPrice")} />

      <Button variant="contained" type="submit">
        Отправить
      </Button>

      <Typography variant="body2" color="textSecondary">
        Событие будет добавлено в течение 24 часов
      </Typography>
    </Stack>
  );
};
