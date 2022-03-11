import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./features/post/HomePage";
import PostPage from "./features/post/PostPage";
import AuthorPage from "./features/author/AuthorPage";

// const Navbar = styled.nav`
//   background-color: white;
//   height: 72px;
// `;

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="/authors/:authorId" element={<AuthorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
