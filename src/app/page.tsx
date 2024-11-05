'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Camera, FileImage, Paintbrush, Image as ImageIcon, History } from 'lucide-react'

export default function HomePage() {

  return (
    <div className="flex flex-col min-h-screen">        
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Explore AI Vision Technologies
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover the power of AI in computer vision. Upload images, generate art, and explore cutting-edge AI models.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Object Detection</CardTitle>
                  <Camera className="w-8 h-8 mb-2" />
                </CardHeader>
                <CardContent>
                  <p>Detect and identify objects in images with advanced AI models.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Avatar Generation</CardTitle>
                  <FileImage className="w-8 h-8 mb-2" />
                </CardHeader>
                <CardContent>
                  <p>Create unique avatars from your photos using AI technology.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Object Removal</CardTitle>
                  <ImageIcon className="w-8 h-8 mb-2" />
                </CardHeader>
                <CardContent>
                  <p>Remove unwanted objects from images and change backgrounds seamlessly.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Image Generation</CardTitle>
                  <Paintbrush className="w-8 h-8 mb-2" />
                </CardHeader>
                <CardContent>
                  <p>Generate unique images from text descriptions using AI.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Style Transfer</CardTitle>
                  <Paintbrush className="w-8 h-8 mb-2" />
                </CardHeader>
                <CardContent>
                  <p>Apply artistic styles to your images with AI-powered algorithms.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Process History</CardTitle>
                  <History className="w-8 h-8 mb-2" />
                </CardHeader>
                <CardContent>
                  <p>Keep track of your AI-processed images and results.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Sign up now to explore the full potential of AI vision technologies.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50 text-gray-600">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 AI Vision App. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}