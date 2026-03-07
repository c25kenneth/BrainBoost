import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/auth";


export async function POST(request: Request) {
    // Check to see if user is signed in 
    const session = await getSession(); 
    if (!session) {
        return NextResponse.json({error: "Unauthorized request"}, {status: 401}); 
    }

    const formData = await request.formData(); 
    
    // Check to see if user has uploaded a file
    const fileData = formData.get('file') as Blob | null; 

    if (!fileData) {
        return NextResponse.json({error: 'No file uploaded'}, {status: 400}); 
    }
    const buffer = Buffer.from(await fileData.arrayBuffer());

    // Check to see if user has filled out the form properly
    const name = formData.get('name') as string | null;
    const description = formData.get('description') as string | null; 
    const subjects = formData.get("subjects") as string | null; 
    
    if (!name || !description || !subjects) {
        return NextResponse.json({error: "Mising field"}, {status: 400}); 
    }
    
    const { PDFParse } = await import('pdf-parse');
    const parser = new PDFParse({ data: buffer });
    const pdfData = await parser.getText();
    const extractedText = pdfData.text;

    if (!extractedText) {
        return NextResponse.json({error: "Error while parsing the file!"}, {status: 500}); 
    }

    return NextResponse.json({response: {message: "File Successfully Parsed!", fileText: extractedText}}, {status: 200});
}