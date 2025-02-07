"use server"
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        
        if (!file) {
          return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }
        
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        
        // Send the file directly to the ML service
        const mlServiceUrl = 'https://your-ml-service.com/process';
        const response = await fetch(mlServiceUrl, {
          method: 'POST',
          headers: { 'Content-Type': file.type },
          body: fileBuffer,
        });
        
        const result = await response.json();
        return NextResponse.json({ message: 'File sent to ML service', result });
      } catch (error) {
        return NextResponse.json({ error: error}, { status: 500 });
    }
}

export const config = {
  api: {
    bodyParser: false, // Required for handling formData
  },
};
