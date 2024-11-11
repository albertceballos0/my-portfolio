import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { db } from '@/lib/firestore';
export async function POST(request: NextRequest) {
    const body = await request.json();
    const email = body.email;

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        const emailRef = db.collection('users').doc(email);
        const docSnap = await emailRef.get();

        if (docSnap.exists) {
            return NextResponse.json({ message: 'Successful login' }, { status: 200 });
        } else {
            await emailRef.set({ createdAt: admin.firestore.FieldValue.serverTimestamp() });
            return NextResponse.json({ message: 'Successfully registered' }, { status: 200 });
        }
    } catch (error) {
        console.error('Error checking email:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
