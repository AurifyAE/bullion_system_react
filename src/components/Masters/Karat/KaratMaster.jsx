import React, { useState, useEffect } from "react";
import {
  Gem,
  Plus,
  Search,
  Edit3,
  Trash2,
  Save,
  X,
  Settings,
  Code,
  FileText,
  Target,
  ArrowDown,
  ArrowUp,
  Building2,
  Sparkles,
} from "lucide-react";

// Dummy data for karat masters
const initialKaratMasters = [
  {
    id: 1,
    karatCode: "K22",
    description: "22 Karat Gold",
    standardPurity: 91.67,
    minimum: 91.0,
    maximum: 92.5,
    division: "DIV001",
  },
  {
    id: 2,
    karatCode: "K24",
    description: "24 Karat Pure Gold",
    standardPurity: 99.99,
    minimum: 99.5,
    maximum: 100.0,
    division: "DIV001",
  },
  {
    id: 3,
    karatCode: "K18",
    description: "18 Karat Gold",
    standardPurity: 75.0,
    minimum: 74.5,
    maximum: 75.5,
    division: "DIV001",
  },
  {
    id: 4,
    karatCode: "K14",
    description: "14 Karat Gold",
    standardPurity: 58.33,
    minimum: 57.8,
    maximum: 58.8,
    division: "DIV002",
  },
  {
    id: 5,
    karatCode: "AG999",
    description: "Fine Silver 999",
    standardPurity: 99.9,
    minimum: 99.5,
    maximum: 100.0,
    division: "DIV002",
  },
  {
    id: 6,
    karatCode: "AG925",
    description: "Sterling Silver 925",
    standardPurity: 92.5,
    minimum: 92.0,
    maximum: 93.0,
    division: "DIV002",
  },
  {
    id: 7,
    karatCode: "PT950",
    description: "Platinum 950",
    standardPurity: 95.0,
    minimum: 94.5,
    maximum: 95.5,
    division: "DIV003",
  },
  {
    id: 8,
    karatCode: "PD950",
    description: "Palladium 950",
    standardPurity: 95.0,
    minimum: 94.5,
    maximum: 95.5,
    division: "DIV003",
  },
];

// Division options for dropdown
const divisionOptions = [
  { value: "DIV001", label: "Gold Trading Division" },
  { value: "DIV002", label: "Silver Trading Division" },
  { value: "DIV003", label: "Platinum Division" },
];

