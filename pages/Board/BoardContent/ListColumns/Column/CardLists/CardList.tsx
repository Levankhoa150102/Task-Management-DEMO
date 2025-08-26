import { CardType } from '@/types/Board';
import Card from './Card/Card';

function CardLists({cards}: {cards : CardType[]}) {
    return (
        <div className='px-[5px] mx-[5px] space-y-2 max-h-[calc(var(--boardcontent-height)-50px-60px-64px)] overflow-y-auto'>
            {cards?.map((card) => (
                <Card key={card._id} card={card} />
            ))}
        </div>
    );
}

export default CardLists;