'use client'

import { SetStateAction, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import { useFileSelect } from '../../hooks/useFileSelect';


export default function FileSelector() {
  const [availableFiles, setAvailableFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const { handleFileSelect } = useFileSelect(setIsLoading);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch('/api/graphs/list');
      const files = await response.json();
      setAvailableFiles(files);
    };
    fetchFiles();
  }, []);


  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Select Graph File</CardTitle>
        <CardDescription>Choose a pre-loaded graph file</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Select onValueChange={(value: SetStateAction<string | undefined>) => { 
          setSelectedFile(value);
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Select a graph file">
              {selectedFile || "Select a graph file"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {availableFiles.map((file) => (
              <SelectItem key={file} value={file}>
                {file}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => selectedFile && handleFileSelect(selectedFile)} 
          disabled={!selectedFile || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Load Graph'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}