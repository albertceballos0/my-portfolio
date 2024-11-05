// src/app/api/graphs/[fileName]/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const fileName = req.nextUrl.pathname.split('/').pop(); // Obtén el último segmento de la ruta
  console.log('Reading file:', process.cwd(), fileName);

  const filePath = path.join(process.cwd(), 'public', 'TestSalesMan', fileName ?? '');

  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return NextResponse.json({ content: fileContent });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
