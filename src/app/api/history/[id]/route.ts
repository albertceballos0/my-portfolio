
import { NextRequest, NextResponse } from 'next/server';
import { db} from '@/lib/firestore';
import { format } from 'date-fns';
import { HistoryItem } from '@/types';


export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.pathname.split('/').pop(); // Obtén el último segmento de la ruta
    console.log('Deleting entry:', id);
    if (!id){
        return NextResponse.json({ error: 'Id not found' }, { status: 404 });
    }
    try {
        db.collection('requests').doc(id).delete();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error al eliminar la entrada:', error);
        return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 });
    }
  }


export async function GET(req: NextRequest) {
    const email = req.nextUrl.pathname.split('/').pop(); // Obtén el último segmento de la ruta
    console.log('Getting entry:', email);
    if (!email){
        return NextResponse.json({ error: 'Email not found' }, { status: 404 });
    }
    try {
        const snapshot = await db.collection('requests').where('user.email', '==', email).get();

        if (snapshot.empty) {
            return NextResponse.json({ data: [], success: true });
        }
        const historyEntries : HistoryItem[] = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                user: data.user,
                requestType: data.requestType,
                timestamp: data.timestamp ? format(new Date(data.timestamp), 'yyyy-MM-dd HH:mm:ss') : ''
            };
        });
        return NextResponse.json({ data: historyEntries, success: true });
    } catch (error) {
        console.error('Error al get la entrada:', error);
        return NextResponse.json({ error: 'Failed to getting entry' }, { status: 500 });
    }
  }




