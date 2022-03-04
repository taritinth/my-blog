import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Posts from "./features/post";
import PostDetails from "./features/post/PostDetails";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
