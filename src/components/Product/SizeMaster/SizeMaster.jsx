import React, { useState, useEffect } from "react";
import {
  Ruler,
  Plus,
  Search,
  Edit3,
  Trash2,
  Save,
  X,
  Settings,
  Code,
  FileText,
  Weight,
  Coins,
  Package2,
  Hash,
} from "lucide-react";

// Dummy data for sizes (Gold Bullion Products)
const initialSizes = [
  {
    id: 1,
    code: "SIZE001",
    description: "1 Gram Gold Bar",
    weight: "1.00",
    unit: "Gram",
    category: "Gold Bar",
    standardSize: true,
    tolerance: "±0.01",
    marketCode: "1G-GOLD",
  },
  {
    id: 2,
    code: "SIZE002",
    description: "5 Gram Gold Bar",
    weight: "5.00",
    unit: "Gram",
    category: "Gold Bar",
    standardSize: true,
    tolerance: "±0.05",
    marketCode: "5G-GOLD",
  },
  {
    id: 3,
    code: "SIZE003",
    description: "10 Gram Gold Bar",
    weight: "10.00",
    unit: "Gram",
    category: "Gold Bar",
    standardSize: true,
    tolerance: "±0.10",
    marketCode: "10G-GOLD",
  },
  {
    id: 4,
    code: "SIZE004",
    description: "1 Tola Gold Bar",
    weight: "11.66",
    unit: "Gram",
    category: "Gold Bar",
    standardSize: true,
    tolerance: "±0.12",
    marketCode: "1T-GOLD",
  },
  {
    id: 5,
    code: "SIZE005",
    description: "50 Gram Gold Bar",
    weight: "50.00",
    unit: "Gram",
    category: "Gold Bar",
    standardSize: true,
    tolerance: "±0.50",
    marketCode: "50G-GOLD",
  },
  {
    id: 6,
    code: "SIZE006",
    description: "100 Gram Gold Bar",
    weight: "100.00",
    unit: "Gram",
    category: "Gold Bar",
    standardSize: true,
    tolerance: "±1.00",
    marketCode: "100G-GOLD",
  },
  {
    id: 7,
    code: "SIZE007",
    description: "1 Ounce Gold Coin",
    weight: "31.10",
    unit: "Gram",
    category: "Gold Coin",
    standardSize: true,
    tolerance: "±0.31",
    marketCode: "1OZ-COIN",
  },
  {
    id: 8,
    code: "SIZE008",
    description: "500 Gram Gold Bar",
    weight: "500.00",
    unit: "Gram",
    category: "Gold Bar",
    standardSize: true,
    tolerance: "±5.00",
    marketCode: "500G-GOLD",
  },
];

