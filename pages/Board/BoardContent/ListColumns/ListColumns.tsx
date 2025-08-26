import { FileAddOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';
import Column from './Column/Column';
import { ColumnType } from '@/types/Board';


function ListColumns({columns}: {columns: ColumnType[]}) {

    return (
        <div className='flex gap-4 overflow-x-auto overflow-y-hidden my-[5px] py-[5px] h-[calc(var(--boardcontent-height)-24px)]'>
            {columns?.map(column => <Column key={column._id} column={column} />)}

             <div className='min-w-[200px] max-w-[300px]  mx-2 rounded-xs h-fit'>
                <Button variant='outlined' className=' w-full' style={{ backgroundColor: 'transparent', color: 'white' }}>
                    <FileAddOutlined  className='text-xl' />
                    <span>Add new column</span>
                </Button>
            </div>  
        </div> 
    );
}
export default ListColumns;