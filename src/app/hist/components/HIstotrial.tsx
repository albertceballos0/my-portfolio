import HistorialHeader from './HistorialHeader';
import HistorialFilters from './HistorialFilters';
import HistorialTable from './HistorialTable';
import Pagination from './Pagination';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { useHistStore } from '@/store/useHist';
import { HistoryItem } from '@/types';

interface HistorialProps {
  isLoading: boolean;
}

export default function Historial({ isLoading }: HistorialProps) {
  const { removeRequest } = useApi();
  const { hist, removeHistInstance } = useHistStore();

  const [data, setData] = useState<HistoryItem[]>([]);
  const [dateFilter, setDateFilter] = useState<Date | undefined>();
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Actualiza la lista de historial cuando cambia el estado de autenticación
    if (!isLoading && data !== hist) setData(hist || []);
  }, [isLoading, hist]);

  // Filtrado de datos por email, fecha y tipo
  const filteredData = data.filter(item => {
    const dateMatch = !dateFilter || new Date(item.timestamp).toDateString() === dateFilter.toDateString();
    const typeMatch = typeFilter === 'all' || item.requestType === typeFilter;
    return dateMatch && typeMatch;
  });

  // Paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(0);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (totalPages > 0 && currentPage === 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Función para abrir modal de confirmación de eliminación
  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      setIsModalLoading(true);
      await removeRequest(itemToDelete);
      setData(data.filter(item => item.id !== itemToDelete));
      removeHistInstance(itemToDelete);
      setItemToDelete(null);
      setIsModalOpen(false);
      setIsModalLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-full">
      <HistorialHeader />
      <HistorialFilters
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />
      <HistorialTable
        isLoading={isLoading}
        paginatedData={paginatedData}
        handleDelete={handleDelete}
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        isLoading={isModalLoading}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}
