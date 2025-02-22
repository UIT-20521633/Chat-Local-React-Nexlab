import ChatMain from "./pages/Chat/ChatMain";
import SideBarMain from "./pages/Chat/SideBarMain";
import "./style/style.css";
function App() {
  return (
    <div className="h-screen w-screen overflow-visible">
      <div className="flex w-full h-full">
        <SideBarMain />
        <div className="flex-1 bg-custom-bg-chat">
          <ChatMain />
        </div>
      </div>
    </div>
  );
}

export default App;
