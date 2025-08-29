import Button from 'antd/es/button';
import Modal from 'antd/es/modal';

type ConfirmModalProps = {
    open: boolean;
    message: string;
    okText?: string;
    cancelText?: string;
    onClose: () => void;
    onActiveFunction: () => void;
}

const ConfirmModal = ({ open, message, okText, cancelText, onClose, onActiveFunction }: ConfirmModalProps) => {
    return (
        <Modal open={open} onCancel={onClose} centered width={400} footer={null}>
            <div className="p-4">
                <p className='text-2xl dark:text-white font-semibold'>{message}</p>
            </div>
            <div className="flex justify-end p-4">
                <Button onClick={onClose} type='primary' className='min-w-[50px] min-h-[40px] rounded-md mr-2'><span className='font-bold'>{cancelText || "Cancel"}</span></Button>
                <Button onClick={onActiveFunction} type="primary" danger className='min-w-[50px] min-h-[40px] rounded-md'><span className='font-bold'>{okText || "OK"}</span></Button>
            </div>
        </Modal>
    )
}

export default ConfirmModal;