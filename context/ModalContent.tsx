'use client'
import { CardType } from "@/types/Board";
import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

interface ModalContextType {
    modalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    selectedCard: CardType | null;
    setSelectedCard: Dispatch<SetStateAction<CardType | null>>;
}

const ModalOpenContext = createContext<ModalContextType | undefined>(undefined);

function ModalProvider({ children }: { children: ReactNode }) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<CardType | null>(null);


    return (
        <ModalOpenContext.Provider value={{ modalOpen, setModalOpen, selectedCard, setSelectedCard }}>
            {children}
        </ModalOpenContext.Provider>
    );
}

function useModalContext() {
    const context = useContext(ModalOpenContext);
    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider");
    }
    return context;
}

export { ModalProvider, useModalContext };