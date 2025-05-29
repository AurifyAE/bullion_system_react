import React, { useState, useEffect } from "react";
import {
  Palette,
  Plus,
  Search,
  Edit3,
  Trash2,
  Save,
  X,
  Settings,
  Hash,
  FileText,
  Eye,
  Sparkles,
  Crown,
  Gem,
} from "lucide-react";

// Dummy data for colors with gold bullion context
const initialColors = [
  {
    id: 1,
    code: "GOL001",
    name: "Pure Gold",
    description: "24K Pure Gold Standard",
    hexCode: "#FFD700",
    rgbCode: "255, 215, 0",
    purity: "24K",
    category: "Premium",
    isActive: true,
  },
  {
    id: 2,
    code: "GOL002",
    name: "Rose Gold",
    description: "18K Rose Gold Alloy",
    hexCode: "#E8B4B8",
    rgbCode: "232, 180, 184",
    purity: "18K",
    category: "Alloy",
    isActive: true,
  },
  {
    id: 3,
    code: "GOL003",
    name: "White Gold",
    description: "18K White Gold Premium",
    hexCode: "#F5F5DC",
    rgbCode: "245, 245, 220",
    purity: "18K",
    category: "Premium",
    isActive: true,
  },
  {
    id: 4,
    code: "GOL004",
    name: "Yellow Gold",
    description: "22K Traditional Yellow Gold",
    hexCode: "#FFCC00",
    rgbCode: "255, 204, 0",
    purity: "22K",
    category: "Traditional",
    isActive: true,
  },
  {
    id: 5,
    code: "GOL005",
    name: "Antique Gold",
    description: "Vintage Finish Gold",
    hexCode: "#CD7F32",
    rgbCode: "205, 127, 50",
    purity: "20K",
    category: "Vintage",
    isActive: false,
  },
  {
    id: 6,
    code: "GOL006",
    name: "Champagne Gold",
    description: "Elegant Champagne Finish",
    hexCode: "#F7E7CE",
    rgbCode: "247, 231, 206",
    purity: "18K",
    category: "Luxury",
    isActive: true,
  },
];

const categoryIcons = {
  Premium: Crown,
  Alloy: Gem,
  Traditional: Sparkles,
  Vintage: Settings,
  Luxury: Palette,
};

