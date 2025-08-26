import { BoardType } from '@/types/Board';
import { AntDesignOutlined, AppstoreAddOutlined, FileTextOutlined, FilterOutlined, LockOutlined, RocketOutlined, UnlockOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd/es';
import Avatar from 'antd/es/avatar';
function BoardBar({board}: {board: BoardType}) {
    return (
        <div className=' h-[var(--boardbar-height)] flex items-center bg-[#1976D2] justify-between gap-2 overflow-x-auto'>
            <div className='flex gap-2'>
                <Button type="text" block>
                    <FileTextOutlined className='text-xl' style={{ color: 'white' }} />
                    <span className='text-white'>{board.title}</span>
                </Button>
                <Button type="text" block>
                    {board.type === 'public' ? <UnlockOutlined className='text-xl' style={{ color: 'white' }}/> : <LockOutlined className='text-xl' style={{ color: 'white' }}/>}
                    <span className='text-white'>{board.type === 'public' ? 'Public Workspace' : 'Private Workspace'}</span>
                </Button>
                <Button type="text" block>
                    <AppstoreAddOutlined className='text-xl' style={{ color: 'white' }} />
                    <span className='text-white'>Add to Google Drive</span>
                </Button>
                <Button type="text" block>
                    <RocketOutlined className='text-xl' style={{ color: 'white' }} />
                    <span className='text-white'>Automation</span>
                </Button>
            </div>

            <div className='flex gap-2'>
                <Button type='text' block>
                    <FilterOutlined className='text-xl' style={{ color: 'white' }} />
                    <span className='text-white'>Filter</span>
                </Button>
                <Button variant='outlined' style={{ backgroundColor: 'transparent', color: 'white' }}>
                    <UserAddOutlined className='text-xl' />
                    <span>Invite</span>
                </Button>

                <div className='flex items-center'>
                        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                        <Tooltip title="Ant User" placement="top">
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </Tooltip>
                        <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
                </div>

            </div>
        </div>
    );
}

export default BoardBar;