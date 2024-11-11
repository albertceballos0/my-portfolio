import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

// Propiedades de DeleteConfirmationModal
interface DeleteConfirmationModalProps {
  isOpen: boolean
  isLoading: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteConfirmationModal({
  isOpen,
  isLoading,
  onConfirm,
  onCancel
}: DeleteConfirmationModalProps) {
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    if (isOpen) setIsVisible(true)
    else setTimeout(() => setIsVisible(false), 150)
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-200 ${isOpen ? 'opacity-100 bg-black bg-opacity-50' : 'opacity-0'}`}
    >
      <div
        className={`transform transition-transform duration-200 ${isOpen ? 'scale-100' : 'scale-95'} bg-white p-6 rounded-lg shadow-lg max-w-sm w-full`}
      >
        <h3 className="text-lg font-bold mb-4 text-center text-gray-800">¿Eliminar este item?</h3>
        <p className="text-sm text-center text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={onConfirm}
            variant="destructive"
            className="w-24 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Eliminar'}
          </Button>
          <Button onClick={onCancel} variant="outline" className="w-24">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
