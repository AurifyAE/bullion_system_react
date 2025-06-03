import React, { useState, useEffect } from "react";
import {
  Building2,
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
  Package,
} from "lucide-react";

// Dummy data for divisions
const initialDivisions = [
  {
    id: 1,
    code: "DIV001",
    description: "Gold Trading Division",
    costCenter: "CC001",
    costCenterMeaning: "Precious Metals Trading",
    autoFixStockCode: "GOLD-AUTO",
  },
  {
    id: 2,
    code: "DIV002",
    description: "Silver Trading Division",
    costCenter: "CC002",
    costCenterMeaning: "Silver Operations",
    autoFixStockCode: "SILVER-AUTO",
  },
  {
    id: 3,
    code: "DIV003",
    description: "Platinum Division",
    costCenter: "CC003",
    costCenterMeaning: "Platinum & Palladium",
    autoFixStockCode: "PLAT-AUTO",
  },
];

export default function Division() {
  const [divisions, setDivisions] = useState(initialDivisions);
  const [filteredDivisions, setFilteredDivisions] = useState(initialDivisions);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDivision, setEditingDivision] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    costCenter: "",
    costCenterMeaning: "",
    autoFixStockCode: "",
  });

  // Filter divisions based on search term
  useEffect(() => {
    const filtered = divisions.filter(
      (division) =>
        division.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        division.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        division.costCenter.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDivisions(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, divisions]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredDivisions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDivisions = filteredDivisions.slice(startIndex, endIndex);

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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open modal for adding new division
  const handleAdd = () => {
    setEditingDivision(null);
    setFormData({
      code: "",
      description: "",
      costCenter: "",
      costCenterMeaning: "",
      autoFixStockCode: "",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing division
  const handleEdit = (division) => {
    setEditingDivision(division);
    setFormData({
      code: division.code,
      description: division.description,
      costCenter: division.costCenter,
      costCenterMeaning: division.costCenterMeaning,
      autoFixStockCode: division.autoFixStockCode,
    });
    setIsModalOpen(true);
  };

  // Save division (add or update)
  const handleSave = () => {
    if (!formData.code || !formData.description) {
      alert("Code and Description are required fields!");
      return;
    }

    if (editingDivision) {
      // Update existing division
      setDivisions((prev) =>
        prev.map((div) =>
          div.id === editingDivision.id ? { ...div, ...formData } : div
        )
      );
    } else {
      // Add new division
      const newDivision = {
        id: Math.max(...divisions.map((d) => d.id)) + 1,
        ...formData,
      };
      setDivisions((prev) => [...prev, newDivision]);
    }

    setIsModalOpen(false);
    setFormData({
      code: "",
      description: "",
      costCenter: "",
      costCenterMeaning: "",
      autoFixStockCode: "",
    });
  };

  // Delete division
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this division?")) {
      setDivisions((prev) => prev.filter((div) => div.id !== id));
    }
  };

  // Cancel modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      code: "",
      description: "",
      costCenter: "",
      costCenterMeaning: "",
      autoFixStockCode: "",
    });
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Division Master</h1>
              <p className="text-blue-100">Bullion Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Settings className="w-6 h-6 text-blue-100" />
            <span className="text-sm text-blue-100">Management Module</span>
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
              placeholder="Search divisions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md placeholder-gray-400"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>Add Division</span>
          </button>
        </div>
      </div>

      {/* Division List */}
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
                    <DollarSign className="w-4 h-4" />
                    <span>Cost Center</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Cost Center Meaning
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>Auto Fix Stock Code</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentDivisions.length > 0 ? (
                currentDivisions.map((division) => (
                  <tr
                    key={division.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {division.code}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {division.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {division.costCenter}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {division.costCenterMeaning}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {division.autoFixStockCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(division)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(division.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
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
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No divisions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredDivisions.length > itemsPerPage && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredDivisions.length)} of{" "}
                {filteredDivisions.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          className={`px-3 py-2 text-sm font-medium rounded-lg ${
                            currentPage === page
                              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
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
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {editingDivision ? "Edit Division" : "Add New Division"}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                  placeholder="Enter division code"
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
                  className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                  placeholder="Enter description"
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
                  className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                  placeholder="Enter cost center"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Center (Making)
                </label>
                <input
                  type="text"
                  name="costCenterMaking"
                  value={formData.costCenterMeaning}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                  placeholder="Enter cost center (Making)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto Fix Stock Code
                </label>
                <input
                  type="text"
                  name="autoFixStockCode"
                  value={formData.autoFixStockCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                  placeholder="Enter auto fix stock code"
                />
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
