import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar/Sidebar"
import { SidebarProvider } from "../contexts/SidebarContext"
import React from "react"

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300 ml-20 md:ml-64">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout
