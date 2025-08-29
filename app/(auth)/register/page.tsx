import Register from '@/pages/Auth/Register';
import Link from 'next/link';
import React from 'react';

function RegisterPage() {
    return (
        <div>
            <h2 className="text-center mb-6 text-2xl font-semibold dark:text-white">Register</h2>
            <Register />
            <p className="text-center mt-4 text-sm text-gray-600 dark:text-white">
                If you have an account, <Link href="/login" className="text-blue-600 hover:underline">login here</Link>.
            </p>
        </div>


    );
}

export default RegisterPage;

