"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = {
    name?: string;
}

export function DatePicker({ name }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>()
  const [hiddenValue, setHiddenValue] = React.useState('');

  React.useEffect(() => {
    if (date) {
      setHiddenValue(date.toISOString());
    } else {
        setHiddenValue('');
    }
  }, [date]);

  return (
    <>
        <input type="hidden" name={name} value={hiddenValue} />
        <Popover>
        <PopoverTrigger asChild>
            <Button
            variant={"outline"}
            className={cn(
                "w-full justify-start text-left font-normal h-12",
                !date && "text-muted-foreground"
            )}
            >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
            <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            />
        </PopoverContent>
        </Popover>
    </>
  )
}
