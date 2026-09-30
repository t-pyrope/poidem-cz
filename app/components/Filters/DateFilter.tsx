"use client";

import { Select } from "@/app/components/Select";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUpdateParams } from "@/app/components/Filters/utils";

import "dayjs/locale/ru";
import { EventItem } from "@/app/types";

const CUSTOM_DATE = "__custom__";
dayjs.locale("ru");

export const DateFilter = ({ events }: { events: EventItem[] }) => {
  const searchParams = useSearchParams();
  const { updateParams } = useUpdateParams();

  const today = dayjs();
  const todayString = today.format("YYYY-MM-DD");
  const todayOption = `${todayString}/${todayString}`;

  const tomorrowString = today.add(1, "day").format("YYYY-MM-DD");
  const tomorrowOption = `${tomorrowString}/${tomorrowString}`;

  const startOfWeek = today.startOf("week");
  const startOfWeekOption = startOfWeek.format("YYYY-MM-DD");
  const endOfWeek = today.endOf("week");
  const endOfWeekString = endOfWeek.format("YYYY-MM-DD");
  const thisWeekOption = `${startOfWeekOption}/${endOfWeekString}`;

  const startOfWeekend = endOfWeek.subtract(1, "day");
  const startOfWeekendString = startOfWeekend.format("YYYY-MM-DD");
  const thisWeekendOption = `${startOfWeekendString}/${endOfWeekString}`;

  const startOfNextWeek = endOfWeek.add(1, "day");
  const startOfNextWeekString = startOfNextWeek.format("YYYY-MM-DD");
  const endOfNextWeek = startOfNextWeek.endOf("week");
  const endOfNextWeekString = endOfNextWeek.format("YYYY-MM-DD");
  const nextWeekOption = `${startOfNextWeekString}/${endOfNextWeekString}`;

  const startOfThisMonth = today.startOf("month");
  const startOfThisMonthString = startOfThisMonth.format("YYYY-MM-DD");
  const endOfThisMonth = today.endOf("month");
  const endOfThisMonthString = endOfThisMonth.format("YYYY-MM-DD");
  const thisMonthOption = `${startOfThisMonthString}/${endOfThisMonthString}`;

  const activeFrom = searchParams.get("from") ?? "";
  const activeTo = searchParams.get("to") ?? "";

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [pickerFrom, setPickerFrom] = useState<Dayjs | null>(
    activeFrom ? dayjs(activeFrom) : dayjs(),
  );
  const [pickerTo, setPickerTo] = useState<Dayjs | null>(
    activeTo ? dayjs(activeTo) : null,
  );

  const handleDateChange = (value: string) => {
    const today = dayjs();
    if (!value) {
      updateParams({
        from: "",
        to: "",
      });
      return;
    }

    if (value === CUSTOM_DATE) {
      setPickerFrom(activeFrom ? dayjs(activeFrom) : today);
      setPickerTo(activeTo ? dayjs(activeTo) : null);
      setDatePickerOpen(true);
      return;
    }

    const [from, to] = value.split("/");

    updateParams({ from, to });
  };

  const datesWithDuplicates = events.map(({ date }) =>
    dayjs(date).format("YYYY-MM-DD"),
  );
  const enableDates = Array.from(new Set(datesWithDuplicates));
  const isDateEnabled = (date: Dayjs | null): date is Dayjs =>
    !!date &&
    date.isValid() &&
    !date.isBefore(today, "day") &&
    enableDates.includes(date.format("YYYY-MM-DD"));
  const isRangeValid =
    isDateEnabled(pickerFrom) &&
    isDateEnabled(pickerTo) &&
    !pickerTo.isBefore(pickerFrom, "day");

  const handleCustomDateAccept = () => {
    if (!isRangeValid || !pickerFrom || !pickerTo) return;

    updateParams({
      from: pickerFrom.format("YYYY-MM-DD"),
      to: pickerTo.format("YYYY-MM-DD"),
    });
    setDatePickerOpen(false);
  };

  let dateOptions = [
    {
      value: todayOption,
      label: `Сегодня (${datesWithDuplicates.filter((date) => date === todayString).length})`,
    },
    {
      value: tomorrowOption,
      label: `Завтра (${datesWithDuplicates.filter((date) => date === tomorrowString).length})`,
    },
  ];

  if (!dateOptions.find((opt) => opt.value === thisWeekOption)) {
    dateOptions.push({
      value: thisWeekOption,
      label: `На этой неделе (${datesWithDuplicates.filter((date) => date >= todayString && date <= endOfWeekString).length})`,
    });
  }

  if (!dateOptions.find((opt) => opt.value === thisWeekendOption)) {
    dateOptions.push({
      value: thisWeekendOption,
      label: `На этих выходных (${datesWithDuplicates.filter((date) => date >= startOfWeekendString && date <= endOfWeekString).length})`,
    });
  }

  dateOptions = [
    ...dateOptions,
    {
      value: nextWeekOption,
      label: `На следующей неделе (${datesWithDuplicates.filter((date) => date >= startOfNextWeekString && date <= endOfNextWeekString).length})`,
    },
    {
      value: thisMonthOption,
      label: `В этом месяце (${datesWithDuplicates.filter((date) => date <= endOfThisMonthString).length})`,
    },
    { value: CUSTOM_DATE, label: "Выбрать период" },
  ];

  let dateValue = activeFrom && activeTo ? `${activeFrom}/${activeTo}` : "";
  const customValue =
    dateValue && !dateOptions.find(({ value }) => value === dateValue);

  if (customValue) {
    const fromDateIsValid = dayjs(activeFrom, "YYYY-MM-DD").isValid();
    const toDateIsValid = dayjs(activeTo, "YYYY-MM-DD").isValid();

    if (fromDateIsValid && toDateIsValid) {
      const fromLabel = dayjs(activeFrom).locale("ru").format("D MMM YYYY");
      dateOptions.push({
        value: dateValue,
        label:
          activeFrom === activeTo
            ? fromLabel
            : `${fromLabel} - ${dayjs(activeTo).locale("ru").format("D MMM YYYY")}`,
      });
    } else {
      dateValue = "";
    }
  }

  return (
    <>
      <Select
        ariaLabel="Дата"
        emptyOptionLabel="Любая дата"
        value={dateValue}
        options={dateOptions}
        onChange={handleDateChange}
      />

      <Dialog
        open={datePickerOpen}
        onClose={() => setDatePickerOpen(false)}
        aria-labelledby="date-filter-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="date-filter-dialog-title">Выбрать период</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <MobileDatePicker
              label="Начало периода"
              closeOnSelect
              slotProps={{ actionBar: { actions: [] } }}
              value={pickerFrom}
              onChange={(date) => {
                setPickerFrom(date);
                if (date?.isValid() && pickerTo?.isBefore(date, "day")) {
                  setPickerTo(null);
                }
              }}
              disablePast
              shouldDisableDate={(day) =>
                !enableDates.includes(day.format("YYYY-MM-DD"))
              }
            />
            <MobileDatePicker
              label="Конец периода"
              closeOnSelect
              slotProps={{ actionBar: { actions: [] } }}
              value={pickerTo}
              onChange={setPickerTo}
              minDate={pickerFrom?.isValid() ? pickerFrom : undefined}
              disablePast
              shouldDisableDate={(day) =>
                !enableDates.includes(day.format("YYYY-MM-DD"))
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDatePickerOpen(false)}>Отмена</Button>
          <Button onClick={handleCustomDateAccept} disabled={!isRangeValid}>
            Применить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
