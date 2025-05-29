import React, { useState, useEffect } from "react";
import {
  Coins,
  Plus,
  Search,
  Edit3,
  Trash2,
  Save,
  X,
  Settings,
  Code,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
} from "lucide-react";

// Dummy data for currencies (unchanged)
const initialCurrencies = [
  {
    id: 1,
    code: "USD",
    description: "United States Dollar",
    conversionRate: 1.0000,
    minConversionRate: 0.9800,
    maxConversionRate: 1.0200,
  },
  {
    id: 2,
    code: "EUR",
    description: "Euro",
    conversionRate: 0.8500,
    minConversionRate: 0.8300,
    maxConversionRate: 0.8700,
  },
  {
    id: 3,
    code: "GBP",
    description: "British Pound Sterling",
    conversionRate: 0.7800,
    minConversionRate: 0.7600,
    maxConversionRate: 0.8000,
  },
  {
    id: 4,
    code: "JPY",
    description: "Japanese Yen",
    conversionRate: 149.5000,
    minConversionRate: 145.0000,
    maxConversionRate: 155.0000,
  },
  {
    id: 5,
    code: "CHF",
    description: "Swiss Franc",
    conversionRate: 0.9200,
    minConversionRate: 0.9000,
    maxConversionRate: 0.9400,
  },
  {
    id: 6,
    code: "CAD",
    description: "Canadian Dollar",
    conversionRate: 1.3600,
    minConversionRate: 1.3400,
    maxConversionRate: 1.3800,
  },
  {
    id: 7,
    code: "AUD",
    description: "Australian Dollar",
    conversionRate: 1.5200,
    minConversionRate: 1.5000,
    maxConversionRate: 1.5400,
  },
  {
    id: 8,
    code: "CNY",
    description: "Chinese Yuan",
    conversionRate: 7.2500,
    minConversionRate: 7.1000,
    maxConversionRate: 7.4000,
  },
];

