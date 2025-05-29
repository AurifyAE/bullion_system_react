import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Plus,
  Search,
  Edit3,
  Trash2,
  Save,
  X,
  Settings,
  Building,
  FileText,
  TrendingUp,
} from "lucide-react";

// Dummy data for cost centers - Bullion specific
const initialCostCenters = [
  {
    id: 1,
    costCode: "GDMC",
    description: "Cost center making charge gold",
  },
  {
    id: 2,
    costCode: "REF",
    description: "Refining charges",
  },
  {
    id: 3,
    costCode: "SUMC",
    description: "Cost center making charge silver",
  },
  {
    id: 4,
    costCode: "PLMC",
    description: "Cost center making charge platinum",
  },
  {
    id: 5,
    costCode: "ASAY",
    description: "Assaying and testing charges",
  },
  {
    id: 6,
    costCode: "STOR",
    description: "Storage and vault charges",
  },
  {
    id: 7,
    costCode: "CERT",
    description: "Certification and hallmarking charges",
  },
  {
    id: 8,
    costCode: "TRAN",
    description: "Transportation and logistics charges",
  },
  {
    id: 9,
    costCode: "MELT",
    description: "Melting and casting charges",
  },
  {
    id: 10,
    costCode: "INSP",
    description: "Inspection and verification charges",
  },
];

