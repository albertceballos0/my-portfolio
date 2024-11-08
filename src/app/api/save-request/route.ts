
import { NextRequest } from "next/server";
import { db } from "@/lib/firestore";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Request body:", body);
        const { request } = body;

        // Save the request to the database
        const docRef = db.collection('requests').doc();
        try{
            await docRef.set(request); 
        } catch (error) {
            console.error("Error saving request to database:", error);
            return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
            });
        }
        return new Response(JSON.stringify({ message: "Request saved successfully" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
        
    } catch (error) {
        console.error("Error parsing request body:", error);
        return new Response(JSON.stringify({ message: "Invalid request body" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}