export default function ColorMaster() {
  const [colors, setColors] = useState(initialColors);
  const [filteredColors, setFilteredColors] = useState(initialColors);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingColor, setEditingColor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    hexCode: "#FFD700",
    rgbCode: "",
    purity: "",
    category: "Premium",
    isActive: true,
  });

  // Filter colors based on search term
  useEffect(() => {
    const filtered = colors.filter(
      (color) =>
        color.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        color.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        color.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        color.purity.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredColors(filtered);
    setCurrentPage(1);
  }, [searchTerm, colors]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredColors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentColors = filteredColors.slice(startIndex, endIndex);

  // Pagination functions
  const goToPage = (page) => setCurrentPage(page);
  const goToPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `${r}, ${g}, ${b}`;
    }
    return "";
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "hexCode" && { rgbCode: hexToRgb(value) }),
    }));
  };

  // Open modal for adding new color
  const handleAdd = () => {
    setEditingColor(null);
    setFormData({
      code: "",
      name: "",
      description: "",
      hexCode: "#FFD700",
      rgbCode: "255, 215, 0",
      purity: "",
      category: "Premium",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  // Open modal for editing color
  const handleEdit = (color) => {
    setEditingColor(color);
    setFormData({ ...color });
    setIsModalOpen(true);
  };

  // Save color (add or update)
  const handleSave = () => {
    if (!formData.code || !formData.name) {
      alert("Code and Name are required fields!");
      return;
    }

    // Check for duplicate codes
    const isDuplicate = colors.some(
      (color) =>
        color.code === formData.code &&
        (!editingColor || color.id !== editingColor.id)
    );

    if (isDuplicate) {
      alert("Color code already exists!");
      return;
    }

    if (editingColor) {
      setColors((prev) =>
        prev.map((color) =>
          color.id === editingColor.id ? { ...color, ...formData } : color
        )
      );
    } else {
      const newColor = {
        id: Math.max(...colors.map((c) => c.id)) + 1,
        ...formData,
      };
      setColors((prev) => [...prev, newColor]);
    }

    handleCancel();
  };

  // Delete color
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this color?")) {
      setColors((prev) => prev.filter((color) => color.id !== id));
    }
  };

  // Cancel modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      code: "",
      name: "",
      description: "",
      hexCode: "#FFD700",
      rgbCode: "",
      purity: "",
      category: "Premium",
      isActive: true,
    });
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Palette className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Color Master</h1>
              <p className="text-blue-100">Bullion Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-blue-100" />
            <span className="text-sm text-blue-100">Gold Color Standards</span>
          </div>
        </div>
      </div>

 

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search colors, codes, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md placeholder-gray-400"
            />
          </div>

          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            <span>Add Color</span>
          </button>
        </div>
      </div>

      {/* Color List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4" />
                    <span>Code</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Palette className="w-4 h-4" />
                    <span>Color</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Description</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Purity
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentColors.length > 0 ? (
                currentColors.map((color) => {
                  const CategoryIcon = categoryIcons[color.category] || Palette;
                  return (
                    <tr
                      key={color.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {color.code}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm"
                            style={{ backgroundColor: color.hexCode }}
                          ></div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {color.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {color.hexCode} • RGB({color.rgbCode})
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                        {color.description}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          {color.purity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <CategoryIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            {color.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            color.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {color.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(color)}
                            className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                            title="Edit Color"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(color.id)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                            title="Delete Color"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Palette className="w-12 h-12 text-gray-300" />
                      <p>No colors found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredColors.length > itemsPerPage && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredColors.length)} of{" "}
                {filteredColors.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md"
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
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Palette className="w-6 h-6" />
                  <h2 className="text-xl font-semibold">
                    {editingColor ? "Edit Color" : "Add New Color"}
                  </h2>
                </div>
                <button
                  onClick={handleCancel}
                  className="text-white hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                      placeholder="Enter color code (e.g., GOL001)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                      placeholder="Enter color name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 resize-none"
                      placeholder="Enter color description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purity
                    </label>
                    <select
                      name="purity"
                      value={formData.purity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                    >
                      <option value="">Select Purity</option>
                      <option value="24K">24K</option>
                      <option value="22K">22K</option>
                      <option value="20K">20K</option>
                      <option value="18K">18K</option>
                      <option value="14K">14K</option>
                      <option value="10K">10K</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color Preview
                    </label>
                    <div className="flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl">
                      <div
                        className="w-16 h-16 rounded-xl border-2 border-gray-300 shadow-md"
                        style={{ backgroundColor: formData.hexCode }}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {formData.name || "Color Name"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formData.hexCode}
                        </p>
                        <p className="text-xs text-gray-500">
                          RGB({formData.rgbCode})
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hex Code
                    </label>
                    <input
                      type="color"
                      name="hexCode"
                      value={formData.hexCode}
                      onChange={handleInputChange}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl cursor-pointer"
                    />
                    <input
                      type="text"
                      name="hexCode"
                      value={formData.hexCode}
                      onChange={handleInputChange}
                      className="w-full mt-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                      placeholder="#FFD700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RGB Code
                    </label>
                    <input
                      type="text"
                      name="rgbCode"
                      value={formData.rgbCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                      placeholder="255, 215, 0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                    >
                      <option value="Premium">Premium</option>
                      <option value="Alloy">Alloy</option>
                      <option value="Traditional">Traditional</option>
                      <option value="Vintage">Vintage</option>
                      <option value="Luxury">Luxury</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-4 focus:ring-blue-100"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Active Color
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex items-center justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 font-medium"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Color</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
