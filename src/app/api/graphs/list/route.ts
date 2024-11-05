// app/api/graphs/list/route.ts
import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  console.log(process.cwd())    
  const dirPath = path.join(process.cwd(), 'public', 'TestSalesMan')
  try {
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.GR'))
    return NextResponse.json(files)
  } catch (error) {
    console.error('Error reading files:', error)
    return NextResponse.json({ error: 'Failed to read files' }, { status: 500 })
  }
}
