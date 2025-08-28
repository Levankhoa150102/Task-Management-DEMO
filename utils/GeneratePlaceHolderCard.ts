import { ColumnType } from "@/types/Board";

export const GeneratePlaceholderCard = (column: ColumnType)  => {
    return {
        _id: `${column._id}-placeholder-card`,
        boardId: column.boardId,
        columnId: column._id,
        title: `Title of card ${column.cards.length + 1}`,
        priority: 'low',
        description: null,
        cover: null,
        memberIds: [],
        comments: [],
        attachments: [],
        FE_PlaceholderCard: true
    };
};
