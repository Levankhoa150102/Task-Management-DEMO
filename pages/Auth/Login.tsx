'use client'
import { useState } from 'react';

import Button from 'antd/es/button';
import { FieldNamesType } from 'antd/es/cascader';
import Form, { FormProps } from 'antd/es/form';
import Input from 'antd/es/input';
import message from 'antd/es/message';
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
            <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item name="email" label="Email" className='dark:text-white' rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input type="email" placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>Login</Button>
                </Form.Item>
            </Form>

        </>
    );
}

export default Login;
