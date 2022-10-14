import ListPage from "./ListPage";
import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";
import Login from "../HomePage/Login";

function ListHomePage() {
  return (
    <>
      <Header />
      <Login />
      <ListPage />
      {/* <Footer bottom="" /> */}
    </>
  );
}
export default ListHomePage;
