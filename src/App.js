import EntryHomePage from "./Components/DataEntryPage/EntryHomePage";
import HomePage from "./Components/HomePage/HomePage";
import ListHomePage from "./Components/ListPage/ListHomePage";
import { Routes, Route } from "react-router-dom";
import DisplayPage from "./Components/DisplayHomePage/DisplayPage";
import HomeDisplay from "./Components/DisplayHomePage/HomeDisplay";
import EntryPage from "./Components/DataEntryPage/EntryPage";
import UpdateHome from "./Components/UpdatePage/UpdateHome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list/:item_code" element={<ListHomePage />} />
        <Route path="/display/:hw_id" element={<HomeDisplay />} />
        <Route path="/entryPage" element={<EntryHomePage />} />
        <Route path="/updatePage/:hw_id" element={<UpdateHome />} />
      </Routes>
    </>
  );
}

export default App;