export default function KaratMaster() {
  const [karatMasters, setKaratMasters] = useState(initialKaratMasters);
  const [filteredKaratMasters, setFilteredKaratMasters] = useState(initialKaratMasters);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKarat, setEditingKarat] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [formData, setFormData] = useState({
    karatCode: "",
    description: "",
    standardPurity: "",
    minimum: "",
    maximum: "",
    division: "",
  });
  const [errors, setErrors] = useState({});

  // Filter karat masters based on search term
  useEffect(() => {
    const filtered = karatMasters.filter(
      (karat) =>
        karat.karatCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        karat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        karat.division.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredKaratMasters(filtered);
    setCurrentPage(1);
  }, [searchTerm, karatMasters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredKaratMasters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentKaratMasters = filteredKaratMasters.slice(startIndex, endIndex);

  // Pagination functions
  const goToPage = (page) => setCurrentPage(page);
  const goToPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.karatCode.trim()) newErrors.karatCode = "Karat Code is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.standardPurity) newErrors.standardPurity = "Standard Purity is required";
    if (!formData.minimum) newErrors.minimum = "Minimum is required";
    if (!formData.maximum) newErrors.maximum = "Maximum is required";
    if (!formData.division) newErrors.division = "Division is required";

    // Validate purity ranges
    const stdPurity = parseFloat(formData.standardPurity);
    const minPurity = parseFloat(formData.minimum);
    const maxPurity = parseFloat(formData.maximum);

    if (stdPurity && minPurity && maxPurity) {
      if (minPurity >= maxPurity) {
        newErrors.minimum = "Minimum must be less than maximum";
        newErrors.maximum = "Maximum must be greater than minimum";
      }
      if (stdPurity < minPurity || stdPurity > maxPurity) {
        newErrors.standardPurity = "Standard purity must be between minimum and maximum";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Open modal for adding new karat master
  const handleAdd = () => {
    setEditingKarat(null);
    setFormData({
      karatCode: "",
      description: "",
      standardPurity: "",
      minimum: "",
      maximum: "",
      division: "",
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing karat master
  const handleEdit = (karat) => {
    setEditingKarat(karat);
    setFormData({
      karatCode: karat.karatCode,
      description: karat.description,
      standardPurity: karat.standardPurity.toString(),
      minimum: karat.minimum.toString(),
      maximum: karat.maximum.toString(),
      division: karat.division,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Save karat master (add or update)
  const handleSave = () => {
    if (!validateForm()) return;

    const karatData = {
      ...formData,
      standardPurity: parseFloat(formData.standardPurity),
      minimum: parseFloat(formData.minimum),
      maximum: parseFloat(formData.maximum),
    };

    if (editingKarat) {
      setKaratMasters((prev) =>
        prev.map((karat) =>
          karat.id === editingKarat.id ? { ...karat, ...karatData } : karat
        )
      );
    } else {
      const newKarat = {
        id: Math.max(...karatMasters.map((k) => k.id)) + 1,
        ...karatData,
      };
      setKaratMasters((prev) => [...prev, newKarat]);
    }

    handleCancel();
  };

  // Delete karat master
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this karat master?")) {
      setKaratMasters((prev) => prev.filter((karat) => karat.id !== id));
    }
  };

  // Cancel modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      karatCode: "",
      description: "",
      standardPurity: "",
      minimum: "",
      maximum: "",
      division: "",
    });
    setErrors({});
  };

  // Get division label
  const getDivisionLabel = (divisionCode) => {
    const division = divisionOptions.find(d => d.value === divisionCode);
    return division ? division.label : divisionCode;
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Gem className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Karat Master</h1>
              <p className="text-blue-100">Bullion Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-blue-100" />
            <span className="text-sm text-blue-100">Purity Management</span>
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
              placeholder="Search karat masters..."
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
            <span>Add Karat Master</span>
          </button>
        </div>
      </div>

      {/* Karat Master List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4" />
                    <span>Karat Code</span>
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
                    <Target className="w-4 h-4" />
                    <span>Standard Purity</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <ArrowDown className="w-4 h-4" />
                    <span>Minimum</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <ArrowUp className="w-4 h-4" />
                    <span>Maximum</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4" />
                    <span>Division</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentKaratMasters.length > 0 ? (
                currentKaratMasters.map((karat) => (
                  <tr
                    key={karat.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {karat.karatCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {karat.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="font-semibold text-green-600">
                        {karat.standardPurity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="text-orange-600">
                        {karat.minimum}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="text-red-600">
                        {karat.maximum}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                        {getDivisionLabel(karat.division)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(karat)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(karat.id)}
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
                    colSpan="7"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Gem className="w-12 h-12 text-gray-300" />
                      <span>No karat masters found</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredKaratMasters.length > itemsPerPage && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredKaratMasters.length)} of{" "}
                {filteredKaratMasters.length} results
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gem className="w-6 h-6" />
                  <h2 className="text-lg font-semibold">
                    {editingKarat ? "Edit Karat Master" : "Add New Karat Master"}
                  </h2>
                </div>
                <button
                  onClick={handleCancel}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Karat Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Karat Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="karatCode"
                    value={formData.karatCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400 ${
                      errors.karatCode ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="e.g., K22, AG999"
                  />
                  {errors.karatCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.karatCode}</p>
                  )}
                </div>

                {/* Division */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Division <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg ${
                      errors.division ? 'ring-2 ring-red-500' : ''
                    }`}
                  >
                    <option value="">Select Division</option>
                    {divisionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.division && (
                    <p className="mt-1 text-sm text-red-600">{errors.division}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400 ${
                    errors.description ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="Enter detailed description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Purity Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Standard Purity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="standardPurity"
                    value={formData.standardPurity}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    max="100"
                    className={`w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400 ${
                      errors.standardPurity ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="0.00"
                  />
                  {errors.standardPurity && (
                    <p className="mt-1 text-sm text-red-600">{errors.standardPurity}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="minimum"
                    value={formData.minimum}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    max="100"
                    className={`w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400 ${
                      errors.minimum ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="0.00"
                  />
                  {errors.minimum && (
                    <p className="mt-1 text-sm text-red-600">{errors.minimum}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="maximum"
                    value={formData.maximum}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    max="100"
                    className={`w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400 ${
                      errors.maximum ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="0.00"
                  />
                  {errors.maximum && (
                    <p className="mt-1 text-sm text-red-600">{errors.maximum}</p>
                  )}
                </div>
              </div>

              {/* Purity Range Indicator */}
              {formData.minimum && formData.maximum && formData.standardPurity && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-orange-600 font-medium">
                      Min: {formData.minimum}
                    </span>
                    <span className="text-green-600 font-semibold bg-white px-3 py-1 rounded-full">
                      STD: {formData.standardPurity}
                    </span>
                    <span className="text-red-600 font-medium">
                      Max: {formData.maximum}
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 via-green-400 to-red-400"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex items-center justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2"
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