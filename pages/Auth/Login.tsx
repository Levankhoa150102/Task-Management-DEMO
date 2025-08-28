'use client'
import React, { useState } from 'react';

import Form, { FormProps } from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import message from 'antd/es/message';
import { FieldNamesType } from 'antd/es/cascader';
import Link from 'next/link';
import { redirect } from 'next/navigation';

function Login() {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish: FormProps<FieldNamesType>['onFinish'] = async (values) => {
        setLoading(true);
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: 'login', ...values }),
        });
        const data = await res.json();
        setLoading(false);
        if (res.ok) {
            messageApi.open({
                type: 'success',
                content: 'Login successful!',
            });
            redirect('/');
        } else {
            messageApi.open({
                type: 'error',
                content: data.error || 'Login failed!',
            });
        }

    };

    const onFinishFailed: FormProps<FieldNamesType>['onFinishFailed'] = (errorInfo) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            messageApi.open({
                type: 'error',
                content: 'Login failed!',
            });
        }, 1000);
    };


    return (
        <>
            {contextHolder}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-500 to-blue-300">
                <div className="w-[350px] bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-center mb-6 text-2xl font-semibold">Login</h2>
                    <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input type="email" placeholder="Email" />
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>Login</Button>
                        </Form.Item>
                        <p className="text-center mt-4 text-sm text-gray-600">
                            If you don&#39;t have an account, <Link href="/register" className="text-blue-600 hover:underline">register here</Link>.
                        </p>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Login;
