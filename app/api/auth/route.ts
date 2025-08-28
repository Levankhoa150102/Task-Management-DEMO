import { User } from '@/types/User';
import { NextResponse } from 'next/server';

const userData: User[] = [
    {
        id: '1',
        email: 'user1@example.com',
        password: '123456',
        name: 'User One',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        email: 'user2@example.com',
        password: '123457',
        name: 'User Two',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export async function GET() {
  return NextResponse.json(userData);
}

export async function POST(req: Request) {
  const data = await req.json();
  const { type, email, password, confirm } = data;

  if (type === 'register') {
    if (!email || !password || !confirm) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    if (password !== confirm) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
    }
    if (userData.find((u) => u.email === email)) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }
    userData.push({
      id: (userData.length + 1).toString(),
      email,
      name: email.split('@')[0],
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('userData',userData)
    return NextResponse.json({ message: 'Registration successful' });
  }

  if (type === 'login') {
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const user = userData.find((u) => u.email === email && u.password === password);
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Login successful' });
  }

  return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
}