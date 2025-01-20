"use client";

import { useState } from "react";
import { Calendar } from "@/registry/default/ui/calendar";
import { DropdownProps, DropdownNavProps } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/default/ui/select";

export default function Component() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const handleCalendarChange = (_value: string | number, _e: React.ChangeEventHandler<HTMLSelectElement>) => {
    const _event = {
      target: {
        value: String(_value)
      },
    } as React.ChangeEvent<HTMLSelectElement>
    _e(_event);
  };

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border border-border p-2"
        classNames={{
          day_button: "rounded-full",
        }}
        captionLayout="dropdown-years"
        defaultMonth={new Date()}
        startMonth={new Date(1980, 6)}
        components={{
          DropdownNav: (props: DropdownNavProps) => {
            return (
              <div className="w-full flex items-center justify-center gap-3 [&>span]:text-sm [&>span]:font-medium">{props.children}</div>
            )
          },
          YearsDropdown: (props: DropdownProps) => {
            return (
              <Select
                value={String(props.value)}
                onValueChange={(value) => {
                  if (props.onChange) {
                    handleCalendarChange(value, props.onChange)
                  }
                }}
              >
                <SelectTrigger className="w-fit font-medium h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                  {props.options?.map((option) => (
                    <SelectItem key={option.value} value={String(option.value)} disabled={option.disabled}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )
          },
        }}
      />
      <p className="mt-4 text-xs text-muted-foreground text-center" role="region" aria-live="polite">Years dropdown - <a className="underline hover:text-foreground" href="https://daypicker.dev/" target="_blank" rel="noopener nofollow">React DayPicker</a></p>
    </div>
  );
}
