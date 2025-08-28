'use client'
import React, { useState } from 'react';
import Form, { FormProps } from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import message from 'antd/es/message';
import { FieldNamesType } from 'antd/es/cascader';
import Link from 'next/link';
import { redirect } from 'next/navigation';

function Register() {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish: FormProps<FieldNamesType>['onFinish'] = async (values) => {
        setLoading(true);

        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: 'register', ...values }),
        })
        const data = await res.json();
        setLoading(false);
        if (res.ok) {
            messageApi.open({
                type: 'success',
                content: 'Register successful!',
            });
            redirect('/login');
        } else {
            messageApi.open({
                type: 'error',
                content: data.error || 'Register failed!',
            });
        }

    };



    const onFinishFailed: FormProps<FieldNamesType>['onFinishFailed'] = (errorInfo) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            messageApi.open({
                type: 'error',
                content: 'Register failed!',
            });
        }, 1000);
    };

    return (
        <>
            {contextHolder}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-500 to-blue-300">

                <div className="w-[350px] bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-center mb-6 text-2xl font-semibold">Register</h2>
                    <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input type="email" placeholder="Email" />
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="confirm" label="Confirm Password" dependencies={["password"]} rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}>
                            <Input.Password placeholder="Confirm Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>Register</Button>
                        </Form.Item>
                        <p className="text-center mt-4 text-sm text-gray-600">
                            If you have an account, <Link href="/login" className="text-blue-600 hover:underline">login here</Link>.
                        </p>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Register;
