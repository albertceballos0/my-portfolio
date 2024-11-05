'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent } from "@/components/ui/card"
import HistoryFilters from './HistoryFilters'
import { HistoryItem, RequestType } from '@/types'

interface Filters {
  timeFilter: string
  typeFilter: RequestType
  userFilter: string
}

export default function HistoryTable({ initialData }: { initialData: HistoryItem[] }) {
  const router = useRouter()
  const [historyData, setHistoryData] = useState(initialData)
  const [filteredData, setFilteredData] = useState(initialData)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<Filters>({ timeFilter: '', typeFilter: 'all', userFilter: '' })
  const [paginatedData, setPaginatedData] = useState<HistoryItem[]>([])
  const itemsPerPage = 10

  useEffect(() => {
    console.log('History data:', historyData)
    applyFilters()
  }, [filters, historyData])

  useEffect(() => {
    setPaginatedData(filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ))
  }, [filteredData, currentPage])

  const applyFilters = () => {
    const newFilteredData = historyData.filter(item => 
      (filters.timeFilter === '' || item.timestamp.includes(filters.timeFilter)) &&
      (filters.typeFilter === 'all' || item.requestType === filters.typeFilter) &&
      (filters.userFilter === '' || item.userEmail.toLowerCase().includes(filters.userFilter.toLowerCase()))
    )
    setFilteredData(newFilteredData)
    setCurrentPage(1)
  }

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters)
  }

  const handleRowClick = (item: HistoryItem) => {
    router.push(`/${item.requestType}?id=${item.id}`)
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  return (
    <>
      <HistoryFilters onFilterChange={handleFilterChange} />
      <Card>
        <CardContent>
          {filteredData.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>User</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item) => (
                    <TableRow key={item.id} onClick={() => handleRowClick(item)} className="cursor-pointer hover:bg-muted">
                      <TableCell>{item.timestamp}</TableCell>
                      <TableCell>{item.requestType}</TableCell>
                      <TableCell>{item.userEmail}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                                          onClick={() => currentPage > 1 && setCurrentPage(prev => Math.max(prev - 1, 1))}
                                          aria-disabled={currentPage === 1} size={undefined}                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink 
                              onClick={() => setCurrentPage(i + 1)}
                              isActive={currentPage === i + 1} size={undefined}                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                                          onClick={() => currentPage < totalPages && setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                          aria-disabled={currentPage === totalPages} size={undefined}                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No data available. Please try adjusting your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}