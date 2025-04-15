import React from "react"
import { useSidebar } from "../../hooks/useSidebar"
import SidebarHeader from "./SidebarHeader"
import SidebarMenu from "./SidebarMenu"
import SidebarFooter from "./SidebarFooter"

const Sidebar = () => {
  const { isOpen, isMobile, toggleSidebar } = useSidebar()

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-screen transition-all duration-300 ease-in-out 
          ${isOpen ? "w-64" : "w-20"} 
          ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"} 
          bg-white border-r border-gray-200 shadow-lg`}
      >
        <div className="flex flex-col h-full">
          <SidebarHeader />
          <SidebarMenu />
          <SidebarFooter />
        </div>
      </aside>
    </>
  )
}

export default Sidebar
