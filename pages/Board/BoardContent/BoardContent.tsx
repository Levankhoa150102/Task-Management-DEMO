'use client'
import { BoardType, CardType, ColumnType } from '@/types/Board';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '@/utils/Sort';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, DragStartEvent, DragOverlay, defaultDropAnimationSideEffects, DragOverEvent, closestCorners, Active, Over } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { cloneDeep } from 'lodash'


import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/CardLists/Card/Card';
import SideBar from '@/components/primary-ui/SideBar';
import CardModal from '@/components/primary-ui/Modal';
import { ModalProvider, useModalContext } from '@/context/ModalContent';

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

    const moveCardBetweenDiffrentColumns = (
        overColumn: ColumnType,
        overCardId: string,
        active: Active,
        over: Over,
        activeColumn: ColumnType,
        activeDraggingCardId: string,
        activeDraggingCardData: CardType

    ) => {
        setOrderColumn(prevColumn => {
            //tìm vị trí của overcard trong column đích
            const overCardIndex = overColumn.cards?.findIndex(card => card._id === overCardId)

            //Logic tính toán vị trí mới của card (trên hoặc dưới overCard)
            let newCardIndex: number = 0;
            const isBelowOverItem = active.rect.current.translated &&
                active.rect.current.translated.top > over.rect.top + over.rect.height

            const modifier = isBelowOverItem ? 1 : 0

            newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

            //clone mảng orderedColumnState cũ ra 1 cái mới để xử lý data rồi return - cập nhật lại orderedColumnState mới
            const nextColumns = cloneDeep(prevColumn)

            const nextActiveColumn = nextColumns.find((col: ColumnType) => col._id === activeColumn._id)
            const nextOverColumn = nextColumns.find((col: ColumnType) => col._id === overColumn._id)

            //Column cũ
            if (nextActiveColumn) {
                //Xóa card ở column active (column cũ)
                nextActiveColumn.cards = nextActiveColumn.cards.filter((card: CardType) => card._id !== activeDraggingCardId)

                //Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card: CardType) => card._id)
            }
            //Column mới
            if (nextOverColumn) {
                //Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa, nếu có thì cần xóa nó trước đi
                nextOverColumn.cards = nextOverColumn.cards.filter((card: CardType) => card._id !== activeDraggingCardId)

                //Tiếp theo là thêm card đang kéo vào overColumn theo vị trí index mới
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

                //Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
                nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card: CardType) => card._id)
            }
            return nextColumns
        }

        )
    }

    //const sensors = useSensors(pointerSenor)
    const sensors = useSensors(mouseSensor, touchSensor) //Trãi nghiệm tốt trên mobile
    const [orderColumn, setOrderColumn] = useState<ColumnType[]>([])

    //Confirm Card or Column is being dragged (for overplay)
    const [activeDragItemId, setActiveDragItemId] = useState<string | null>(null)
    const [activeDragItemType, setActiveDragItemType] = useState<string | null>(null)
    const [activeDragItemData, setActiveDragItemData] = useState<ColumnType | CardType | null>(null)
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState<ColumnType | null>(null)

    useEffect(() => {
        const orderedColumn = mapOrder(board.columns, board.columnOrderIds, '_id')
        setOrderColumn(orderedColumn)
    }, [board])

    const findColumnByCardId = (cardId: string) => {
        return orderColumn.find(column => column.cards.map(card => card._id)?.includes(cardId))
    }

    const handleDragStart = (e: DragStartEvent) => {
        // console.log('handleDragStart', e);
        setActiveDragItemId(e?.active?.id as string)
        setActiveDragItemType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(e?.active?.data?.current as ColumnType | CardType | null)

        //Nếu là kéo card thì mới thực hiện action set giá trị oldcolumn
        if (e?.active?.data?.current?.columnId) {
            setOldColumnWhenDraggingCard(findColumnByCardId(e?.active?.id as string) || null)
        }
    }

    const handleDragOver = (e: DragOverEvent) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

        const { active, over } = e;
        if (!active || !over) return


        const activeDraggingCardId = active.id as string;
        const activeDraggingCardData = active.data?.current as CardType;
        const overCardId = over.id as string;


        // Find 2 columns following cardIds
        const activeColumn = findColumnByCardId(activeDraggingCardId as string)
        const overColumn = findColumnByCardId(overCardId as string)



        if (!activeColumn || !overColumn) return

        //Do if Drag differents column
        if (activeColumn._id !== overColumn._id) {
            moveCardBetweenDiffrentColumns(

                overColumn,
                overCardId,
                active,
                over,
                activeColumn,
                activeDraggingCardId,
                activeDraggingCardData

            )
        }



    }

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (!active || !over) return

        //Card Drag End
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

            const activeDraggingCardId = active.id as string;
            const activeDraggingCardData = active.data?.current as CardType;
            const overCardId = over.id as string;


            // Find 2 columns following cardIds
            const activeColumn = findColumnByCardId(activeDraggingCardId as string)
            const overColumn = findColumnByCardId(overCardId as string)

            if (!activeColumn || !overColumn) return

            //Move different column
            if (oldColumnWhenDraggingCard?._id !== overColumn._id) {
                moveCardBetweenDiffrentColumns(

                    overColumn,
                    overCardId,
                    active,
                    over,
                    activeColumn,
                    activeDraggingCardId,
                    activeDraggingCardData

                )
            }
            //Move the same column

            else {
                const oldCardIndex = oldColumnWhenDraggingCard?.cards.findIndex((c: CardType) => c._id === activeDragItemId)
                const newCardIndex = overColumn.cards.findIndex((c: CardType) => c._id === overCardId)

                const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
                setOrderColumn(prevColumn => {
                    //clone mảng orderedColumnState cũ ra 1 cái mới để xử lý data rồi return - cập nhật lại orderedColumnState mới
                    const nextColumns = cloneDeep(prevColumn)
                    //Tìm tới column mà chúng ta đang thả
                    const targetColumn = nextColumns.find(column => column._id === overColumn._id)

                    if (targetColumn) {
                        targetColumn.cards = dndOrderedCards
                        targetColumn.cardOrderIds = targetColumn.cards.map(card => card._id)
                    }

                    return nextColumns
                })



            }

        }

        //Column Drag End
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                const oldColumnIndex = orderColumn.findIndex((c: ColumnType) => c._id === active.id)
                const newColumnIndex = orderColumn.findIndex((c: ColumnType) => c._id === over.id)

                const dndOrderedColumns = arrayMove(orderColumn, oldColumnIndex, newColumnIndex)
                // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id) //update on db
                // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds);
                setOrderColumn(dndOrderedColumns)
            }
        }

        //Những data sau khi kéo thả luôn phải để về giá trị null
        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
        setOldColumnWhenDraggingCard(null)

    }

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: { active: { opacity: '0.5' } }
        })
    }

    const { modalOpen, setModalOpen, selectedCard, setSelectedCard } = useModalContext();

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedCard(null);
    };

    return (
            <div className={modalOpen ? 'pointer-events-none' : ''}>
                <DndContext
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    sensors={sensors}
                    collisionDetection={closestCorners}
                >

                    <div className='h-[var(--boardcontent-height)]  bg-[#1976D2] p-4'>
                        {/*Column Lists */}
                        <ListColumns columns={orderColumn}  />
                        <DragOverlay dropAnimation={dropAnimation}>
                            {(!activeDragItemType) && null}
                            {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && (
                                <Column column={activeDragItemData as ColumnType} />
                            )}
                            {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && (
                                <Card card={activeDragItemData as CardType} />
                            )}
                        </DragOverlay>
                    </div>
                    <CardModal open={modalOpen} onClose={handleModalClose} card={selectedCard} />

                </DndContext>
            </div >

    );
}

export default BoardContent;