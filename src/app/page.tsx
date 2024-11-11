'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Route, ArrowRight, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { useGraphState } from '@/store/useGraphStore'

export default function HomePage() {
  const { setActiveTab } = useGraphState()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Albert Ceballos Aguilera</h1>
          <p className="text-xl text-muted-foreground">Estudiante de Ingeniería Informática</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="https://github.com/albertceballos0" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="https://www.linkedin.com/in/albert-ceballos-087137201/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard
            title="Detección de Objetos"
            description="Identificación precisa de objetos en imágenes usando IA avanzada."
            icon={<Camera className="w-8 h-8" />}
            features={[
              "Reconocimiento multiclase en tiempo real",
              "Optimización para integraciones sencillas"
            ]}
            link="/object-detection"
          />
          
          <ProjectCard
            title="Problema del Viajero"
            description="Optimización de rutas para minimizar distancias y costos."
            icon={<Route className="w-8 h-8" />}
            features={[
              "Algoritmos avanzados de optimización",
              "Visualización interactiva de rutas óptimas"
            ]}
            link="/tsp"
            onClick={() => setActiveTab('instructions')}
          />
        </div>
      </main>
    </div>
  )
}

interface ProjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  link: string;
  onClick?: () => void;
}

function ProjectCard({ title, description, icon, features, link, onClick }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full transition-transform duration-300 hover:scale-105">
      <CardHeader>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="list-disc list-inside space-y-2">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={link} onClick={onClick}>
            Ver Proyecto <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}