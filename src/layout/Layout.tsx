// MainLayout.tsx
import { useState } from "react";
import Sidebar from "./SideBar";

import Appbar from "./AppBar";
import { Outlet } from "react-router-dom";
import { logoutUser } from "../store/user/thunkApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Appbar
        toggleSidebar={toggleSidebar}
        isLoggedIn={true}
        onLogout={
          /*logout*/ async () => {
            await dispatch(logoutUser());
          }
        }
      />
      <div style={{ flex: 1, display: "flex" }}>
        <Sidebar open={isSidebarOpen} />
        <main
          style={{ flex: 1, transition: "margin-left 0.3s", marginTop: "64px" }}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
