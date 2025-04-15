import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, Home, Menu, Users, Info, Phone, LogOut, Newspaper } from "lucide-react" // Thêm icon Newspaper
import Logo from '../../assets/logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const location = useLocation()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)

    // Get cart count from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      const count = parsedCart.reduce((acc, item) => acc + item.quantity, 0)
      setCartCount(count)
    }

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update cart count when localStorage changes
  useEffect(() => {
    const updateCartCount = (cart) => {
      if (cart && Array.isArray(cart)) {
        const count = cart.reduce((acc, item) => acc + item.quantity, 0)
        setCartCount(count)
      } else {
        setCartCount(0)
      }
    }
  
    const handleCartUpdated = (e) => {
      const updatedCart = e.detail.cart
      updateCartCount(updatedCart)
    }
  
    // Lần đầu load
    const savedCart = JSON.parse(localStorage.getItem("cart"))
    updateCartCount(savedCart)
  
    // Nghe sự kiện từ các tab khác (storage)
    const handleStorage = () => {
      const latestCart = JSON.parse(localStorage.getItem("cart"))
      updateCartCount(latestCart)
    }
  
    window.addEventListener("cartUpdated", handleCartUpdated)
    window.addEventListener("storage", handleStorage)
  
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated)
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    window.location.href = "/login"
  }

  const navItems = [
    { name: "Trang chủ", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Danh mục", path: "/menu", icon: <Menu className="h-5 w-5" /> },
    { name: "Đặt bàn", path: "/reservation", icon: <Users className="h-5 w-5" /> },
    { name: "Giới thiệu", path: "/about", icon: <Info className="h-5 w-5" /> },
    { name: "Liên hệ", path: "/contact", icon: <Phone className="h-5 w-5" /> },
    { name: "Blog ẩm thực", path: "/blog", icon: <Newspaper className="h-5 w-5" /> },  {/* Thêm mục Blog & Tin tức */}
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <img src={Logo} alt="logo" className="h-10 md:h-12" />
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Nhà hàng Quang Quý
          </Link>

          {/* Navigation Menu (Centered) */}
          <nav className="flex justify-center space-x-6 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === item.path ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login / Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5" />
                <span>Đăng xuất</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
