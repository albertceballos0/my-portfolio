import { Button } from '@/components/ui/button'
import { DayPicker } from 'react-day-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { typeOptions } from '@/types'
import "react-day-picker/style.css";

// Propiedades de HistorialFilters
interface HistorialFiltersProps {
  dateFilter: Date | undefined;
  setDateFilter: (date: Date | undefined) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
}

// Componente HistorialFilters
export default function HistorialFilters({ dateFilter, setDateFilter, typeFilter, setTypeFilter }: HistorialFiltersProps) {

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-[240px] justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateFilter ? format(dateFilter, 'PPP') : <span>Seleccionar fecha</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <DayPicker
            mode="single"
            selected={dateFilter}
            onSelect={setDateFilter}
          />
        </PopoverContent>
      </Popover>
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Seleccionar tipo" />
        </SelectTrigger>
        <SelectContent>
          {typeOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
