import React, { useState, useEffect } from "react";
import {
  Package,
  Plus,
  Search,
  Edit3,
  Trash2,
  Save,
  X,
  Settings,
  Code,
  FileText,
  DollarSign,
  Gem,
  Building2,
  Star,
  Filter,
  Eye,
  Download,
  Upload,
  ShoppingCart,
  Target,
  Layers,
  Globe,
  Palette,
  Info,
} from "lucide-react";

// Karat to purity mapping
const karatToPurity = {
  "24K": 99.9,
  "22K": 91.6,
  "21K": 87.5,
  "18K": 75.0,
  "14K": 58.3,
  "10K": 41.7,
  "9K": 37.5,
  Silver: 92.5,
  Platinum: 95.0,
};

// Dummy data for metal stock
const initialMetalStock = [
  {
    id: 1,
    division: "DIV001",
    itemCode: "GOLD-001",
    description: "Gold Ring Premium",
    karatCode: "22K",
    typeCode: "RING",
    price1: 5850.0,
    price2: 5900.0,
    price3: 5950.0,
    metalType: "Gold",
    code: "AU-001",
    branch: "Main Branch",
    karat: "22K",
    std: 91.6,
    purity: 91.6,
    makingCharge: 500.0,
    charges: 100.0,
    unit: "Gram",
    parent: "Jewelry",
    modelCode: "GR-001",
    costCenter: "CC001",
    metal: "Gold",
    category: "Ring",
    type: "Premium",
    design: "Classic",
    vendor: "VEN-001",
    hsn: "71131900",
    hsMaster: "Jewelry-Gold",
    subCategory: "Wedding Ring",
    brand: "Premium Gold",
    country: "India",
    size: "18",
    color: "Yellow",
    vendorRef: "VR-001",
  },
  {
    id: 2,
    division: "DIV002",
    itemCode: "SILVER-001",
    description: "Silver Necklace Elegant",
    karatCode: "Silver",
    typeCode: "NECKLACE",
    price1: 850.0,
    price2: 900.0,
    price3: 950.0,
    metalType: "Silver",
    code: "AG-001",
    branch: "Branch 2",
    karat: "Silver",
    std: 92.5,
    purity: 92.5,
    makingCharge: 200.0,
    charges: 50.0,
    unit: "Gram",
    parent: "Jewelry",
    modelCode: "SN-001",
    costCenter: "CC002",
    metal: "Silver",
    category: "Necklace",
    type: "Elegant",
    design: "Modern",
    vendor: "VEN-002",
    hsn: "71131100",
    hsMaster: "Jewelry-Silver",
    subCategory: "Chain Necklace",
    brand: "Silver Elite",
    country: "India",
    size: "20 inch",
    color: "Silver",
    vendorRef: "VR-002",
  },
  {
    id: 3,
    division: "DIV003",
    itemCode: "PLAT-001",
    description: "Platinum Earrings Luxury",
    karatCode: "Platinum",
    typeCode: "EARRING",
    price1: 12500.0,
    price2: 12800.0,
    price3: 13000.0,
    metalType: "Platinum",
    code: "PT-001",
    branch: "Luxury Branch",
    karat: "Platinum",
    std: 95.0,
    purity: 95.0,
    makingCharge: 1500.0,
    charges: 300.0,
    unit: "Gram",
    parent: "Jewelry",
    modelCode: "PE-001",
    costCenter: "CC003",
    metal: "Platinum",
    category: "Earring",
    type: "Luxury",
    design: "Contemporary",
    vendor: "VEN-003",
    hsn: "71159000",
    hsMaster: "Jewelry-Platinum",
    subCategory: "Stud Earring",
    brand: "Platinum Prestige",
    country: "India",
    size: "Medium",
    color: "White",
    vendorRef: "VR-003",
  },
];

export default function MetalStock() {
  const [metalStock, setMetalStock] = useState(initialMetalStock);
  const [filteredStock, setFilteredStock] = useState(initialMetalStock);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [viewMode, setViewMode] = useState("compact"); // compact or detailed
  const [filterBy, setFilterBy] = useState("all");

  const [formData, setFormData] = useState({
    division: "",
    itemCode: "",
    description: "",
    karatCode: "",
    typeCode: "",
    price1: "",
    price2: "",
    price3: "",
    metalType: "",
    code: "",
    branch: "",
    karat: "",
    std: "",
    purity: "",
    makingCharge: "",
    charges: "",
    unit: "Gram",
    parent: "",
    modelCode: "",
    costCenter: "",
    metal: "",
    category: "",
    type: "",
    design: "",
    vendor: "",
    hsn: "",
    hsMaster: "",
    subCategory: "",
    brand: "",
    country: "India",
    size: "",
    color: "",
    vendorRef: "",
  });

  // Filter stock based on search term
  useEffect(() => {
    let filtered = metalStock.filter(
      (stock) =>
        stock.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.metalType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.division.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterBy !== "all") {
      filtered = filtered.filter(
        (stock) => stock.metalType.toLowerCase() === filterBy.toLowerCase()
      );
    }

    setFilteredStock(filtered);
    setCurrentPage(1);
  }, [searchTerm, metalStock, filterBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredStock.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStock = filteredStock.slice(startIndex, endIndex);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = {
      ...formData,
      [name]: value,
    };

    // Auto-update std purity when karat is selected
    if (name === "karat" || name === "karatCode") {
      const purity = karatToPurity[value] || "";
      updatedFormData = {
        ...updatedFormData,
        std: purity,
        purity: purity,
        karat: value,
        karatCode: value,
      };
    }

    setFormData(updatedFormData);
  };

  // Open modal for adding new stock
  const handleAdd = () => {
    setEditingStock(null);
    setFormData({
      division: "",
      itemCode: "",
      description: "",
      karatCode: "",
      typeCode: "",
      price1: "",
      price2: "",
      price3: "",
      metalType: "",
      code: "",
      branch: "",
      karat: "",
      std: "",
      purity: "",
      makingCharge: "",
      charges: "",
      unit: "Gram",
      parent: "",
      modelCode: "",
      costCenter: "",
      metal: "",
      category: "",
      type: "",
      design: "",
      vendor: "",
      hsn: "",
      hsMaster: "",
      subCategory: "",
      brand: "",
      country: "India",
      size: "",
      color: "",
      vendorRef: "",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing stock
  const handleEdit = (stock) => {
    setEditingStock(stock);
    setFormData(stock);
    setIsModalOpen(true);
  };

  // Save stock (add or update)
  const handleSave = () => {
    if (!formData.itemCode || !formData.description || !formData.metalType) {
      alert("Item Code, Description, and Metal Type are required fields!");
      return;
    }

    if (editingStock) {
      setMetalStock((prev) =>
        prev.map((stock) =>
          stock.id === editingStock.id ? { ...stock, ...formData } : stock
        )
      );
    } else {
      const newStock = {
        id: Math.max(...metalStock.map((s) => s.id)) + 1,
        ...formData,
        price1: parseFloat(formData.price1) || 0,
        price2: parseFloat(formData.price2) || 0,
        price3: parseFloat(formData.price3) || 0,
        makingCharge: parseFloat(formData.makingCharge) || 0,
        charges: parseFloat(formData.charges) || 0,
        std: parseFloat(formData.std) || 0,
        purity: parseFloat(formData.purity) || 0,
      };
      setMetalStock((prev) => [...prev, newStock]);
    }

    setIsModalOpen(false);
  };

  // Delete stock
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this metal stock?")) {
      setMetalStock((prev) => prev.filter((stock) => stock.id !== id));
    }
  };

  // Cancel modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Pagination functions
  const goToPage = (page) => setCurrentPage(page);
  const goToPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl p-6 mb-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <Package className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Metal Stock Management</h1>
              <p className="text-blue-100">Bullion Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">
              Professional Edition
            </span>
            <Settings className="w-6 h-6 cursor-pointer hover:text-blue-200" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white/90 rounded-xl p-4 sm:p-6 mb-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search metal stock..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="pl-10 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-300 transition-all"
              >
                <option value="all">All Metals</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="platinum">Platinum</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            {/* <button
              onClick={() =>
                setViewMode(viewMode === "compact" ? "detailed" : "compact")
              }
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              {viewMode === "compact" ? "Detailed" : "Compact"} View
            </button> */}
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Metal Stock
            </button>
          </div>
        </div>
      </div>

      {/* Stock List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4" />
                    <span>Division</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4" />
                    <span>Item Code</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Description</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Gem className="w-4 h-4" />
                    <span>Karat</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>Type</span>
                  </div>
                </th>
                
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Price 1</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Price 2</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {currentStock.length > 0 ? (
                currentStock.map((stock) => (
                  <tr
                    key={stock.id}
                    className="hover:bg-blue-50/50 transition-all duration-200 group"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-semibold">
                        {stock.division}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {stock.itemCode}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                      <div className="truncate" title={stock.description}>
                        {stock.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-xs font-semibold">
                        {stock.karatCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-xs font-semibold">
                        {stock.typeCode}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">
                      ₹{stock.price1?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">
                      ₹{stock.price2?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(stock)}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-100 transition-all duration-200"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(stock.id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-100 transition-all duration-200"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={viewMode === "detailed" ? "10" : "8"}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <Package className="w-12 h-12 text-gray-300" />
                      <span className="text-lg">No metal stock found</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredStock.length > itemsPerPage && (
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-200/50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredStock.length)} of{" "}
                {filteredStock.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Previous
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                            currentPage === page
                              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-2 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto no-scrollbar">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {editingStock
                        ? "Edit Metal Stock"
                        : "Add New Metal Stock"}
                    </h2>
                    <p className="text-blue-100 text-sm">
                      Professional Bullion Management
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCancel}
                  className="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Basic Information Section */}
                <div className="lg:col-span-3 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    <span>Basic Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Division <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="division"
                        value={formData.division}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter division code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Item Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="itemCode"
                        value={formData.itemCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter item code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter description"
                      />
                    </div>
                  </div>
                </div>

                {/* Metal & Karat Information */}
                <div className="lg:col-span-3 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <Gem className="w-5 h-5 text-yellow-600" />
                    <span>Metal & Karat Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Metal Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="metalType"
                        value={formData.metalType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                      >
                        <option value="">Select Metal Type</option>
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                        <option value="Platinum">Platinum</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Karat Code
                      </label>
                      <select
                        name="karatCode"
                        value={formData.karatCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                      >
                        <option value="">Select Karat</option>
                        <option value="24K">24K</option>
                        <option value="22K">22K</option>
                        <option value="21K">21K</option>
                        <option value="18K">18K</option>
                        <option value="14K">14K</option>
                        <option value="10K">10K</option>
                        <option value="9K">9K</option>
                        <option value="Silver">Silver</option>
                        <option value="Platinum">Platinum</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Standard Purity
                      </label>
                      <input
                        type="number"
                        name="std"
                        value={formData.std}
                        onChange={handleInputChange}
                        step="0.1"
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Auto-filled"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purity %
                      </label>
                      <input
                        type="number"
                        name="purity"
                        value={formData.purity}
                        onChange={handleInputChange}
                        step="0.1"
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Auto-filled"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing Information */}
                <div className="lg:col-span-3 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span>Pricing Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price 1
                      </label>
                      <input
                        type="number"
                        name="price1"
                        value={formData.price1}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price 2
                      </label>
                      <input
                        type="number"
                        name="price2"
                        value={formData.price2}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price 3
                      </label>
                      <input
                        type="number"
                        name="price3"
                        value={formData.price3}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Making Charge
                      </label>
                      <input
                        type="number"
                        name="makingCharge"
                        value={formData.makingCharge}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Other Charges
                      </label>
                      <input
                        type="number"
                        name="charges"
                        value={formData.charges}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="lg:col-span-3 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <Package className="w-5 h-5 text-purple-600" />
                    <span>Product Details</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type Code
                      </label>
                      <input
                        type="text"
                        name="typeCode"
                        value={formData.typeCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter type code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter category"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sub Category
                      </label>
                      <input
                        type="text"
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter sub category"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter type"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Design
                      </label>
                      <input
                        type="text"
                        name="design"
                        value={formData.design}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter design"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Size
                      </label>
                      <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter size"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color
                      </label>
                      <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter color"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit
                      </label>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                      >
                        <option value="Gram">Gram</option>
                        <option value="Kilogram">Kilogram</option>
                        <option value="Piece">Piece</option>
                        <option value="Set">Set</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div className="lg:col-span-3 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span>Business Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Code
                      </label>
                      <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Branch
                      </label>
                      <input
                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter branch"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parent
                      </label>
                      <input
                        type="text"
                        name="parent"
                        value={formData.parent}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter parent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Model Code
                      </label>
                      <input
                        type="text"
                        name="modelCode"
                        value={formData.modelCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter model code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cost Center
                      </label>
                      <input
                        type="text"
                        name="costCenter"
                        value={formData.costCenter}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter cost center"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brand
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter brand"
                      />
                    </div>
                  </div>
                </div>

                {/* Vendor & Compliance */}
                <div className="lg:col-span-3 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-indigo-600" />
                    <span>Vendor & Compliance</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vendor
                      </label>
                      <input
                        type="text"
                        name="vendor"
                        value={formData.vendor}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter vendor"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vendor Reference
                      </label>
                      <input
                        type="text"
                        name="vendorRef"
                        value={formData.vendorRef}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter vendor reference"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        HSN Code
                      </label>
                      <input
                        type="text"
                        name="hsn"
                        value={formData.hsn}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter HSN code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        HS Master
                      </label>
                      <input
                        type="text"
                        name="hsMaster"
                        value={formData.hsMaster}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter HS master"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                      >
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UAE">UAE</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Switzerland">Switzerland</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Metal
                      </label>
                      <input
                        type="text"
                        name="metal"
                        value={formData.metal}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                        placeholder="Enter metal"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" backdrop-blur-sm px-8 py-6 border-t border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="text-red-500">*</span> Required fields
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingStock ? "Update Stock" : "Add Stock"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
          </div>
        </div>
      )}
      <style>
        {`
          
          .no-scrollbar {
            -ms-overflow-style: none; /* Internet Explorer and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, and Edge */
          }
        `}
      </style>
    </div>
  );
}
