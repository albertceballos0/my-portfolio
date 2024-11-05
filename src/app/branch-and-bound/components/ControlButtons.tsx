import { Button } from "@/components/ui/button"
import { IoAnalytics, IoCamera } from 'react-icons/io5'
import { FiUpload } from 'react-icons/fi'

export default function ControlButtons() {
  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon">
        <IoCamera className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <FiUpload className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <IoAnalytics className="h-4 w-4" />
      </Button>
    </div>
  )
}