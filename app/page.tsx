import Header from "@/components/primary-ui/Header";
import BoardBar from "@/pages/Board/BoardBar/BoardBar";
import BoardContent from "@/pages/Board/BoardContent/BoardContent";

export default function Home() {
  return (
    <>
      <Header />
      <BoardBar />
      <BoardContent />
    </>
  );
}
