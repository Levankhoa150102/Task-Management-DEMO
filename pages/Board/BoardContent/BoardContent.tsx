'use client'
import { BoardType, CardType, ColumnType } from '@/types/Board';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '@/utils/Sort';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, DragStartEvent, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/CardLists/Card/Card';

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
}

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
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        }
    })

    //const sensors = useSensors(pointerSenor)
    const sensors = useSensors(mouseSensor, touchSensor) //Trãi nghiệm tốt trên mobile
    const [orderColumn, setOrderColumn] = useState<ColumnType[]>([])

    //Confirm Card or Column is being dragged (for overplay)
    const [activeDragItemId, setActiveDragItemId] = useState<string | null>(null)
    const [activeDragItemType, setActiveDragItemType] = useState<string | null>(null)
    const [activeDragItemData, setActiveDragItemData] = useState<ColumnType | CardType | null>(null)

    useEffect(() => {
        const orderedColumn = mapOrder(board.columns, board.columnOrderIds, '_id')
        setOrderColumn(orderedColumn)
    }, [board])

    const handleDragStart = (e: DragStartEvent) => {
        console.log('handleDragStart', e);
        setActiveDragItemId(e?.active?.id as string)
        setActiveDragItemType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(e?.active?.data?.current as ColumnType | CardType | null)
    }

    console.log('activeDragItemId', activeDragItemId);
    console.log('activeDragItemType', activeDragItemType);
    console.log('activeDragItemData', activeDragItemData);

    const handleDragEnd = (e: DragEndEvent) => {
        console.log('handleDragEnd', e);
        const { active, over } = e;
        if (!over) return
        if (active?.id !== over.id) {
            const oldIndex = orderColumn.findIndex((c: ColumnType) => c._id === active.id)
            const newIndex = orderColumn.findIndex((c: ColumnType) => c._id === over.id)

            const dndOrderedColumns = arrayMove(orderColumn, oldIndex, newIndex)
            // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id) //update on db
            // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds);
            setOrderColumn(dndOrderedColumns)
        }

        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)

    }

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: { active: { opacity: '0.5' } }
        })
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            sensors={sensors}>
            <div className='h-[var(--boardcontent-height)]  bg-[#1976D2] p-4'>
                {/*Column Lists */}
                <ListColumns columns={orderColumn} />
                <DragOverlay dropAnimation={dropAnimation}>
                    {(!activeDragItemType) && null}
                    {( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && (
                        <Column column={activeDragItemData as ColumnType} />
                    )}
                    {( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && (
                        <Card card={activeDragItemData as CardType} />
                    )}
                </DragOverlay>
            </div>
        </DndContext>
    );
}

export default BoardContent;