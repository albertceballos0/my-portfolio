import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/useAuthStore'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Propiedades de Pagination
interface PaginationProps {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {

    const { user } = useAuthStore();
    if (!user) return null;

return (
    <div className="flex items-center justify-between py-4">
        <Button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1 || totalPages === 0}
            className="flex items-center space-x-2"
        >
            <ChevronLeft />
            <span>Anterior</span>
        </Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button 
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="flex items-center space-x-2"
        >
            <span>Siguiente</span>
            <ChevronRight />
        </Button>
    </div>  
    )
}
