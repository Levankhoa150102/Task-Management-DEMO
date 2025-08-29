import React, { useEffect, useState } from 'react';
import { CardType } from '@/types/Board';
import Form from 'antd/es/form';
import Modal from 'antd/es/modal';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import Button from 'antd/es/button';
import { modalStyles } from '@/constants/modelStyle';
import { userData } from '@/apis/userData';
import Avatar from 'antd/es/avatar';
import { PaperClipOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import Upload from 'antd/es/upload';
import Image from 'next/image';

interface EditCardModalProps {
    open: boolean;
    card: CardType;
    onClose: () => void;
    onSave: (updatedCard: CardType) => void;
    onCloseParent?: () => void;
}

const EditCardModal: React.FC<EditCardModalProps> = ({ open, card, onClose, onSave, onCloseParent }) => {
    const [form] = Form.useForm();
    const [members, setMembers] = useState<string[]>(card.memberIds || []);
    const [comments, setComments] = useState<string[]>(card.comments || []);
    const [attachments, setAttachments] = useState<string[]>(card.attachments || []);
    const [newComment, setNewComment] = useState('');
    const [newAttachment, setNewAttachment] = useState('');
    const [cover, setCover] = useState(card.cover || null);

    useEffect(() => {
        if (open) {
            form.setFieldsValue({
                title: card.title,
                description: card.description,
                priority: card.priority,
            });
            setMembers(card.memberIds || []);
            setComments(card.comments || []);
            setAttachments(card.attachments || []);
            setNewComment('');
            setNewAttachment('');
            setCover(card.cover || null);
        }
    }, [open, card, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            onSave({
                ...card,
                ...values,
                memberIds: members,
                comments,
                attachments,
                cover,
            });
            onClose();
        });
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments(prev => [...prev, newComment.trim()]);
            setNewComment('');
        }
    };

    const handleAddAttachment = () => {
        if (newAttachment.trim()) {
            setAttachments(prev => [...prev, newAttachment.trim()]);
            setNewAttachment('');
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            onOk={handleOk}
            centered
            destroyOnHidden
            styles={modalStyles}
            footer={[
                <Button key="back" type='default' onClick={onClose} className='min-w-[50px] min-h-[40px] rounded-md'>
                    <span className='font-bold'>Back</span>
                </Button>,
                <Button key="confirm" type='primary' variant="solid" onClick={handleOk} className='min-w-[50px] min-h-[40px] rounded-md'>
                    <span className='font-bold'>Confirm</span>
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="title" label="Title">
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item name="priority" label="Priority">
                    <Select>
                        <Select.Option value="low">Low</Select.Option>
                        <Select.Option value="medium">Medium</Select.Option>
                        <Select.Option value="high">High</Select.Option>
                    </Select>
                </Form.Item>
                {/* Members */}
                <Form.Item label="Members">
                    <Select
                        mode="multiple"
                        value={members}
                        onChange={setMembers}
                        placeholder="Add members"
                        style={{ width: '100%' }}
                    >
                        {userData.map(user => (
                            <Select.Option key={user.id} value={user.id}>{user.name} ({user.email})</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                {/* Comments */}
                <Form.Item label="Comments">
                    <div style={{ maxHeight: 100, overflowY: 'auto', marginBottom: 8 }}>
                        <ul className="space-y-2 mt-2 max-h-[200px] overflow-auto">
                            {comments.map((c, idx) => (
                                <li key={idx} className="flex items-start gap-2 bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2 w-fit">
                                    <div className="flex-shrink-0">
                                        <Avatar size={24} className="bg-green-200 text-green-700" icon={<UserOutlined />} style={{ minWidth: 24, minHeight: 24, width: 24, height: 24 }} />
                                    </div>
                                    <span className="text-sm text-gray-800 dark:text-white break-words">{c}</span>
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <Input
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            placeholder="Add comment"
                            onPressEnter={handleAddComment}
                        />
                        
                        <Button type="primary" onClick={handleAddComment}>Add</Button>
                    </div>
                </Form.Item>
                {/* Attachments */}
                <Form.Item label="Attachments">
                    <div className="flex gap-1 mt-2 flex-wrap max-h-[80px] overflow-auto">
                        {attachments.map((a, idx) => (
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
                    <Upload
                        showUploadList={false}
                        beforeUpload={(file: File) => {
                            const url = URL.createObjectURL(file);
                            setAttachments(prev => [...prev, url]);
                            setNewAttachment('');
                            return false;
                        }}
                    >
                        <Button type="primary" className='my-2 mx-3'>
                            <UploadOutlined />
                            Upload
                        </Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditCardModal;