export default function SizeMaster() {
  const [sizes, setSizes] = useState(initialSizes);
  const [filteredSizes, setFilteredSizes] = useState(initialSizes);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSize, setEditingSize] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    weight: "",
    unit: "Gram",
    category: "Gold Bar",
    standardSize: true,
    tolerance: "",
    marketCode: "",
  });

  // Filter sizes based on search term
  useEffect(() => {
    const filtered = sizes.filter(
      (size) =>
        size.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        size.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        size.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        size.marketCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSizes(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, sizes]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredSizes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSizes = filteredSizes.slice(startIndex, endIndex);

  // Pagination functions
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Open modal for adding new size
  const handleAdd = () => {
    setEditingSize(null);
    setFormData({
      code: "",
      description: "",
      weight: "",
      unit: "Gram",
      category: "Gold Bar",
      standardSize: true,
      tolerance: "",
      marketCode: "",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing size
  const handleEdit = (size) => {
    setEditingSize(size);
    setFormData({
      code: size.code,
      description: size.description,
      weight: size.weight,
      unit: size.unit,
      category: size.category,
      standardSize: size.standardSize,
      tolerance: size.tolerance,
      marketCode: size.marketCode,
    });
    setIsModalOpen(true);
  };

  // Save size (add or update)
  const handleSave = () => {
    if (!formData.code || !formData.description || !formData.weight) {
      alert("Code, Description, and Weight are required fields!");
      return;
    }

    if (editingSize) {
      // Update existing size
      setSizes((prev) =>
        prev.map((size) =>
          size.id === editingSize.id ? { ...size, ...formData } : size
        )
      );
    } else {
      // Add new size
      const newSize = {
        id: Math.max(...sizes.map((s) => s.id)) + 1,
        ...formData,
      };
      setSizes((prev) => [...prev, newSize]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  // Delete size
  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this size configuration?")
    ) {
      setSizes((prev) => prev.filter((size) => size.id !== id));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      code: "",
      description: "",
      weight: "",
      unit: "Gram",
      category: "Gold Bar",
      standardSize: true,
      tolerance: "",
      marketCode: "",
    });
  };

  // Cancel modal
  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Ruler className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Size Master</h1>
              <p className="text-blue-100">Bullion Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
              <Coins className="w-5 h-5 text-yellow-200" />
              <span className="text-sm text-blue-100">Gold Products</span>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="w-6 h-6 text-blue-100" />
              <span className="text-sm text-blue-100">Size Configuration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search sizes, codes, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md placeholder-gray-400"
            />
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Package2 className="w-4 h-4" />
              <span>Total: {filteredSizes.length}</span>
            </div>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add Size</span>
          </button>
        </div>
      </div>

      {/* Size List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4" />
                    <span>Code</span>
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
                    <Weight className="w-4 h-4" />
                    <span>Weight</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Package2 className="w-4 h-4" />
                    <span>Category</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Tolerance
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4" />
                    <span>Market Code</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentSizes.length > 0 ? (
                currentSizes.map((size) => (
                  <tr
                    key={size.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-semibold">
                        {size.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center space-x-2">
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span>{size.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">
                        {size.weight} {size.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          size.category === "Gold Bar"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {size.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="text-red-600 font-mono text-xs">
                        {size.tolerance}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-mono">
                        {size.marketCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          size.standardSize
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {size.standardSize ? "Standard" : "Custom"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(size)}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                          title="Edit Size"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(size.id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                          title="Delete Size"
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
                    colSpan="8"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Ruler className="w-12 h-12 text-gray-300" />
                      <p className="text-lg font-medium">No sizes found</p>
                      <p className="text-sm">
                        Try adjusting your search criteria
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredSizes.length > itemsPerPage && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredSizes.length)} of{" "}
                {filteredSizes.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
                      (page === currentPage - 2 && currentPage > 3) ||
                      (page === currentPage + 2 && currentPage < totalPages - 2)
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
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Ruler className="w-6 h-6" />
                  <h2 className="text-xl font-semibold">
                    {editingSize ? "Edit Size Configuration" : "Add New Size"}
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
            <div className="p-6 space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size Code <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md placeholder-gray-400"
                      placeholder="e.g., SIZE001"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Market Code <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="marketCode"
                      value={formData.marketCode}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md placeholder-gray-400"
                      placeholder="e.g., 10G-GOLD"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md placeholder-gray-400 resize-none"
                    placeholder="Enter detailed description of the size"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md placeholder-gray-400"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md"
                  >
                    <option value="Gram">Gram</option>
                    <option value="Kilogram">Kilogram</option>
                    <option value="Ounce">Ounce</option>
                    <option value="Tola">Tola</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tolerance
                  </label>
                  <input
                    type="text"
                    name="tolerance"
                    value={formData.tolerance}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md placeholder-gray-400"
                    placeholder="±0.01"
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="relative">
                    <Package2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md appearance-none"
                    >
                      <option value="Gold Bar">Gold Bar</option>
                      <option value="Gold Coin">Gold Coin</option>
                      <option value="Gold Jewelry">Gold Jewelry</option>
                      <option value="Gold Ingot">Gold Ingot</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="standardSize"
                      name="standardSize"
                      type="checkbox"
                      checked={formData.standardSize}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="standardSize"
                      className="font-medium text-gray-700"
                    >
                      Standard Size
                    </label>
                    <p className="text-gray-500">
                      Mark as industry standard size
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex items-center justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
