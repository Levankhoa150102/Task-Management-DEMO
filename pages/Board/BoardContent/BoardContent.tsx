'use client'
import { BoardType, ColumnType } from '@/types/Board';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '@/utils/Sort';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

function BoardContent({ board }: { board: BoardType }) {
    const [orderColumn, setOrderColumn] = useState<ColumnType[]>([])
    
    useEffect(() => {
        const orderedColumn = mapOrder(board.columns, board.columnOrderIds, '_id')
        setOrderColumn(orderedColumn)
    }, [board])

    const handleDragEnd = (e: DragEndEvent ) => {
        const {active, over} = e;
        if(!over) return
        if(active?.id !== over.id)
        {
            const oldIndex = orderColumn.findIndex((c: ColumnType) => c._id === active.id)
            const newIndex = orderColumn.findIndex((c: ColumnType) => c._id === over.id)

            const dndOrderedColumns = arrayMove(orderColumn, oldIndex, newIndex)
            // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id) //update on db
            // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds);
            setOrderColumn(dndOrderedColumns)
        }

    }
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className='h-[var(--boardcontent-height)]  bg-[#1976D2] p-4'>
                {/*Column Lists */}
                <ListColumns columns={orderColumn} />
            </div>
        </DndContext>
    );
}

export default BoardContent;