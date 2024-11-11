import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { HistoryItem } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';
import { useModalStore } from '@/store/useModalStore';

// Propiedades de HistorialTable
interface HistorialTableProps {
  isLoading: boolean;
  paginatedData: HistoryItem[];
  handleDelete: (id: string) => void;
}

export default function HistorialTable({ isLoading, paginatedData, handleDelete }: HistorialTableProps) {
  const { user, isInitialized } = useAuthStore();
  const { openModal } = useModalStore();

  if (!user && isInitialized) {
    return (
      <div className="text-center text-gray-400 p-4">
        <p>Por favor, inicia sesión para ver el historial.</p>
        <Button className="mt-4" onClick={() => openModal()}>
          Load Sample Graph
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full border border-gray-200 rounded-lg shadow-sm">
        <TableHeader className="bg-gray-100 border-b border-gray-300">
          <TableRow>
            <TableHead className="text-gray-700 font-semibold">Avatar</TableHead>
            <TableHead className="text-gray-700 font-semibold">Email</TableHead>
            <TableHead className="text-gray-700 font-semibold">Date</TableHead>
            <TableHead className="text-gray-700 font-semibold">Type</TableHead>
            <TableHead className="text-gray-700 font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading || !paginatedData  ? (
            Array.from({ length: 6 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-6 w-6" /></TableCell>
              </TableRow>
            ))
          ) : paginatedData.length > 0 ? (
            paginatedData.map((item: HistoryItem) => (
              <TableRow key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                <TableCell>
                  <Avatar>
                    <AvatarImage src={item.user.avatarUrl} alt={item.user.name || 'Usuario'} />
                    <AvatarFallback>{item.user.name?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="text-gray-800">{item.user.email}</TableCell>
                <TableCell className="text-gray-600">{format(new Date(item.timestamp), 'dd/MM/yyyy HH:mm')}</TableCell>
                <TableCell className="text-gray-600">{item.requestType}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    disabled={!user || user.email !== item.user.email}
                    className="text-red-600 hover:bg-red-50 focus:ring-2 focus:ring-red-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-400 text-md py-4">
                No se encontraron resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
