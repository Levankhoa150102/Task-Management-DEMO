'use client'
import { CardType } from '@/types/Board';
import { formatName } from '@/utils/FormatName';
import { CommentOutlined, PaperClipOutlined, UserOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';
import Modal from 'antd/es/modal';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ConfirmModal from '../ui/ConfirmModal';
import EditCardModal from '../ui/EditCardModal';
import { modalStyles } from '@/constants/modelStyle';
import Avatar from 'antd/es/avatar/Avatar';

interface CardModalProps {
  open: boolean;
  onClose: () => void;
  onDeleteCard: (cardId: string) => void;
  onEditCard: (card: CardType) => void;
  card: CardType | null;
}


const CardModal: React.FC<CardModalProps> = ({ open, onClose, card, onDeleteCard, onEditCard }) => {
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const handleEditSave = (updatedCard: CardType) => {
    onEditCard(updatedCard);
    setEditOpen(false);
  };


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
    <>
      <Modal open={open}
        onCancel={onClose}
        centered
        width={700}
        footer={[
          <Button key="edit" type="primary" onClick={() => setEditOpen(true)} className='min-w-[50px] min-h-[40px] rounded-md'>
            <span className='font-bold'>Edit</span>
          </Button>,
          <Button key="delete" color="danger" variant="solid" onClick={handleDeleteCardModal} className='min-w-[50px] min-h-[40px] rounded-md'>
            <span className='font-bold'>Delete</span>
          </Button>,
          <Button key="back" type='default' onClick={onClose} className='min-w-[50px] min-h-[40px] rounded-md'>
            <span className='font-bold'>Back</span>
          </Button>,
        ]}
        styles={modalStyles}
      >
        <div className=" md:grid-cols-2 gap-6 dark:bg-[#333643]">
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
              <p className="text-gray-600 mb-2 whitespace-pre-line dark:text-white max-h-[200px] overflow-y-auto">{card.description}</p>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-4 mt-2">
            {/* Member Section */}
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-base mb-1">
                <UserOutlined />
                Members: <span className="text-gray-800 dark:text-white">{card.memberIds?.length || 0}</span>
              </div>
              {card.memberIds && card.memberIds.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {card.memberIds.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900 rounded px-2 py-1">
                      <Avatar size={24} className="bg-blue-200 text-blue-700" icon={<UserOutlined />} />
                      <span className="text-sm text-gray-800 dark:text-white">{formatName(m)}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Comment Section */}
            <div className=''>
              <div className="flex items-center gap-2 text-green-600 font-semibold text-base mb-1">
                <CommentOutlined />
                Comments: <span className="text-gray-800 dark:text-white">{card.comments?.length || 0}</span>
              </div>
              {card.comments && card.comments.length > 0 && (
                <ul className="space-y-2 mt-2 max-h-[200px] overflow-auto">
                  {card.comments.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2 w-fit">
                      <div className="flex-shrink-0">
                        <Avatar size={24} className="bg-green-200 text-green-700" icon={<UserOutlined />} style={{ minWidth: 24, minHeight: 24, width: 24, height: 24 }} />
                      </div>
                      <span className="text-sm text-gray-800 dark:text-white break-words">{c}</span>
                    </li>
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
                <div className="flex gap-1 mt-1 flex-wrap">
                  {card.attachments.map((a, idx) => (
                    <a
                      key={idx}
                      href={a}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900 rounded px-3 py-2 hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors"
                    >
                      <PaperClipOutlined className="text-purple-500" />
                      <span className="truncate max-w-[180px] text-sm text-gray-800 dark:text-white">{a.split('/').pop()}</span>
                    </a>
                  ))}
                </div>
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
        <EditCardModal open={editOpen} card={card} onClose={() => setEditOpen(false)} onCloseParent={onClose} onSave={handleEditSave} />
      </Modal >
    </>
  );
};

export default CardModal;
