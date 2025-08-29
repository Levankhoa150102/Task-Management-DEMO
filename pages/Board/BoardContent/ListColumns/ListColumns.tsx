'use client'

import { ColumnType } from '@/types/Board';
import { FileAddOutlined } from '@ant-design/icons';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import Button from 'antd/es/button';
import Column from './Column/Column';

type ListColumnsProps = {
    columns: ColumnType[];
    onAddColumn: () => void;
    onAddCard: (columnId: string) => void;
    onDeleteColumn: (columnId: string) => void;
}

function ListColumns({ columns, onAddColumn, onAddCard, onDeleteColumn }: ListColumnsProps) {
    return (
        <SortableContext items={columns.map(column => column._id)} strategy={horizontalListSortingStrategy}>
            <div className='flex gap-4 overflow-x-auto overflow-y-hidden my-[5px] py-[5px] h-[calc(var(--boardcontent-height)-24px)]'>
                {columns.map(column => (
                    <Column key={column._id} column={column} onAddCard={() => onAddCard(column._id)} onDeleteColumn={() => onDeleteColumn(column._id)} />
                ))}
                <div className='min-w-[200px] max-w-[300px]  mx-2 rounded-xs h-fit'>
                    <Button onClick={onAddColumn} variant='outlined' className=' w-full' style={{ backgroundColor: 'transparent', color: 'white' }}>
                        <FileAddOutlined className='text-xl' />
                        <span>Add new column</span>
                    </Button>
                </div>
            </div>
        </SortableContext>
    );
}
export default ListColumns;