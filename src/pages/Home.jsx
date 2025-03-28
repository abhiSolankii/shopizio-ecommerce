import {
  ArrowDownNarrowWide,
  ListFilter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { errorHandler } from "../utils/handlers";
import productService from "../services/productService";
import Loader from "../components/common/Loader";
import categoryService from "../services/categoryService";

const bannerImages = [
  "/assets/carousel-images/carousel3.jpg",
  "/assets/carousel-images/carousel5.jpg",
];

// Custom Pagination Component
const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 5; // Number of page buttons to show at a time
  const halfPagesToShow = Math.floor(maxPagesToShow / 2);

  // Calculate the start and end page numbers to display
  let startPage = Math.max(1, currentPage - halfPagesToShow);
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Adjust startPage if endPage is at the maximum
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`p-2 rounded-full ${
            page === currentPage
              ? "bg-green-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

const Home = () => {
  const {
    getAllProducts,
    getProductsByCategory,
    filterProductsByPrice,
    loading,
  } = productService();
  const { getAllCategories } = categoryService();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [filters, setFilters] = useState({
    price: "",
    review: "",
    color: "",
    material: "",
    offer: "",
  });
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Number of products per page

  //fetch products from API
  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      errorHandler(error);
    }
  };
  //fetch categories from API
  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      errorHandler(error);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };

  const handleCategoryClick = (category) => {
    setFilters({
      price: "",
      review: "",
      color: "",
      material: "",
      offer: "",
    });
    setSelectedCategory(category.id === selectedCategory?.id ? null : category);
    setCurrentPage(1); // Reset to first page on category change
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle sort selection
  const handleSortChange = (option) => {
    setSortOption(option);
    setShowSort(false);
    setCurrentPage(1); // Reset to first page on sort change
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      price: "",
      review: "",
      color: "",
      material: "",
      offer: "",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  //filter by category with API
  const filterByCategory = async (category) => {
    if (category) {
      const data = await getProductsByCategory(selectedCategory?.id);
      setProducts(data);
    }
  };
  useEffect(() => {
    filterByCategory(selectedCategory);
  }, [selectedCategory]);

  //Apply filters
  const filterProductsByPriceFunc = async () => {
    if (filters.price) {
      setSelectedCategory(null);
      const [min, max] = filters.price.split("-").map(Number);
      //pass min and max to API
      const data = await filterProductsByPrice(min, max, selectedCategory?.id);
      setProducts(data);
    } else {
      fetchProducts();
    }
  };

  useEffect(() => {
    filterProductsByPriceFunc();
  }, [filters.price]);

  // Add more filter logic as needed (color, material, offer)

  // Apply sorting
  if (sortOption === "price-low-high") {
    products.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-high-low") {
    products.sort((a, b) => b.price - a.price);
  } else if (sortOption === "newest") {
    products.sort((a, b) => new Date(b.creationAt) - new Date(a.creationAt));
  }

  // Calculate total pages dynamically based on filtered products
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Reset currentPage if it exceeds the new totalPages
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  } else if (totalPages === 0 && currentPage !== 1) {
    setCurrentPage(1);
  }

  // Paginate products
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="max-w-[90%] min-h-screen mx-auto py-6">
      {/* Banner Section */}
      <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-md bg-[#FFF5E1] flex items-center justify-center">
        {bannerImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Banner ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      {/* Categories & Sort Section */}
      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-0 items-center py-6 justify-between relative">
        {/* Categories */}
        <div className="w-full ">
          {loading ? (
            <Loader size="20px" />
          ) : (
            <div className="w-full grid grid-cols-3 md:grid-cols-10 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`p-1 px-4 text-sm rounded-2xl overflow-clip hover:cursor-pointer transition-all ${
                    selectedCategory?.id === category.id
                      ? "bg-gray-400 text-white"
                      : "bg-gray-300 hover:bg-gray-400 hover:text-white"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name.slice(0, 10)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort and Filters */}
        <div className="flex items-center gap-6">
          {/* All Filters Button */}
          <div className="relative">
            <button
              className="flex items-center gap-2 text-sm border border-gray-300 p-2 px-4 rounded-4xl w-32"
              onClick={() => {
                setShowFilters(!showFilters);
                setShowSort(false);
              }}
            >
              <span>
                <ListFilter size={20} />
              </span>
              All Filters
            </button>

            {/* Filters Dropdown */}
            {showFilters && (
              <div className="absolute left-0 md:right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price Range
                    </label>
                    <select
                      name="price"
                      value={filters.price}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">All</option>
                      <option value="0-50">$0 - $50</option>
                      <option value="50-100">$50 - $100</option>
                      <option value="100-200">$100 - $200</option>
                      <option value="200+">$200+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Review
                    </label>
                    <select
                      name="review"
                      value={filters.review}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">All</option>
                      <option value="4+">4 Stars & Up</option>
                      <option value="3+">3 Stars & Up</option>
                      <option value="2+">2 Stars & Up</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Color
                    </label>
                    <select
                      name="color"
                      value={filters.color}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">All</option>
                      <option value="black">Black</option>
                      <option value="white">White</option>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Material
                    </label>
                    <select
                      name="material"
                      value={filters.material}
                      onChange={handleFilterChange}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">All</option>
                      <option value="leather">Leather</option>
                      <option value="cotton">Cotton</option>
                      <option value="plastic">Plastic</option>
                      <option value="metal">Metal</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={resetFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sort Button */}
          <div className="relative">
            <button
              className="flex items-center gap-2 text-sm border border-gray-300 p-2 px-4 rounded-4xl"
              onClick={() => {
                setShowSort(!showSort);
                setShowFilters(false);
              }}
            >
              <span>
                <ArrowDownNarrowWide size={20} />
              </span>
              Sort
            </button>

            {/* Sort Dropdown */}
            {showSort && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-10">
                <button
                  onClick={() => handleSortChange("default")}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    sortOption === "default" ? "bg-gray-100" : ""
                  }`}
                >
                  Default
                </button>
                <button
                  onClick={() => handleSortChange("price-low-high")}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    sortOption === "price-low-high" ? "bg-gray-100" : ""
                  }`}
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => handleSortChange("price-high-low")}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    sortOption === "price-high-low" ? "bg-gray-100" : ""
                  }`}
                >
                  Price: High to Low
                </button>
                <button
                  onClick={() => handleSortChange("newest")}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    sortOption === "newest" ? "bg-gray-100" : ""
                  }`}
                >
                  Newest
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Products Section */}
      <div className="pb-2 flex flex-col">
        <p className="font-semibold text-black text-2xl">
          {selectedCategory == null
            ? "Products"
            : selectedCategory.name.charAt(0).toUpperCase() +
              selectedCategory.name.slice(1)}{" "}
          For You!
        </p>
        {loading ? (
          <Loader my={32} />
        ) : (
          <div className="w-full py-4">
            {products.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg text-gray-600">No products found.</p>
              </div>
            ) : (
              <>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-y-10 gap-x-6">
                  {paginatedProducts.map((product) => (
                    <div key={product.id} className="">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="w-full flex justify-center items-center">
                    <div className="flex overflow-x-auto sm:justify-center py-10 ">
                      <CustomPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {/* Popular Categories */}
      <div className="pb-4 flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Popular Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100"
            >
              {/* Category Image */}
              <div className="w-20 h-20 mr-6">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
              </div>
              {/* Category Details */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">240 Items Available</p>
                <div className="mt-2">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
                    Explore Now
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
