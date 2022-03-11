import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./features/post";
import PostContent from "./features/post/PostContent";
import AuthorProfile from "./features/author";

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
          <Route path="/" element={<Posts />} />
          <Route path="/posts/:postId" element={<PostContent />} />
          <Route path="/authors/:authorId" element={<AuthorProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
