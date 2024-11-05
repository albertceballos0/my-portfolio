'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const typeOptions = [
  { label: 'All', value: 'all' },
  { label: 'Branch and Bound', value: 'branch-and-bound' },
  { label: 'Object Detection', value: 'object-detection' },
  { label: 'Avatar Generation', value: 'avatar-generation' },
  { label: 'Object Removal', value: 'object-removal' },
  { label: 'Image Generation', value: 'image-generation' },
  { label: 'Style Transfer', value: 'style-transfer' },
]

type RequestType = 'branch-and-bound' | 'object-detection' | 'avatar-generation' | 'object-removal' | 'image-generation' | 'style-transfer' | 'all'

interface HistoryFiltersProps {
  onFilterChange: (filters: { timeFilter: string; typeFilter: RequestType; userFilter: string }) => void
}

export default function HistoryFilters({ onFilterChange }: HistoryFiltersProps) {
  const [timeFilter, setTimeFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState<RequestType>('all')
  const [userFilter, setUserFilter] = useState('')

  const applyFilters = () => {
    onFilterChange({ timeFilter, typeFilter, userFilter })
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <label htmlFor="time-filter" className="text-sm font-medium">Time</label>
            <Input
              id="time-filter"
              placeholder="Filter by time"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="type-filter" className="text-sm font-medium">Type</label>
            <Select onValueChange={(value) => setTypeFilter(value as RequestType)} value={typeFilter}>
              <SelectTrigger id="type-filter">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="user-filter" className="text-sm font-medium">User</label>
            <Input
              id="user-filter"
              placeholder="Filter by user"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={applyFilters}>Apply Filters</Button>
      </CardContent>
    </Card>
  )
}