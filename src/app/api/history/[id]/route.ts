
import { NextRequest, NextResponse } from 'next/server';
import { db} from '@/lib/firestore';


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
  