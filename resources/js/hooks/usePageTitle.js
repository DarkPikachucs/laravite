import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Home - My App",
      "/login": "Login - My App",
      "/dashboard": "Dashboard - My App",
      "/profile": "Profile - My App",
      "/quarterreport": "รายงานติดตามโครงการ - ",
      "/gvh": "แบบสำรวจ GVH - ",
      "/strategics": "แผนยุทธศาสตร์ - ",
    };

    document.title = titles[location.pathname.toLowerCase()] || "Survey"; // ถ้าไม่มีใน List ใช้ Default
  }, [location]);
};

export default usePageTitle;
