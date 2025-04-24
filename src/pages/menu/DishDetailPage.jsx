import React from "react"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Star, Plus, Minus, ShoppingCart } from "lucide-react"

// Mock data for a single dish
const mockDishData = {
  1: {
    id: 1,
    name: "Phở bò tái",
    category: "Món chính",
    price: 85000,
    description:
      "Phở bò truyền thống với thịt bò tái, nước dùng đậm đà được ninh từ xương bò trong 24 giờ, kèm theo các loại rau thơm và gia vị đặc trưng của ẩm thực Việt Nam.",
    ingredients: ["Bánh phở", "Thịt bò tái", "Hành tây", "Hành lá", "Rau thơm", "Gia vị"],
    nutritionInfo: {
      calories: 520,
      protein: "25g",
      carbs: "65g",
      fat: "12g",
    },
    allergens: ["Gluten", "Đậu nành"],
    preparationTime: "15 phút",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    isAvailable: true,
    isSpecial: false,
    rating: 4.8,
    reviews: 124,
    relatedDishes: [2, 6, 7],
  },
  2: {
    id: 2,
    name: "Gỏi cuốn tôm thịt",
    category: "Món khai vị",
    price: 65000,
    description: "Gỏi cuốn tươi với tôm và thịt heo, cuốn cùng rau sống và bún, chấm với nước mắm pha hoặc tương đen.",
    ingredients: ["Bánh tráng", "Tôm", "Thịt heo", "Bún", "Rau sống", "Nước mắm"],
    nutritionInfo: {
      calories: 320,
      protein: "18g",
      carbs: "40g",
      fat: "8g",
    },
    allergens: ["Hải sản", "Đậu nành"],
    preparationTime: "10 phút",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    isAvailable: true,
    isSpecial: false,
    rating: 4.6,
    reviews: 98,
    relatedDishes: [1, 3, 7],
  },
  3: {
    id: 3,
    name: "Cơm rang hải sản",
    category: "Món chính",
    price: 95000,
    description:
      "Cơm rang với các loại hải sản tươi ngon như tôm, mực, cua, sò điệp, được xào cùng rau củ và gia vị đặc biệt.",
    ingredients: ["Cơm", "Tôm", "Mực", "Cua", "Sò điệp", "Rau củ", "Gia vị"],
    nutritionInfo: {
      calories: 580,
      protein: "28g",
      carbs: "70g",
      fat: "15g",
    },
    allergens: ["Hải sản", "Đậu nành"],
    preparationTime: "20 phút",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    isAvailable: true,
    isSpecial: true,
    rating: 4.9,
    reviews: 156,
    relatedDishes: [1, 6, 7],
  },
  6: {
    id: 6,
    name: "Bún chả Hà Nội",
    category: "Món chính",
    price: 75000,
    description: "Bún chả truyền thống kiểu Hà Nội với thịt lợn nướng, bún và nước mắm pha chua ngọt đặc trưng.",
    ingredients: ["Bún", "Thịt lợn", "Rau sống", "Nước mắm", "Gia vị"],
    nutritionInfo: {
      calories: 490,
      protein: "22g",
      carbs: "60g",
      fat: "14g",
    },
    allergens: ["Đậu nành"],
    preparationTime: "15 phút",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    isAvailable: true,
    isSpecial: true,
    rating: 4.7,
    reviews: 112,
    relatedDishes: [1, 3, 7],
  },
  7: {
    id: 7,
    name: "Bánh xèo",
    category: "Món chính",
    price: 80000,
    description: "Bánh xèo giòn với nhân tôm, thịt, giá đỗ, được ăn kèm với rau sống và nước mắm pha.",
    ingredients: ["Bột gạo", "Tôm", "Thịt", "Giá đỗ", "Rau sống", "Nước mắm"],
    nutritionInfo: {
      calories: 450,
      protein: "20g",
      carbs: "55g",
      fat: "16g",
    },
    allergens: ["Hải sản", "Đậu nành"],
    preparationTime: "15 phút",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    isAvailable: true,
    isSpecial: false,
    rating: 4.5,
    reviews: 89,
    relatedDishes: [1, 2, 6],
  },
}

