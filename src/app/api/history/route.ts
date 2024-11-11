import { db } from '@/lib/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { format } from 'date-fns';

export async function GET() {
    try {
        const query = db.collection('requests');
        const snapshot = await query.get();

        if (snapshot.empty) {
            return NextResponse.json({ success: true, data: [] });
        }

        const historyEntries = snapshot.docs.map(doc => {
            const data = doc.data();
            console.log('data', data);
            return {
                id: doc.id,
                user: data.user,
                type: data.type,
                timestamp: data.timestamp ? format(data.timestamp, 'yyyy-MM-dd HH:mm:ss') : null
            };
        });

        return NextResponse.json({ success: true, data: historyEntries });
    } catch (error) {
        console.error('Error al recuperar las entradas de historial:', error);
        return NextResponse.json(
            { message: 'Error interno al recuperar las entradas de historial' },
            { status: 500 }
        );
    }
}


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Request body:", body);
        const { request } = body;
        // Save the request to the database
        const docRef = db.collection('requests').doc();
        try {
            await docRef.set(request);
        } catch (error) {
            console.error("Error saving request to database:", error);
            return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
            });
        }
        return new Response(JSON.stringify({ message: "Request saved successfully", id: docRef.id }), {
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