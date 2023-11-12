import LandingPage from "../component/LandingPage/LandingPage";
import Upload from "../component/Upload/Upload";
import { Routes, Route } from "react-router-dom";
import Widget from "../component/widget/Widget";
import Setting from "../component/setting/Setting";

const MainRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload/:id" element={<Upload />} />
        <Route path="/widget" element={<Widget />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    );
  };
  export { MainRoutes };