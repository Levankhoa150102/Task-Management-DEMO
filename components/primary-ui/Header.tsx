'use client'
import { AppstoreFilled, BellOutlined, LogoutOutlined, QuestionCircleOutlined, SearchOutlined, UserOutlined, } from '@ant-design/icons';
import Badge from 'antd/es/badge';
import Input from 'antd/es/input';
import Avatar from 'antd/es/avatar'
import Tooltip from 'antd/es/tooltip'
import Dropdown from 'antd/es/dropdown';
import { MenuProps } from 'antd/es/menu';
import { redirect } from 'next/navigation';

const items: MenuProps['items'] = [
    {
        label: (
            <div className='space-x-2'>
                <LogoutOutlined />
                <span>Logout</span>
            </div>
        ),
        key: '0',
    },

];
  const onClick: MenuProps['onClick'] = (e) => {
    if (e?.key === '0') {
        redirect('/login');
    }
  };

function Header() {
    return (
        <div className='bg-[#1565c0] dark:bg-[#2c3e50] h-[var(--header-height)] flex items-center justify-between px-4 overflow-x-auto space-x-4 overflow-y-hidden'>
            <div className='text-white flex items-center gap-2'>
                <AppstoreFilled className='text-xl' />
                <p className='text-xl font-bold '>ManageWise</p>
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
                <div className='w-16 h-16 flex items-center'>
                    <Dropdown
                        menu={{
                            items,
                            onClick: onClick
                        }}
                        trigger={['click']}
                        
                    >
                        <Avatar icon={<UserOutlined />} className='cursor-pointer' />
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default Header;