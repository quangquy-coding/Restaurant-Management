import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar/Sidebar"
import { SidebarProvider } from "../contexts/SidebarContext"
import React from "react"
import { useSidebar } from "../hooks/useSidebar"

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AdminLayoutContent />
    </SidebarProvider>
  )
}

const AdminLayoutContent = () => {
  const { isOpen, isMobile, toggleSidebar } = useSidebar()

  // Chiều rộng thực tế của Sidebar để tính offset
  const sidebarWidth = isMobile ? 0 : isOpen ? 256 : 80 // Tailwind: w-64 = 256px, w-20 = 80px

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Nút mở/đóng sidebar cho mobile */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-50 p-2 bg-white rounded shadow-md md:hidden"
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      )}

      {/* Nội dung chính */}
      <div
        className="flex-1 flex flex-col overflow-hidden transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }} // đây là mấu chốt
      >
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
