import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { parseTreeStructure } from '@/utils/parseGraphFile'

export async function POST(req: NextRequest) {
    const { fileContent } = await req.json()
    console.log('fileContent:', fileContent)

    const tempDir = '/tmp'
    const fileName = `graf_${Date.now()}.txt`
    const filePath = join(tempDir, fileName)
    await fs.writeFile(filePath, fileContent)
    const scriptPath = join(process.cwd(), 'src/app/api/graphs/generateTrack/tsp_program');

    return new Promise<void | Response>((resolve) => {
        exec(`${scriptPath} ${filePath}`, (error, stdout) => {
            if (error) {
                console.error(`exec error: ${error}`);

                resolve(NextResponse.json({ message: 'Error generating track' }, { status: 200 }));
                return;
            }
            console.log(`stdout: ${stdout}`);
            const res = parseTreeStructure(stdout); 
            console.log('res:', res)
            resolve(NextResponse.json({ result: res }, { status: 200 }));
        });
    });
}

export async function GET() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
}