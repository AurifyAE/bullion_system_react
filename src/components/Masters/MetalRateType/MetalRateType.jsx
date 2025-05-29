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
  Coins,
  TrendingUp,
  DollarSign,
  Package,
  Globe,
  Activity,
  Percent,
  Star,
  CheckCircle,
  Circle,
  Filter,
  RefreshCw,
} from "lucide-react";

// Dummy data for metal rate types
const initialMetalRateTypes = [
  {
    id: 1,
    division: "DIV001",
    code: "GOLD-24K",
    metal: "Gold",
    rateType: "Spot Rate",
    convFactGms: 31.1035,
    currency: "USD",
    status: "Active",
    currRate: 2050.25,
    posMarginMin: 2.5,
    posMarginMax: 5.0,
    addOnRate: 15.50,
    defaultRate: true,
    rate: 2065.75,
    posRateTo: 2070.75,
  },
  {
    id: 2,
    division: "DIV002",
    code: "SILVER-999",
    metal: "Silver",
    rateType: "Market Rate",
    convFactGms: 31.1035,
    currency: "USD",
    status: "Active",
    currRate: 24.85,
    posMarginMin: 1.5,
    posMarginMax: 3.0,
    addOnRate: 0.75,
    defaultRate: false,
    rate: 25.60,
    posRateTo: 25.85,
  },
  {
    id: 3,
    division: "DIV003",
    code: "PLAT-950",
    metal: "Platinum",
    rateType: "Premium Rate",
    convFactGms: 31.1035,
    currency: "USD",
    status: "Active",
    currRate: 1025.40,
    posMarginMin: 3.0,
    posMarginMax: 6.0,
    addOnRate: 25.00,
    defaultRate: false,
    rate: 1050.40,
    posRateTo: 1056.40,
  },
  {
    id: 4,
    division: "DIV001",
    code: "GOLD-22K",
    metal: "Gold",
    rateType: "Local Rate",
    convFactGms: 31.1035,
    currency: "USD",
    status: "Inactive",
    currRate: 1875.30,
    posMarginMin: 2.0,
    posMarginMax: 4.5,
    addOnRate: 12.25,
    defaultRate: false,
    rate: 1887.55,
    posRateTo: 1892.05,
  },
  {
    id: 5,
    division: "DIV002",
    code: "SILVER-925",
    metal: "Silver",  
    rateType: "Wholesale Rate",
    convFactGms: 31.1035,
    currency: "USD",
    status: "Active",
    currRate: 22.95,
    posMarginMin: 1.0,
    posMarginMax: 2.5,
    addOnRate: 0.50,
    defaultRate: false,
    rate: 23.45,
    posRateTo: 23.70,
  },
];

