import { Route, Routes } from "react-router-dom";
import Feed from "./pages/feed";
import Comments from "./pages/comments";
import Profile from "./pages/profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/:id/comments" element={<Comments />} />
      <Route path="/:id/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
