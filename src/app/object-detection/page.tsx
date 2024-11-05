import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ObjectDetectionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Object Detection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Upload an image to detect objects</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-upload">Choose an image</Label>
                <Input id="image-upload" type="file" accept="image/*" />
              </div>
              <Button type="submit">Detect Objects</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>Detected objects will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">No image processed yet</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>Understanding the object detection model</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Our object detection model uses a state-of-the-art convolutional neural network trained on a diverse dataset of images. The model can identify and locate multiple objects within a single image, providing bounding boxes and class labels for each detected object.</p>
          <p className="mt-4">Key features of our object detection system:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Real-time detection capabilities</li>
            <li>Support for a wide range of object classes</li>
            <li>High accuracy and low false positive rate</li>
            <li>Ability to handle varying image sizes and resolutions</li>
          </ul>
          <p className="mt-4">The model goes through several steps to detect objects:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Image preprocessing and normalization</li>
            <li>Feature extraction using convolutional layers</li>
            <li>Region proposal to identify potential object locations</li>
            <li>Classification and bounding box refinement</li>
            <li>Non-maximum suppression to eliminate duplicate detections</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}