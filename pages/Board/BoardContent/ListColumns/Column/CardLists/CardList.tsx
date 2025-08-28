import { CardType } from '@/types/Board';
import Card from './Card/Card';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useModalContext } from '@/context/ModalContent';


function CardLists({ cards }: { cards: CardType[]; }) {
    const { setModalOpen, setSelectedCard } = useModalContext();
    const handleCardClick = (card: CardType) => {
        setSelectedCard(card);
        setModalOpen(true);
    };

    return (
        <>
            <SortableContext items={cards.map(card => card._id)} strategy={verticalListSortingStrategy}>
                <div className='px-[5px] mx-[5px] space-y-2 max-h-[calc(var(--boardcontent-height)-50px-60px-64px)] overflow-y-auto'>
                    {cards?.map((card) => (
                        <div key={card._id} onClick={() => handleCardClick(card)} className='cursor-pointer'>
                            <Card card={card} />
                        </div>
                    ))}
                </div>
            </SortableContext>
        </>
    );
}

export default CardLists;