export default function CostCenter() {
  const [costCenters, setCostCenters] = useState(initialCostCenters);
  const [filteredCostCenters, setFilteredCostCenters] =
    useState(initialCostCenters);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCostCenter, setEditingCostCenter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    costCode: "",
    description: "",
  });

  // Auto-generate cost code based on description
  const generateCostCode = (description) => {
    if (!description) return "";

    const words = description.toLowerCase().split(" ");
    let code = "";

    // Common bullion-related keywords mapping
    const keywordMap = {
      gold: "GD",
      silver: "SU",
      platinum: "PL",
      palladium: "PD",
      making: "MC",
      charge: "C",
      charges: "C",
      refining: "REF",
      refine: "REF",
      assaying: "ASAY",
      assay: "ASAY",
      testing: "TEST",
      storage: "STOR",
      vault: "VLT",
      certification: "CERT",
      hallmarking: "HALL",
      transport: "TRAN",
      logistics: "LOG",
      melting: "MELT",
      casting: "CAST",
      inspection: "INSP",
      verification: "VERIF",
      processing: "PROC",
      handling: "HAND",
    };

    // First, check for direct keyword matches
    for (const word of words) {
      if (keywordMap[word]) {
        code += keywordMap[word];
        if (code.length >= 4) break;
      }
    }

    // If code is still short, add first letters of remaining words
    if (code.length < 4) {
      for (const word of words) {
        if (!keywordMap[word] && word.length > 2) {
          code += word.charAt(0).toUpperCase();
          if (code.length >= 4) break;
        }
      }
    }

    // Ensure minimum length and capitalize
    code = code.toUpperCase();
    if (code.length < 3) {
      code = words
        .map((w) => w.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 4);
    }

    return code.substring(0, 6); // Limit to 6 characters
  };

  // Filter cost centers based on search term
  useEffect(() => {
    const filtered = costCenters.filter(
      (costCenter) =>
        costCenter.costCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        costCenter.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCostCenters(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, costCenters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCostCenters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCostCenters = filteredCostCenters.slice(startIndex, endIndex);

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
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // Auto-generate cost code when description changes (only for new entries)
      if (name === "description" && !editingCostCenter) {
        updated.costCode = generateCostCode(value);
      }

      return updated;
    });
  };

  // Open modal for adding new cost center
  const handleAdd = () => {
    setEditingCostCenter(null);
    setFormData({
      costCode: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing cost center
  const handleEdit = (costCenter) => {
    setEditingCostCenter(costCenter);
    setFormData({
      costCode: costCenter.costCode,
      description: costCenter.description,
    });
    setIsModalOpen(true);
  };

  // Save cost center (add or update)
  const handleSave = () => {
    if (!formData.costCode || !formData.description) {
      alert("Cost Code and Description are required fields!");
      return;
    }

    // Check for duplicate cost code (only when adding new or changing existing code)
    const isDuplicate = costCenters.some(
      (cc) =>
        cc.costCode.toLowerCase() === formData.costCode.toLowerCase() &&
        (!editingCostCenter || cc.id !== editingCostCenter.id)
    );

    if (isDuplicate) {
      alert("Cost Code already exists! Please use a different code.");
      return;
    }

    if (editingCostCenter) {
      // Update existing cost center
      setCostCenters((prev) =>
        prev.map((cc) =>
          cc.id === editingCostCenter.id ? { ...cc, ...formData } : cc
        )
      );
    } else {
      // Add new cost center
      const newCostCenter = {
        id: Math.max(...costCenters.map((cc) => cc.id)) + 1,
        ...formData,
      };
      setCostCenters((prev) => [...prev, newCostCenter]);
    }

    setIsModalOpen(false);
    setFormData({
      costCode: "",
      description: "",
    });
  };

  // Delete cost center
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this cost center?")) {
      setCostCenters((prev) => prev.filter((cc) => cc.id !== id));
    }
  };

  // Cancel modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      costCode: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <DollarSign className="w-8 h-8" />

            <div>
              <h1 className="text-2xl font-bold mb-1">Cost Center Master</h1>
              <p className="text-blue-100">Bullion Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
            <TrendingUp className="w-6 h-6 text-blue-100" />
            <span className="text-blue-100 font-medium">Financial Control</span>
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
              placeholder="Search cost centers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md placeholder-gray-400"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Add Cost Center</span>
          </button>
        </div>
      </div>

      {/* Cost Center List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Cost Code</span>
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
                    <Settings className="w-4 h-4" />
                    <span>Actions</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentCostCenters.length > 0 ? (
                currentCostCenters.map((costCenter, index) => (
                  <tr
                    key={costCenter.id}
                    className={`hover:bg-blue-50 transition-all duration-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <DollarSign className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-semibold">
                          {costCenter.costCode}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm text-gray-700 font-medium leading-relaxed">
                        {costCenter.description}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => handleEdit(costCenter)}
                          className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 p-3 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg"
                          title="Edit Cost Center"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(costCenter.id)}
                          className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 p-3 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg"
                          title="Delete Cost Center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-8 py-12 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="bg-gray-100 p-4 rounded-full">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="text-gray-500 text-lg font-medium">
                        No cost centers found
                      </div>
                      <div className="text-gray-400 text-sm">
                        Try adjusting your search criteria
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredCostCenters.length > itemsPerPage && (
          <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 font-medium">
                Showing{" "}
                <span className="font-bold text-gray-900">
                  {startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-bold text-gray-900">
                  {Math.min(endIndex, filteredCostCenters.length)}
                </span>{" "}
                of{" "}
                <span className="font-bold text-gray-900">
                  {filteredCostCenters.length}
                </span>{" "}
                results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
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
                          className={`px-4 py-2 text-sm font-bold rounded-xl transition-all duration-200 ${
                            currentPage === page
                              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg transform scale-105"
                              : "text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md"
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
                        <span
                          key={page}
                          className="px-3 py-2 text-gray-400 font-bold"
                        >
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
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold">
                    {editingCostCenter
                      ? "Edit Cost Center"
                      : "Add New Cost Center"}
                  </h2>
                </div>
                <button
                  onClick={handleCancel}
                  className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/10 rounded-xl"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Cost Code <span className="text-red-500">*</span>
                  {!editingCostCenter && (
                    <span className="text-xs text-blue-600 ml-2">
                      (Auto-generated)
                    </span>
                  )}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="costCode"
                    value={formData.costCode}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md placeholder-gray-400 text-gray-700 font-medium"
                    placeholder="Enter cost code (e.g., GDMC)"
                    readOnly={!editingCostCenter}
                  />
                  {!editingCostCenter && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                        AUTO
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md placeholder-gray-400 text-gray-700 font-medium resize-none"
                    placeholder="Enter detailed description of the cost center"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 bg-gray-50 rounded-b-2xl flex items-center justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 flex items-center space-x-2 font-medium shadow-sm hover:shadow-md"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
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
