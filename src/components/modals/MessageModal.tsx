'use client'

import React, { useEffect } from 'react'
import { useMessageStore } from '@/store/useMessageStore'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'

const MessageModal: React.FC = () => {
  const { message, show, clearMessage, type } = useMessageStore()

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        clearMessage()
      }, 3000) // Mensaje visible durante 3 segundos

      return () => clearTimeout(timer)
    }
  }, [show, clearMessage])

  return (
    <AnimatePresence>
      {show && message && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-50"
          role="alert"
          aria-live="assertive"
        >
          <div className={`rounded-lg shadow-lg p-3 flex items-center space-x-2 ${
            type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {type === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            <p className="text-sm font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MessageModal