const DishDetailPage = () => {
  const { id } = useParams()
  const [dish, setDish] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [relatedDishes, setRelatedDishes] = useState([])

  useEffect(() => {
    
    // In a real app, you would fetch dish data from an API
    // For now, we'll use mock data
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const dishData = mockDishData[id]
      setDish(dishData)

      if (dishData && dishData.relatedDishes) {
        const related = dishData.relatedDishes.map((relId) => mockDishData[relId])
        setRelatedDishes(related)
      }

      setLoading(false)
    }, 500)
  }, [id])

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const addToCart = () => {
    if (!dish) return

    // Get current cart from localStorage
    const savedCart = localStorage.getItem("cart")
    const cart = savedCart ? JSON.parse(savedCart) : []

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === dish.id)

    if (existingItemIndex !== -1) {
      // Increment quantity if item already exists
      cart[existingItemIndex].quantity += quantity
    } else {
      // Add new item to cart
      cart.push({
        ...dish,
        quantity: quantity,
      })
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cart } }))

    // Show success message
    alert(`Đã thêm ${quantity} ${dish.name} vào giỏ hàng!`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!dish) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy món ăn</h2>
        <Link to="/menu" className="text-blue-600 hover:underline">
          Quay lại thực đơn
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back button */}
        <Link to="/menu" className="inline-flex items-center text-blue-600 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Quay lại thực đơn
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Image gallery */}
            <div className="md:w-1/2 p-4">
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden mb-4">
                <img
                  src={dish.images[selectedImage] || "/placeholder.svg"}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
                {dish.isSpecial && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Đặc biệt
                  </div>
                )}
              </div>

              {/* Thumbnail images */}
              <div className="flex space-x-2 overflow-x-auto">
                {dish.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-20 w-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                      selectedImage === index ? "border-blue-500" : "border-transparent"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${dish.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Dish details */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold mb-2">{dish.name}</h1>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 font-medium">{dish.rating}</span>
                  <span className="text-gray-500 ml-1">({dish.reviews} đánh giá)</span>
                </div>
              </div>

              <div className="text-sm text-gray-500 mb-4">
                {dish.category} • {dish.preparationTime} chuẩn bị
              </div>

              <p className="text-2xl font-bold text-blue-600 mb-6">{dish.price.toLocaleString("vi-VN")} ₫</p>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Mô tả</h2>
                <p className="text-gray-700">{dish.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Thành phần</h2>
                <div className="flex flex-wrap gap-2">
                  {dish.ingredients.map((ingredient, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Thông tin dinh dưỡng</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Calories</div>
                    <div className="font-medium">{dish.nutritionInfo.calories}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Protein</div>
                    <div className="font-medium">{dish.nutritionInfo.protein}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Carbs</div>
                    <div className="font-medium">{dish.nutritionInfo.carbs}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Fat</div>
                    <div className="font-medium">{dish.nutritionInfo.fat}</div>
                  </div>
                </div>
              </div>

              {dish.allergens.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Chứa dị ứng</h2>
                  <div className="flex flex-wrap gap-2">
                    {dish.allergens.map((allergen, index) => (
                      <span key={index} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to cart section */}
              <div className="mt-8 border-t pt-6">
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="mx-4 font-medium text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={addToCart}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Thêm vào giỏ hàng
                  </button>
                
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related dishes */}
        {relatedDishes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Món ăn liên quan</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDishes.map((relatedDish) => (
                <Link
                  to={`/menu/${relatedDish.id}`}
                  key={relatedDish.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 relative">
                    <img
                      src={relatedDish.image || "/placeholder.svg"}
                      alt={relatedDish.name}
                      className="w-full h-full object-cover"
                    />
                    {relatedDish.isSpecial && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Đặc biệt
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{relatedDish.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{relatedDish.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold">{relatedDish.price.toLocaleString("vi-VN")} ₫</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm">{relatedDish.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DishDetailPage
