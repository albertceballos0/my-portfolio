import { db } from '@/lib/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { format } from 'date-fns';

export async function GET(_req: NextRequest) {
    try {
        const query = db.collection('requests');
        const snapshot = await query.get();

        if (snapshot.empty) {
            return NextResponse.json({ success: true, data: [] });
        }

        const historyEntries = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                userEmail: data.userEmail,
                requestType: data.requestType,
                timestamp: data.timestamp ? format(data.timestamp.toDate(), 'yyyy-MM-dd HH:mm:ss') : null
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