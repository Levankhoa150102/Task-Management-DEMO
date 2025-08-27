'use client'
import { AntCloudOutlined, CaretDownOutlined, CopyOutlined, DeleteOutlined, FileAddOutlined, MenuOutlined, ScissorOutlined, SnippetsOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';
import Dropdown from 'antd/es/dropdown/dropdown';
import type { MenuProps } from 'antd/es/menu';
import Space from 'antd/es/space';
import { useState } from 'react';
import CardLists from './CardLists/CardList';
import { ColumnType } from '@/types/Board';
import { mapOrder } from '@/utils/Sort';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'

const items: MenuProps['items'] = [
    {
        label: (
            <div className='space-x-2'>
                <FileAddOutlined />
                <span>Add new card</span>
            </div>
        ),
        key: '0',
    },
    {
        label: (
            <div className='space-x-2'>
                <ScissorOutlined />
                <span>Cut</span>
            </div>
        ),
        key: '1',
    },
    {
        label: (
            <div className='space-x-2'>
                <CopyOutlined />
                <span>Copy</span>
            </div>
        ),
        key: '2',
    },
    {
        label: (
            <div className='space-x-2'>
                <SnippetsOutlined />
                <span>Paste</span>
            </div>
        ),
        key: '3',
    },
    {
        type: 'divider',
    },
    {
        label: (
            <div className='space-x-2'>
                <DeleteOutlined />
                <span>Remove this column</span>
            </div>
        ),
        key: '4',
    },
    {
        label: (
            <div className='space-x-2'>
                <AntCloudOutlined />
                <span>Archive this column</span>
            </div>
        ),
        key: '5',
    },
];
function Column({ column }: { column: ColumnType }) {
    const [open, setOpen] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column._id, data: { ...column }
    });
    const dndKitColumnStyles = { transform: CSS.Translate.toString(transform), transition, height: '100%', opacity: isDragging ? 0.5 : 1 }

    const orderedCard = mapOrder(column.cards, column.cardOrderIds, '_id')
    return (
        <div ref={setNodeRef}
            style={dndKitColumnStyles}
            {...attributes}
        >
            <div className='max-w-[300px] min-w-[300px] h-fit bg-[#EBECF0] rounded-md box-shadow-md max-h-[calc(var(--boardcontent-height)-50px)] overflow-y-auto'
                {...listeners}
            >
                {/*Column Header */}
                <div className='p-4 flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>{column.title}</h2>
                    <Dropdown
                        menu={{
                            items,
                            onClick: ({ key }) => {
                                console.log('Dropdown selected key:', key);
                            }
                        }}
                        trigger={['click']}
                        onOpenChange={setOpen}
                    >
                        <Space>
                            <CaretDownOutlined
                                className='cursor-pointer hover:scale-110 transition-transform duration-200'
                                style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            />
                        </Space>
                    </Dropdown>
                </div>

                {/*Column Cards List */}
                <CardLists cards={orderedCard} />

                {/*Column Footer */}
                <div className='flex items-center justify-between p-4 '>
                    <Button color="default" variant="text">
                        <FileAddOutlined style={{ color: '#1976D2' }} />
                        <span className='text-[#1976D2] font-semibold'>Add new card</span>
                    </Button>
                    <MenuOutlined className='cursor-grab' />
                </div>
            </div>
        </div>

    );
}

export default Column;