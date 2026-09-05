"use client";

import { Select } from "@/app/components/Select";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUpdateParams } from "@/app/components/Filters/utils";

import "dayjs/locale/ru";

const CUSTOM_DATE = "__custom__";

export const DateFilter = () => {
  const searchParams = useSearchParams();
  const { updateParams } = useUpdateParams();

  const activeFrom = searchParams.get("from");
  const activeTo = searchParams.get("to");

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [pickerDate, setPickerDate] = useState<Dayjs | null>(
    activeFrom ? dayjs(activeFrom) : dayjs(),
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
      setPickerDate(activeFrom ? dayjs(activeFrom) : today);
      setDatePickerOpen(true);
      return;
    }

    const [from, to] = value.split("/");

    updateParams({ from, to });
  };

  const handleCustomDateAccept = (date: Dayjs | null) => {
    if (!date) return;

    const formatted = date.format("YYYY-MM-DD");

    updateParams({
      from: formatted,
      to: formatted,
    });

    setDatePickerOpen(false);
  };

  const today = dayjs();
  const todayString = today.format("YYYY-MM-DD");
  const todayOption = `${todayString}/${todayString}`;

  const tomorrowString = today.add(1, "day").format("YYYY-MM-DD");
  const tomorrowOption = `${tomorrowString}/${tomorrowString}`;
  const endOfWeek = today.endOf("week");
  const endOfWeekString = endOfWeek.format("YYYY-MM-DD");
  const thisWeekOption = `${todayString}/${endOfWeekString}`;

  const startOfWeekend =
    todayString === endOfWeekString ? endOfWeek : endOfWeek.subtract(1, "day");
  const startOfWeekendString = startOfWeekend.format("YYYY-MM-DD");
  const thisWeekendOption = `${startOfWeekendString}/${endOfWeekString}`;

  const startOfNextWeek = endOfWeek.add(1, "day");
  const startOfNextWeekString = startOfNextWeek.format("YYYY-MM-DD");
  const endOfNextWeek = startOfNextWeek.endOf("week");
  const endOfNextWeekString = endOfNextWeek.format("YYYY-MM-DD");
  const nextWeekOption = `${startOfNextWeekString}/${endOfNextWeekString}`;

  const dateOptions = [
    { value: todayOption, label: "Сегодня" },
    { value: tomorrowOption, label: "Завтра" },
    { value: thisWeekOption, label: "На этой неделе" },
    { value: thisWeekendOption, label: "На этих выходных" },
    { value: nextWeekOption, label: "На следующей неделе" },
    { value: CUSTOM_DATE, label: "Выбрать дату" },
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

      <MobileDatePicker
        open={datePickerOpen}
        onClose={() => setDatePickerOpen(false)}
        value={pickerDate}
        onChange={setPickerDate}
        onAccept={handleCustomDateAccept}
        disablePast={true}
        slotProps={{
          textField: {
            sx: {
              display: "none",
            },
          },
          actionBar: {
            actions: ["cancel", "accept"],
          },
        }}
      />
    </>
  );
};
