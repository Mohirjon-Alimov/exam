import "./App.css";
import { Home } from "./home";
import { useAuth } from "./hooks/useAuth";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/loginPage";
import { AuthorPage } from "./components/singlePage/authorPage";
import { Modal } from "./components/modal/modal";
import { useContext, useState } from "react";
import { Settings } from "./pages/settings/settings";
import { AddBook } from "./pages/addBook";
import { AddAuthor } from "./pages/addAuthor";
import { ThemeContext } from "./context/themeContext";
import { BookPage } from "./components/singlePage/bookPage";

function App() {
  const { token } = useAuth();
  const { theme } = useContext(ThemeContext);
  let [modal, setModal] = useState(false);

  if (theme === "dark") {
    document.querySelector("html").classList.add("dark");
    document.querySelector("html").classList.remove("light");
  } else {
    document.querySelector("html").classList.remove("dark");
    document.querySelector("html").classList.add("light");
  }

  return (
    <div className={theme === "dark" ? "dark" : "light"}>
      {token ? (
        <Routes>
          <Route path="/" element={<Home modal={modal} setModal={setModal} />}>
            <Route path="/books" element={<Home />}>
              <Route path="independence-books" element={<Home />} />
              <Route path="timurid-books" element={<Home />} />
              <Route path="jadids-books" element={<Home />} />
              <Route path="soviet-books" element={<Home />} />
            </Route>
            <Route path="timurid" element={<Home />} />
            <Route path="soviet" element={<Home />} />
            <Route path="independence" element={<Home />} />
          </Route>
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/add-books" element={<AddBook />} />
          <Route path="/add-authors" element={<AddAuthor />} />
          <Route path="/book/:title" element={<BookPage modal={modal} setModal={setModal}/>}></Route>
          <Route path="/author/:id" element={<AuthorPage modal={modal} setModal={setModal} />}
          />
        </Routes>
      ) : (
        <LoginPage />
      )}
      <Modal modal={modal} setModal={setModal} />
    </div>
  );
}

export default App;
