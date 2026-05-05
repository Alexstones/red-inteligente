import { NextResponse } from 'next/server';
import { mockUser } from '@/lib/mock-data';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Mock Auth Logic
        if (email === "admin@redinteligente.io" && password === "admin123") {
            return NextResponse.json({
                access_token: "mock-jwt-token-" + Date.now(),
                user: mockUser
            });
        }

        return NextResponse.json(
            { message: "Credenciales de Nodo inválidas" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error interno en el Nodo Neural" },
            { status: 500 }
        );
    }
}
