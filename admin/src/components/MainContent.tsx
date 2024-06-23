import {Route, Routes, Navigate} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reservations from "./Reservations";
import Books from "../components/pages/books/Books";
import Users from "../components/pages/users/Users";
import BookDescription from "./pages/books/BookDescription";

const MainContent = () => {
  return (
    <div className="mt-16 ml-56">
      <div className="px-4 py-2 pb-4 overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/books" element={<Books />} />
          <Route path="/users" element={<Users />} />
          <Route path="/book-description" element={<>Book not found</>} />
          <Route path="/book-description/:id" element={<BookDescription />} />
          <Route path="*" element={<>Page not found</>} />
        </Routes>
      </div>
    </div>
  );
};

export default MainContent;
