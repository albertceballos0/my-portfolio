'use client'

import {  useEffect, useState } from 'react'
import { fetchHistoryData } from './utils/api'
import Historial from './components/HIstotrial'

export default function HistorialPage() {
  const [historialData, setHistorialData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHistoryData()
      setHistorialData(data)
      setIsLoading(false)
    }
    fetchData()
  },[])

  return <Historial initialData={historialData} isLoading={isLoading} />
  
}