export default function CurrencyMaster() {
  const [currencies, setCurrencies] = useState(initialCurrencies);
  const [filteredCurrencies, setFilteredCurrencies] = useState(initialCurrencies);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    conversionRate: "",
    minConversionRate: "",
    maxConversionRate: "",
  });

  // Filter currencies based on search term (unchanged)
  useEffect(() => {
    const filtered = currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCurrencies(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, currencies]);

  // Pagination calculations (unchanged)
  const totalPages = Math.ceil(filteredCurrencies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCurrencies = filteredCurrencies.slice(startIndex,5);

  // Pagination functions (unchanged)
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

  // Handle form input changes (unchanged)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate currency rates (unchanged)
  const validateRates = () => {
    const convRate = parseFloat(formData.conversionRate);
    const minRate = parseFloat(formData.minConversionRate);
    const maxRate = parseFloat(formData.maxConversionRate);

    if (minRate >= maxRate) {
      alert("Minimum conversion rate must be less than maximum conversion rate!");
      return false;
    }

    if (convRate < minRate || convRate > maxRate) {
      alert("Conversion rate must be between minimum and maximum rates!");
      return false;
    }

    return true;
  };

  // Open modal for adding new currency (unchanged)
  const handleAdd = () => {
    setEditingCurrency(null);
    setFormData({
      code: "",
      description: "",
      conversionRate: "",
      minConversionRate: "",
      maxConversionRate: "",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing currency (unchanged)
  const handleEdit = (currency) => {
    setEditingCurrency(currency);
    setFormData({
      code: currency.code,
      description: currency.description,
      conversionRate: currency.conversionRate.toString(),
      minConversionRate: currency.minConversionRate.toString(),
      maxConversionRate: currency.maxConversionRate.toString(),
    });
    setIsModalOpen(true);
  };

  // Save currency (add or update) (unchanged)
  const handleSave = () => {
    if (!formData.code || !formData.description || !formData.conversionRate || 
        !formData.minConversionRate || !formData.maxConversionRate) {
      alert("All fields are required!");
      return;
    }

    if (!validateRates()) {
      return;
    }

    const currencyData = {
      code: formData.code.toUpperCase(),
      description: formData.description,
      conversionRate: parseFloat(formData.conversionRate),
      minConversionRate: parseFloat(formData.minConversionRate),
      maxConversionRate: parseFloat(formData.maxConversionRate),
    };

    if (editingCurrency) {
      // Update existing currency
      setCurrencies((prev) =>
        prev.map((curr) =>
          curr.id === editingCurrency.id ? { ...curr, ...currencyData } : curr
        )
      );
    } else {
      // Add new currency
      const newCurrency = {
        id: Math.max(...currencies.map((c) => c.id)) + 1,
        ...currencyData,
      };
      setCurrencies((prev) => [...prev, newCurrency]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  // Delete currency (unchanged)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this currency?")) {
      setCurrencies((prev) => prev.filter((curr) => curr.id !== id));
    }
  };

  // Cancel modal (unchanged)
  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Reset form data (unchanged)
  const resetForm = () => {
    setFormData({
      code: "",
      description: "",
      conversionRate: "",
      minConversionRate: "",
      maxConversionRate: "",
    });
  };

  // Format number for display (unchanged)
  const formatRate = (rate) => {
    return parseFloat(rate).toFixed(4);
  };

  // Get rate status color (unchanged)
  const getRateStatus = (current, min, max) => {
    const ratio = (current - min) / (max - min);
    if (ratio < 0.3) return "text-red-600 bg-red-50";
    if (ratio > 0.7) return "text-green-600 bg-green-50";
    return "text-yellow-600 bg-yellow-50";
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header (unchanged) */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Coins className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Currency Master</h1>
              <p className="text-blue-100">Bullion Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
              <BarChart3 className="w-5 h-5 text-blue-100" />
              <span className="text-sm text-blue-100">
                {currencies.length} Currencies
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="w-6 h-6 text-blue-100" />
              <span className="text-sm text-blue-100">Exchange Module</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls (unchanged) */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search currencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md placeholder-gray-400"
            />
          </div>
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Add Currency</span>
          </button>
        </div>
      </div>

      {/* Currency Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-500">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Current Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Min Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Max Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCurrencies.map((currency) => (
                <tr
                  key={currency.id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">
                        {currency.code}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {currency.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRateStatus(
                        currency.conversionRate,
                        currency.minConversionRate,
                        currency.maxConversionRate
                      )}`}
                    >
                      {formatRate(currency.conversionRate)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    <div className="flex items-center space-x-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>{formatRate(currency.minConversionRate)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{formatRate(currency.maxConversionRate)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(currency)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(currency.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Results */}
      {currentCurrencies.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Coins className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No currencies found</p>
          <p className="text-gray-400 text-sm">Try adjusting your search terms</p>
        </div>
      )}

      {/* Pagination (unchanged) */}
      {filteredCurrencies.length > itemsPerPage && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredCurrencies.length)} of{" "}
              {filteredCurrencies.length} results
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
                            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md"
                            : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:shadow-sm"
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

      {/* Modal (unchanged) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center space-x-2">
                  <Coins className="w-5 h-5" />
                  <span>{editingCurrency ? "Edit Currency" : "Add New Currency"}</span>
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency Code <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                      placeholder="e.g., USD"
                      maxLength="3"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conversion Rate <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      name="conversionRate"
                      value={formData.conversionRate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                      placeholder="1.0000"
                      step="0.0001"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full pl-10 pr-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400 resize-none"
                    placeholder="Enter currency description"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Rate <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <TrendingDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
                    <input
                      type="number"
                      name="minConversionRate"
                      value={formData.minConversionRate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                      placeholder="0.9800"
                      step="0.0001"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Rate <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
                    <input
                      type="number"
                      name="maxConversionRate"
                      value={formData.maxConversionRate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                      placeholder="1.0200"
                      step="0.0001"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex items-center justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 hover:shadow-sm"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>Save Currency</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}