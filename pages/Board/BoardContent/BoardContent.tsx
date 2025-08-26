import { BoardType } from '@/types/Board';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '@/utils/Sort';

function BoardContent({board}:{board: BoardType}) {
    const orderedColumn = mapOrder(board.columns, board.columnOrderIds, '_id')
    return (
        <div className='h-[var(--boardcontent-height)]  bg-[#1976D2] p-4'>
            {/*Column Lists */}
            <ListColumns columns={orderedColumn} />
        </div>
    );
}

export default BoardContent;