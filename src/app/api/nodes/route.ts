import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json([
        { id: 1, name: "Nodo Central", status: "online", load: "12%" },
        { id: 2, name: "Nodo Satélite Alpha", status: "online", load: "45%" },
        { id: 3, name: "Nodo Satélite Beta", status: "offline", load: "0%" },
    ]);
}
