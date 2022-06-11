import "./App.css";
import { Banner } from "./components/banner";
import { Navbar } from "./components/navbar";
import { Movie } from "./components/movies";
import { Favourites } from "./components/favourites";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Banner />
              <Movie />
            </>
          }
        />
        <Route
          path="favourites"
          element={
            <>
              <Navbar />
              <Favourites />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
