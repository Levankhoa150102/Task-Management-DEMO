import Login from '@/pages/Auth/Login';
import Link from 'next/link';
import React from 'react';

function LoginPage() {
    return (
        <div>
            <h2 className="text-center mb-6 text-2xl font-semibold dark:text-white">Login</h2>
            <Login />
            <p className="text-center mt-4 text-sm text-gray-600 dark:text-white">
                If you don&#39;t have an account, <Link href="/register" className="text-blue-600 hover:underline">register here</Link>.
            </p>
        </div>
    );
}

export default LoginPage;