export default function MetalRateType() {
  const [metalRateTypes, setMetalRateTypes] = useState(initialMetalRateTypes);
  const [filteredRateTypes, setFilteredRateTypes] = useState(initialMetalRateTypes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRateType, setEditingRateType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    division: "",
    code: "",
    metal: "",
    rateType: "",
    convFactGms: "",
    currency: "",
    status: "Active",
    currRate: "",
    posMarginMin: "",
    posMarginMax: "",
    addOnRate: "",
    defaultRate: false,
  });

  // Dropdown options
  const divisionOptions = ["DIV001", "DIV002", "DIV003"];
  const metalOptions = ["Gold", "Silver", "Platinum", "Palladium"];
  const rateTypeOptions = ["Spot Rate", "Market Rate", "Premium Rate", "Local Rate", "Wholesale Rate"];
  const currencyOptions = ["USD", "EUR", "GBP", "INR"];
  const statusOptions = ["Active", "Inactive"];

  // Filter rate types based on search term and status
  useEffect(() => {
    let filtered = metalRateTypes.filter(
      (rateType) =>
        (rateType.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rateType.metal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rateType.division.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rateType.rateType.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "All" || rateType.status === statusFilter)
    );
    setFilteredRateTypes(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, metalRateTypes]);

  // Calculate derived values
  const calculateDerivedValues = (data) => {
    const rate = parseFloat(data.currRate || 0) + parseFloat(data.addOnRate || 0);
    const posRateTo = rate + parseFloat(data.posMarginMax || 0);
    return { rate, posRateTo };
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredRateTypes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRateTypes = filteredRateTypes.slice(startIndex, endIndex);

  // Pagination functions
  const goToPage = (page) => setCurrentPage(page);
  const goToPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue };
      
      // Auto-calculate derived values when relevant fields change
      if (["currRate", "addOnRate", "posMarginMax"].includes(name)) {
        const { rate, posRateTo } = calculateDerivedValues(updated);
        return { ...updated, rate, posRateTo };
      }
      
      return updated;
    });
  };

  // Open modal for adding new rate type
  const handleAdd = () => {
    setEditingRateType(null);
    setFormData({
      division: "",
      code: "",
      metal: "",
      rateType: "",
      convFactGms: "31.1035",
      currency: "USD",
      status: "Active",
      currRate: "",
      posMarginMin: "",
      posMarginMax: "",
      addOnRate: "",
      defaultRate: false,
    });
    setIsModalOpen(true);
  };

  // Open modal for editing rate type
  const handleEdit = (rateType) => {
    setEditingRateType(rateType);
    setFormData({ ...rateType });
    setIsModalOpen(true);
  };

  // Save rate type (add or update)
  const handleSave = () => {
    if (!formData.division || !formData.code || !formData.metal) {
      alert("Division, Code, and Metal are required fields!");
      return;
    }

    // Calculate final values
    const { rate, posRateTo } = calculateDerivedValues(formData);
    const finalData = { ...formData, rate, posRateTo };

    if (editingRateType) {
      // Update existing rate type
      setMetalRateTypes((prev) =>
        prev.map((rt) =>
          rt.id === editingRateType.id ? { ...rt, ...finalData } : rt
        )
      );
    } else {
      // Add new rate type
      const newRateType = {
        id: Math.max(...metalRateTypes.map((rt) => rt.id)) + 1,
        ...finalData,
      };
      setMetalRateTypes((prev) => [...prev, newRateType]);
    }

    handleCancel();
  };

  // Delete rate type
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this metal rate type?")) {
      setMetalRateTypes((prev) => prev.filter((rt) => rt.id !== id));
    }
  };

  // Toggle default rate
  const toggleDefaultRate = (id) => {
    setMetalRateTypes((prev) =>
      prev.map((rt) => ({
        ...rt,
        defaultRate: rt.id === id ? !rt.defaultRate : rt.defaultRate,
      }))
    );
  };

  // Cancel modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      division: "",
      code: "",
      metal: "",
      rateType: "",
      convFactGms: "31.1035",
      currency: "USD",
      status: "Active",
      currRate: "",
      posMarginMin: "",
      posMarginMax: "",
      addOnRate: "",
      defaultRate: false,
    });
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Coins className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Metal Rate Type Master</h1>
              <p className="text-blue-100">Bullion Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-5 h-5 text-blue-100" />
              <span className="text-sm text-blue-100">Real-time Rates</span>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="w-6 h-6 text-blue-100" />
              <span className="text-sm text-blue-100">Rate Management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by code, metal, division..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md placeholder-gray-400"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add Rate Type</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Rate Types</p>
              <p className="text-2xl font-bold text-gray-900">{metalRateTypes.length}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Rates</p>
              <p className="text-2xl font-bold text-green-600">
                {metalRateTypes.filter(rt => rt.status === "Active").length}
              </p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Default Rates</p>
              <p className="text-2xl font-bold text-yellow-600">
                {metalRateTypes.filter(rt => rt.defaultRate).length}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Metals Covered</p>
              <p className="text-2xl font-bold text-purple-600">
                {new Set(metalRateTypes.map(rt => rt.metal)).size}
              </p>
            </div>
            <Coins className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Rate Type List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Default</span>
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4" />
                    <span>Division</span>
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Code</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4" />
                    <span>Metal</span>
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Rate Type</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Current Rate</span>
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Final Rate</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">POS Rate To</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span>Status</span>
                  </div>
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentRateTypes.length > 0 ? (
                currentRateTypes.map((rateType) => (
                  <tr
                    key={rateType.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => toggleDefaultRate(rateType.id)}
                        className="text-yellow-500 hover:text-yellow-600 transition-colors"
                      >
                        {rateType.defaultRate ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {rateType.division}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {rateType.code}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      <div className="flex items-center space-x-2">
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span>{rateType.metal}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {rateType.rateType}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      <span className="font-medium">
                        ${rateType.currRate?.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-green-600">
                      ${rateType.rate?.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-purple-600">
                      ${rateType.posRateTo?.toFixed(2)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rateType.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {rateType.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(rateType)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(rateType.id)}
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
                    colSpan="10"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No metal rate types found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredRateTypes.length > itemsPerPage && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredRateTypes.length)} of{" "}
                {filteredRateTypes.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
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
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
        <div className="fixed inset-0  bg-white/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 rounded-t-lg sticky top-0">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center space-x-2">
                  <Coins className="w-5 h-5" />
                  <span>
                    {editingRateType ? "Edit Metal Rate Type" : "Add New Metal Rate Type"}
                  </span>
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
            <div className="p-6 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Division <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="division"
                      value={formData.division}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg"
                    >
                      <option value="">Select Division</option>
                      {divisionOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

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
                      placeholder="Enter rate type code"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Metal <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="metal"
                      value={formData.metal}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg"
                    >
                      <option value="">Select Metal</option>
                      {metalOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rate Type
                    </label>
                    <select
                      name="rateType"
                      value={formData.rateType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg"
                    >
                      <option value="">Select Rate Type</option>
                      {rateTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Conv Fact (GMS)
                    </label>
                    <input
                      type="number"
                      name="convFactGms"
                      value={formData.convFactGms}
                      onChange={handleInputChange}
                      step="0.0001"
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                      placeholder="31.1035"
                      />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg"
                    >
                      {currencyOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg"
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="defaultRate"
                        checked={formData.defaultRate}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Set as Default Rate
                      </span>
                    </label>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Rate
                    </label>
                    <div className="">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        name="currRate"
                        value={formData.currRate}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full pl-10 pr-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      POS Margin Min (%)
                    </label>
                    <div className="">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        name="posMarginMin"
                        value={formData.posMarginMin}
                        onChange={handleInputChange}
                        step="0.1"
                        className="w-full pl-10 pr-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                        placeholder="0.0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      POS Margin Max (%)
                    </label>
                    <div className="">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        name="posMarginMax"
                        value={formData.posMarginMax}
                        onChange={handleInputChange}
                        step="0.1"
                        className="w-full pl-10 pr-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                        placeholder="0.0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add On Rate
                    </label>
                    <div className="">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        name="addOnRate"
                        value={formData.addOnRate}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full pl-10 pr-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Calculated Values Display */}
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h3 className="text-sm font-semibold text-blue-800 mb-3">
                      Calculated Values
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-700">Final Rate:</span>
                        <span className="text-sm font-medium text-blue-900">
                          ${((parseFloat(formData.currRate) || 0) + 
                             (parseFloat(formData.addOnRate) || 0)).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-700">POS Rate To:</span>
                        <span className="text-sm font-medium text-blue-900">
                          ${(((parseFloat(formData.currRate) || 0) + 
                             (parseFloat(formData.addOnRate) || 0)) + 
                             (parseFloat(formData.posMarginMax) || 0)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                      Rate Information
                    </h3>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>• Final Rate = Current Rate + Add On Rate</p>
                      <p>• POS Rate To = Final Rate + POS Margin Max</p>
                      <p>• Conversion factor is typically 31.1035 for precious metals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>{editingRateType ? "Update" : "Save"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}