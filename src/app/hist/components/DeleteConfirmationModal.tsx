import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

// Propiedades de DeleteConfirmationModal
interface DeleteConfirmationModalProps {
  isOpen: boolean
  isLoading: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteConfirmationModal({ isOpen, isLoading, onConfirm, onCancel }: DeleteConfirmationModalProps) {
  
  // Si no está abierto, no renderizar nada
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h3 className="text-lg font-bold mb-4">¿Eliminar este item?</h3>
        <div className="flex justify-between">
          {isLoading ? (
            <Loader2 className="animate-spin h-6 w-6" />
          ) : (
            <>
              <Button onClick={onConfirm} variant="destructive">
                Eliminar
              </Button>
              <Button onClick={onCancel} variant="outline">
                Cancelar
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
