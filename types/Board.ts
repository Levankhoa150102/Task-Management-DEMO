import { StaticImageData } from "next/image";

export type CardType = {
    _id: string;
    boardId: string;
    columnId: string;
    title: string;
    description: string | null;
    cover: {
        src: StaticImageData | string;
        alt: string
    } | null;
    priority: 'low' | 'medium' | 'high' | string;
    memberIds: string[];
    comments: string[];
    attachments: string[];
    FE_PlaceholderCard?: boolean;
}

export type ColumnType = {
    _id: string;
    boardId: string;
    title: string;
    cardOrderIds: string[]
    cards: CardType[];
}

export type BoardType = {
    _id: string,
    title: string,
    description: string,
    type: string,
    ownerIds: string[],
    memberIds: string[],
    columnOrderIds: string[],
    columns: ColumnType[];
}