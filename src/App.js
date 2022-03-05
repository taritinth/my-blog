import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./features/post";
import PostDetails from "./features/post/PostDetails";
import AuthorProfile from "./features/post/AuthorProfile";

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
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/authors/:authorId" element={<AuthorProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
