'use client'
import { BoardType, ColumnType } from '@/types/Board';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '@/utils/Sort';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

function BoardContent({ board }: { board: BoardType }) {
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: { //Require a minimum distance of 10px to activate drag
            distance: 10,
        },
    })
    
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: { //Require a minimum distance of 10px to activate drag
            distance: 10,
        },
    })

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint:{
            delay: 250,
            tolerance: 5,
        }
    })

    //const sensors = useSensors(pointerSenor)
    const sensors = useSensors(mouseSensor, touchSensor) //Trãi nghiệm tốt trên mobile
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
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <div className='h-[var(--boardcontent-height)]  bg-[#1976D2] p-4'>
                {/*Column Lists */}
                <ListColumns columns={orderColumn} />
            </div>
        </DndContext>
    );
}

export default BoardContent;