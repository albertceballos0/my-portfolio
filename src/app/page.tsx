'use client'

import Head from 'next/head'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Route, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useGraphState } from '@/store/useGraphStore'

export default function HomePage() {

  const { setActiveTab} = useGraphState();

  return (
    <>
      <Head>
        <title>Portfolio - Proyectos en IA y Algoritmia Avanzada</title>
        <meta name="description" content="Descubre mis proyectos de Inteligencia Artificial y algoritmia avanzada en el ámbito de la Ingeniería Informática." />
        <meta name="keywords" content="Portafolio, Ingeniería Informática, Inteligencia Artificial, Algoritmia Avanzada, Tecnología" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tusitio.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "Person",
              "name": "Tu Nombre",
              "jobTitle": "Estudiante de Ingeniería Informática",
              "url": "https://tusitio.com",
              "sameAs": [
                "https://linkedin.com/in/tu-perfil",
                "https://github.com/tu-usuario"
              ],
              "alumniOf": "Tu Universidad"
            }),
          }}
        />
      </Head>
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Mi Portafolio en Inteligencia Artificial</h1>
        
        <p className="text-center text-xl mb-12 max-w-2xl mx-auto">
          Bienvenido a mi portafolio de proyectos. Aquí encontrarás mis desarrollos en Inteligencia Artificial y algoritmia avanzada, diseñados para resolver problemas complejos de manera eficiente.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Camera className="w-8 h-8 mr-3" aria-hidden="true" />
                Detección de Objetos
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">Proyecto de detección de objetos utilizando modelos avanzados de IA. Esta tecnología permite identificar objetos en imágenes con alta precisión y rapidez.</p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Reconocimiento de múltiples clases de objetos</li>
                <li>Procesamiento en tiempo real</li>
                <li>Fácil integración en sistemas existentes</li>
              </ul>
            </CardContent>
            <div className="px-6 pb-6">
              <Button asChild>
                <Link href="/object-detection">
                  Ver Proyecto <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
          
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Route className="w-8 h-8 mr-3" aria-hidden="true" />
                Solución al Problema del Viajero
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">Implementación de algoritmos avanzados para resolver el Problema del Viajero (TSP). Optimización de rutas para reducir costos y tiempo de recorrido.</p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Optimización para problemas de gran escala</li>
                <li>Soporte para múltiples restricciones</li>
                <li>Visualización de rutas óptimas</li>
              </ul>
            </CardContent>
            <div className="px-6 pb-6">
              <Button asChild>
                <Link href="/tsp" onClick={() => setActiveTab('instructions')}>
                  Ver Proyecto <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
        
        <p className="text-center mt-12 text-lg text-gray-600 max-w-2xl mx-auto">
          A lo largo de mi carrera en Ingeniería Informática, he desarrollado habilidades en Inteligencia Artificial y algoritmia avanzada. Estos proyectos demuestran mi pasión por resolver problemas complejos a través de la tecnología.
        </p>
      </main>
    </>
  )
}
