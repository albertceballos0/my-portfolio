'use client'

import Head from 'next/head'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Route, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>AI Vision App - Object Detection & TSP Solutions</title>
        <meta name="description" content="Explore AI-powered object detection and TSP (Traveling Salesman Problem) solutions with our cutting-edge computer vision tools." />
        <meta name="keywords" content="AI, Computer Vision, Object Detection, TSP, Traveling Salesman Problem, Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourwebsite.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "SoftwareApplication",
              "name": "AI Vision App",
              "description": "AI-powered object detection and TSP solutions.",
              "url": "https://yourwebsite.com",
              "applicationCategory": "Multimedia",
              "operatingSystem": "Web",
            }),
          }}
        />
      </Head>
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">AI Vision Technologies</h1>
        
        <p className="text-center text-xl mb-12 max-w-2xl mx-auto">
          Explore the power of AI in computer vision and optimization. Our cutting-edge tools provide innovative solutions for object detection and complex routing problems.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Camera className="w-8 h-8 mr-3" aria-hidden="true" />
                Object Detection
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">Detect and identify objects in images with our advanced AI models. Our technology provides accurate and fast results for various applications.</p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>High-precision object recognition</li>
                <li>Real-time processing capabilities</li>
                <li>Support for multiple object classes</li>
                <li>Integration with existing systems</li>
              </ul>
            </CardContent>
            <div className="px-6 pb-6">
              <Button className="w-full" aria-label="Learn more about Object Detection">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
          
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Route className="w-8 h-8 mr-3" aria-hidden="true" />
                TSP Solution
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">Solve complex Traveling Salesman Problems efficiently with our AI-powered algorithms. Optimize routes and save time and resources.</p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Fast computation for large-scale problems</li>
                <li>Multiple constraint handling</li>
                <li>Customizable optimization criteria</li>
                <li>Visualizations of optimal routes</li>
              </ul>
            </CardContent>
            <div className="px-6 pb-6">
              <Button className="w-full" aria-label="Learn more about TSP Solution">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
        
        <p className="text-center mt-12 text-lg text-gray-600 max-w-2xl mx-auto">
          Our AI Vision App combines state-of-the-art object detection capabilities with powerful TSP solving algorithms, providing you with comprehensive solutions for your computer vision and optimization needs.
        </p>
      </main>
    </>
  )
}