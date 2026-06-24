import { FileText, Plus } from "lucide-react";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";
import CreateFab from "./components/createFab";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Header title={"Workspace"} />
      <div className="h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center max-w-md">
          <FileText size={64} className="mx-auto text-zinc-600 mb-4" />

          <h1 className="text-2xl font-semibold">Welcome to WiggleNote</h1>

          <p className="text-zinc-500 mt-2">
            Select a note from the sidebar or create a new one.
          </p>

          <CreateFab title="create" onClick={() => navigate("/create-note")} />
        </div>
      </div>
    </>
  );
}
