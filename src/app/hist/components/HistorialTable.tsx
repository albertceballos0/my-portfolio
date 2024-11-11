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

  //user de useAuthStore, estado global
  const { user, isInitialized } = useAuthStore();
  const { openModal } = useModalStore()

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
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell colSpan={5}>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
            ))
          ) : paginatedData.length > 0 ? (
            paginatedData.map((item: HistoryItem) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={item.user.avatarUrl} alt={typeof item.user.name === 'string' ? item.user.name : 'Usuario'} />
                    <AvatarFallback>{item.user.name?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{item.user.email}</TableCell>
                <TableCell>{format(new Date(item.timestamp), 'dd/MM/yyyy HH:mm')}</TableCell>
                <TableCell>{item.requestType}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} disabled={!user || user.email !== item.user.email}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-400 text-md">
                  No se encontraron resultados
                </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
