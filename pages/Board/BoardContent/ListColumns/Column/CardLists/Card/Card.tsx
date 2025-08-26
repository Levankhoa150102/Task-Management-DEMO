import ExImage from '@/public/image.png';
import { CardType } from '@/types/Board';
import { CommentOutlined, PaperClipOutlined, UserOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';
import Image from 'next/image';

function Card({ card }: { card: CardType }) {
    const checkShowAction = () => {
        return !!card.memberIds.length || !!card.comments.length || !!card.attachments.length;
    }
    return (
        <div className='bg-white rounded-md shadow-md'>
            {card.cover && <Image src={ExImage} alt="Card Image" />}
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