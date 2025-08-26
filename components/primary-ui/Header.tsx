'use client'
import { AppstoreFilled, BellOutlined, QuestionCircleOutlined, SearchOutlined, UserOutlined, } from '@ant-design/icons';
import Badge from 'antd/es/badge';
import Input from 'antd/es/input';
import Avatar from 'antd/es/avatar'
import Tooltip from 'antd/es/tooltip'
function Header() {
    return (
        <div className='bg-[#1565c0] h-[var(--header-height)] flex items-center justify-between px-4'>
            <div className='text-white flex items-center gap-2'>
                <AppstoreFilled className='text-xl' />
                <p className='text-xl font-bold '>Task management</p>
            </div>

            <div className=' flex items-center gap-4'>
                <Input
                    size="large"
                    placeholder="Search..."
                    prefix={<SearchOutlined />}
                />
                <Tooltip title="Notification">
                    <Badge count={9} size='small' className='cursor-pointer'>
                        <BellOutlined className='text-2xl' style={{ color: 'white' }} />
                    </Badge>
                </Tooltip>
                <Tooltip title="Help">
                    <QuestionCircleOutlined className='text-2xl cursor-pointer' style={{ color: 'white' }} />
                </Tooltip>
                <Tooltip title="Profile">
                    <div className='w-16 h-16 flex items-center '>
                        <Avatar icon={<UserOutlined />} className='cursor-pointer' />
                    </div>
                </Tooltip>
            </div>
        </div>
    );
}

export default Header;