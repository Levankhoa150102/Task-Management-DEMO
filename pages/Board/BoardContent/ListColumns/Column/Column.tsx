'use client'
import { ColumnType } from '@/types/Board';
import { mapOrder } from '@/utils/Sort';
import { CaretDownOutlined, DeleteOutlined, FileAddOutlined, MenuOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from 'antd/es/button';
import Dropdown from 'antd/es/dropdown/dropdown';
import type { MenuProps } from 'antd/es/menu';
import Space from 'antd/es/space';
import { useState } from 'react';
import CardLists from './CardLists/CardList';
import ConfirmModal from '@/components/ui/ConfirmModal';

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
        type: 'divider',
    },
    {
        label: (
            <div className='space-x-2'>
                <DeleteOutlined />
                <span>Remove this column</span>
            </div>
        ),
        key: '2',
    },

];
interface ColumnProps {
    column: ColumnType;
    onAddCard?: () => void;
    onDeleteColumn?: () => void;
}

function Column({ column, onAddCard, onDeleteColumn }: ColumnProps) {
    const [open, setOpen] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column._id, data: { ...column }
    });
    const dndKitColumnStyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : 1,
    }
    const orderedCard = mapOrder(column.cards, column.cardOrderIds, '_id')

    const handleDeleteColumn = () => {
        setOpenConfirmModal(true);
    }

    const handleDropDown = ({ key }: { key: string }) => {
        switch (key) {
            case '0':
                onAddCard?.();
                break;
            case '2':
                handleDeleteColumn();
                break;
            default:
                break;
        }
    }

    return (
        <div ref={setNodeRef}
            style={dndKitColumnStyles}
            {...attributes}
        >
            <div className='max-w-[300px] min-w-[300px] h-fit bg-[#EBECF0] dark:bg-[#333643] rounded-md box-shadow-md max-h-[calc(var(--boardcontent-height)-50px)] overflow-y-auto'
                {...listeners}
            >
                {/*Column Header */}
                <div className='p-4 flex justify-between items-center'>
                    <h2 className='text-lg font-semibold dark:text-white'>{column.title}</h2>
                    <Dropdown
                        menu={{
                            items,
                            onClick: handleDropDown
                        }}
                        trigger={['click']}
                        onOpenChange={setOpen}
                    >
                        <Space>
                            <CaretDownOutlined
                                className='cursor-pointer hover:scale-110 transition-transform duration-200 dark:text-white'
                                style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            />
                        </Space>
                    </Dropdown>
                </div>

                {/*Column Cards List */}
                <CardLists cards={orderedCard} />

                {/*Column Footer */}
                <div className='flex items-center justify-between p-4 '>
                    <Button color="default" variant="text" onClick={onAddCard}>
                        <FileAddOutlined style={{ color: '#1976D2' }} />
                        <span className='text-[#1976D2] font-semibold'>Add new card</span>
                    </Button>
                    <MenuOutlined className='cursor-grab' />
                </div>
            </div>
            <ConfirmModal
                open={openConfirmModal}
                message="Are you sure you want to delete this column?"
                okText="Delete"
                cancelText="Cancel"
                onClose={() => setOpenConfirmModal(false)}
                onActiveFunction={() => {
                    onDeleteColumn?.();
                    setOpenConfirmModal(false);
                }}
            />
        </div>

    );
}

export default Column;