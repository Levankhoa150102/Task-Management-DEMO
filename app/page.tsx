import Header from "@/components/primary-ui/Header";
import BoardBar from "@/pages/Board/BoardBar/BoardBar";
import BoardContent from "@/pages/Board/BoardContent/BoardContent";
import { mockData } from "@/apis/mockData";
import { ModalProvider } from "@/context/ModalContent";
export default function Home() {
  return (
        <ModalProvider>
          <Header />
          <BoardBar board={mockData.board} />
          <BoardContent board={mockData.board} />
        </ModalProvider>
  );
}
