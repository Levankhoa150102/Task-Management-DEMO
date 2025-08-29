'use client'
import { CardType } from '@/types/Board';
import { formatName } from '@/utils/FormatName';
import { CommentOutlined, PaperClipOutlined, UserOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';
import Modal from 'antd/es/modal';
import Image from 'next/image';
import React, { useState } from 'react';
import ConfirmModal from '../ui/ConfirmModal';

interface CardModalProps {
  open: boolean;
  onClose: () => void;
  onDeleteCard: (cardId: string) => void;
  card: CardType | null;
}

const CardModal: React.FC<CardModalProps> = ({ open, onClose, card, onDeleteCard }) => {
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  if (!card) return null;

  // Priority badge color
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-400 text-gray-800';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  const handleDeleteCardModal = () => {
    if (card) {
      setOpenConfirmModal(true);
    }
  };

  return (
    <Modal open={open}
      onCancel={onClose}
      centered
      width={700}
      footer={[
        <Button key="delete" color="danger" variant="solid" onClick={handleDeleteCardModal} className='min-w-[50px] min-h-[40px] rounded-md'>
          <span className='font-bold'>Delete</span>
        </Button>,
        <Button key="back" type='primary' onClick={onClose} className='min-w-[50px] min-h-[40px] rounded-md'>
          <span className='font-bold'>Back</span>
        </Button>,
      ]}

    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:bg-[#333643]">
        {/* Left: Main Info */}
        <div className="flex flex-col gap-4">
          {/* Cover Image */}
          {card.cover && (
            <div className="w-full h-48 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
              <Image src={typeof card.cover === 'string' ? card.cover : card.cover.src} alt={card.title} width={320} height={192} className="object-cover w-full h-full" />
            </div>
          )}
          {/* Title & Priority */}
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{card.title}</h2>
            {card.priority && (
              <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(card.priority)}`}>
                {formatName(card.priority)}
              </span>
            )}
          </div>
          {/* Description */}
          {card.description && (
            <p className="text-gray-600 mb-2 whitespace-pre-line dark:text-white">{card.description}</p>
          )}
        </div>

        {/* Right: Details */}
        <div className="flex flex-col gap-6">
          {/* Member Section */}
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-base mb-1">
              <UserOutlined />
              Members: <span className="text-gray-800 dark:text-white">{card.memberIds?.length || 0}</span>
            </div>
            {card.memberIds && card.memberIds.length > 0 && (
              <ul className="pl-6 list-disc text-gray-700 text-sm dark:text-white">
                {card.memberIds.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Comment Section */}
          <div>
            <div className="flex items-center gap-2 text-green-600 font-semibold text-base mb-1">
              <CommentOutlined />
              Comments: <span className="text-gray-800 dark:text-white">{card.comments?.length || 0}</span>
            </div>
            {card.comments && card.comments.length > 0 && (
              <ul className="pl-6 list-disc text-gray-700 text-sm dark:text-white">
                {card.comments.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Attachments Section */}
          <div>
            <div className="flex items-center gap-2 text-purple-600 font-semibold text-base mb-1">
              <PaperClipOutlined />
              Attachments: <span className="text-gray-800 dark:text-white">{card.attachments?.length || 0}</span>
            </div>
            {card.attachments && card.attachments.length > 0 && (
              <ul className="pl-6 list-disc text-gray-700 text-sm dark:text-white">
                {card.attachments.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        open={openConfirmModal}
        message="Are you sure you want to delete this card?"
        okText="Delete"
        cancelText="Cancel"
        onClose={() => setOpenConfirmModal(false)}
        onActiveFunction={() => {
          onDeleteCard(card._id);
          setOpenConfirmModal(false);
          onClose();
        }}
      />
        </Modal>
  );
};

export default CardModal;
