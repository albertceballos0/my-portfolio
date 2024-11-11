'use client'

import { useEffect, useState } from 'react'
import { useApi } from './hooks/useApi'
import Historial from './components/HIstotrial'
import { useHistStore } from '@/store/useHist'
import { useAuthStore } from '@/store/useAuthStore'

export default function HistorialPage() {

  //Estado de carga
  const [isLoading, setIsLoading] = useState(true)

  //Función para obtener el historial de la API con fetchHistoryData custom hook useApi
  const { fetchHistoryData } = useApi();

  //Estado global de historial y función para actualizarlo
  const { hist, setHist, isInitialized } = useHistStore();
  //Estado global de usuario
  const { user } = useAuthStore();

  //Obtener historial si no esta cargado y el usuario esta logueado
  useEffect(() => {
    //Función para obtener datos
    const fetchData = async () => {
      const data = await fetchHistoryData();
      setHist(data);
    };

    if (!isInitialized) return; //Si no esta inicializado no se hace nada, sigue en estado de loading
    //Si no hay historial (porque es la primera vez que clica el historial) y el usuario esta logueado se obtienen los datos
    if (!hist && user) fetchData();
    //Finalizar la carga
    setIsLoading(false);
  }, [hist, user]);

  //Componente Historial con estado de carga
  return <Historial isLoading={isLoading} />;
}
