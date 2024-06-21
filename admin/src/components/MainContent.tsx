import {Route, Routes, Navigate} from "react-router-dom";
// import Books from "../pages/Books";
// import Dashboard from "../pages/Dashboard";
// import BookDescription from "../pages/books/BookDescription";
// import Profile from "../!manage/comp/Profile";
// import WaterFill from "../!manage/comp/WaterFill";

const MainContent = () => {
  return (
    <div className="pt-16 pl-56 #position-fixer->change-paddings-according-to-navbar-and-sidebar">
      <div className="px-4 py-2 #main-content-wrapper">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {/*  
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book-description" element={<>Book not found</>} />
        <Route path="/book-description/:id" element={<BookDescription />} />
        <Route path="/menu" element={<Profile />} />
        
        */}
          <Route path="*" element={<>Page not found</>} />
        </Routes>
      </div>
    </div>
  );
};

export default MainContent;
