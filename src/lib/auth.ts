import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_me';
const encodedSecret = new TextEncoder().encode(JWT_SECRET);
const TOKEN_NAME = 'itkan_admin_token';
const TOKEN_EXPIRY = '24h';

export async function signToken(payload: { id: string; username: string; role: string }): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(TOKEN_EXPIRY)
        .sign(encodedSecret);
}

export async function verifyToken(token: string): Promise<{ id: string; username: string; role: string } | null> {
    try {
        const { payload } = await jwtVerify(token, encodedSecret);
        return payload as { id: string; username: string; role: string };
    } catch {
        return null;
    }
}

export async function getAdminFromCookie(): Promise<{ id: string; username: string; role: string } | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
}
