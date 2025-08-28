import ExImage from '@/public/image.png';
import { CardType } from '@/types/Board';
import { CommentOutlined, PaperClipOutlined, UserOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from 'antd/es/button';
import Image from 'next/image';

function Card({ card }: { card: CardType }) {
    const getPriorityColor = (priority?: string) => {
        switch (priority) {
            case 'high': return 'bg-red-500 text-white';
            case 'medium': return 'bg-yellow-400 text-gray-800';
            case 'low': return 'bg-green-500 text-white';
            default: return 'bg-gray-300 text-gray-700';
        }
    };
    const checkShowAction = () => {
        return !!card.memberIds.length || !!card.comments.length || !!card.attachments.length;
    }
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: card._id, data: { ...card },
    });
    const dndKitCardStyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        border: isDragging ? '1px solid #2ecc71' : 'none',

    }

    return (
        <div className={`bg-white rounded-md shadow-md ${card?.FE_PlaceholderCard ? 'h-0' : 'unset'} ${card?.FE_PlaceholderCard ? 'overflow-hidden' : ''}`}
            ref={setNodeRef}
            style={dndKitCardStyles}
            {...attributes}
            {...listeners}
        >
            {card.cover && <Image src={ExImage} alt="Card Image" />}
            {/* Priority badge */}
            {card.priority && (
                <span className={`ml-3 mt-2 inline-block px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(card.priority)}`}>
                    {card.priority.charAt(0).toUpperCase() + card.priority.slice(1)}
                </span>
            )}
            <p className='p-3'>{card.title}</p>
            {checkShowAction() && <div className='px-1 pb-2'>
                {!!card.memberIds.length && <Button type="link" className='text-[#1976D2]'>
                    <UserOutlined />
                    <span>{card.memberIds.length}</span>
                </Button>}
                {!!card.comments.length && <Button type="link" className='text-[#1976D2]'>
                    <CommentOutlined />
                    <span>{card.comments.length}</span>
                </Button>}
                {!!card.attachments.length && <Button type="link" className='text-[#1976D2]'>
                    <PaperClipOutlined />
                    <span>{card.attachments.length}</span>
                </Button>}
            </div>}
        </div>
    );
}

export default Card;