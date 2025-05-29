import React, { useState, useEffect } from "react";
import {
  Award,
  Plus,
  Search,
  Edit3,
  Trash2,
  Save,
  X,
  Settings,
  Tag,
  FileText,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Star,
  Building,
  Shield,
  Coins,
} from "lucide-react";

// Dummy data for bullion brands
const initialBrands = [
  {
    id: 1,
    brandCode: "PAMP001",
    brandName: "PAMP Suisse",
    description: "Leading Precious Metals Refinery",
    country: "Switzerland",
    refinery: "PAMP SA",
    accreditation: "LBMA Good Delivery, COMEX",
    establishedYear: 1977,
    specialization: "Gold, Silver, Platinum, Palladium",
    purity: "999.9",
    contactPerson: "Jean-Marc Ducret",
    email: "info@pamp.com",
    phone: "+41-21-693-1900",
    website: "www.pamp.com",
    status: "Active",
    logoUrl: "PAMP Logo",
    certifications: "ISO 9001, ISO 14001, LBMA",
  },
  {
    id: 2,
    brandCode: "RM002",
    brandName: "The Royal Mint",
    description: "Official UK Government Mint",
    country: "United Kingdom",
    refinery: "The Royal Mint Refinery",
    accreditation: "LBMA Good Delivery",
    establishedYear: 886,
    specialization: "Gold, Silver, Platinum",
    purity: "999.9",
    contactPerson: "Anne Jessopp",
    email: "enquiries@royalmint.com",
    phone: "+44-1443-623456",
    website: "www.royalmint.com",
    status: "Active",
    logoUrl: "Royal Mint Logo",
    certifications: "LBMA, ISO 9001",
  },
  {
    id: 3,
    brandCode: "VAL003",
    brandName: "Valcambi Suisse",
    description: "Swiss Precious Metals Refinery",
    country: "Switzerland",
    refinery: "Valcambi SA",
    accreditation: "LBMA Good Delivery, COMEX",
    establishedYear: 1961,
    specialization: "Gold, Silver, Platinum, Palladium",
    purity: "999.9",
    contactPerson: "Michael Mesaric",
    email: "info@valcambi.com",
    phone: "+41-91-695-1000",
    website: "www.valcambi.com",
    status: "Active",
    logoUrl: "Valcambi Logo",
    certifications: "LBMA, ISO 9001, COMEX",
  },
  {
    id: 4,
    brandCode: "EG004",
    brandName: "Emirates Gold",
    description: "UAE Precious Metals Company",
    country: "United Arab Emirates",
    refinery: "Emirates Gold DMCC",
    accreditation: "DMCC Approved",
    establishedYear: 1968,
    specialization: "Gold, Silver",
    purity: "999.0",
    contactPerson: "Khalid Al Rostamani",
    email: "info@emiratesgold.ae",
    phone: "+971-4-347-7788",
    website: "www.emiratesgold.ae",
    status: "Active",
    logoUrl: "Emirates Gold Logo",
    certifications: "DMCC, Dubai Gold & Jewelry Group",
  },
  {
    id: 5,
    brandCode: "UPM005",
    brandName: "Umicore Precious Metals",
    description: "Belgian Precious Metals Refinery",
    country: "Belgium",
    refinery: "Umicore Precious Metals Refining",
    accreditation: "LBMA Good Delivery",
    establishedYear: 1805,
    specialization: "Gold, Silver, Platinum, Palladium, Rhodium",
    purity: "999.9",
    contactPerson: "Marc Grynberg",
    email: "preciousmetals@umicore.com",
    phone: "+32-2-227-7111",
    website: "www.umicore.com",
    status: "Active",
    logoUrl: "Umicore Logo",
    certifications: "LBMA, ISO 9001, ISO 14001",
  },
  {
    id: 6,
    brandCode: "ASH006",
    brandName: "Asahi Refining",
    description: "North American Precious Metals Refinery",
    country: "Canada",
    refinery: "Asahi Refining Canada Ltd",
    accreditation: "LBMA Good Delivery, COMEX",
    establishedYear: 1952,
    specialization: "Gold, Silver, Platinum, Palladium",
    purity: "999.9",
    contactPerson: "Neil Harby",
    email: "info@asahirefining.com",
    phone: "+1-801-364-1000",
    website: "www.asahirefining.com",
    status: "Active",
    logoUrl: "Asahi Logo",
    certifications: "LBMA, COMEX, ISO 9001",
  },
  {
    id: 7,
    brandCode: "HER007",
    brandName: "Heraeus Precious Metals",
    description: "German Technology & Precious Metals Group",
    country: "Germany",
    refinery: "Heraeus Precious Metals GmbH",
    accreditation: "LBMA Good Delivery",
    establishedYear: 1851,
    specialization: "Gold, Silver, Platinum, Palladium",
    purity: "999.9",
    contactPerson: "Frank Heinricht",
    email: "info@heraeus.com",
    phone: "+49-6181-35-0",
    website: "www.heraeus.com",
    status: "Active",
    logoUrl: "Heraeus Logo",
    certifications: "LBMA, ISO 9001, ISO 14001",
  },
];

export default function BrandMaster() {
  const [brands, setBrands] = useState(initialBrands);
  const [filteredBrands, setFilteredBrands] = useState(initialBrands);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    brandCode: "",
    brandName: "",
    description: "",
    country: "",
    refinery: "",
    accreditation: "",
    establishedYear: "",
    specialization: "",
    purity: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    status: "Active",
    logoUrl: "",
    certifications: "",
  });

  // Filter brands based on search term
  useEffect(() => {
    const filtered = brands.filter(
      (brand) =>
        brand.brandCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBrands(filtered);
    setCurrentPage(1);
  }, [searchTerm, brands]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBrands = filteredBrands.slice(startIndex, endIndex);

  // Pagination functions
  const goToPage = (page) => setCurrentPage(page);
  const goToPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      brandCode: "",
      brandName: "",
      description: "",
      country: "",
      refinery: "",
      accreditation: "",
      establishedYear: "",
      specialization: "",
      purity: "",
      contactPerson: "",
      email: "",
      phone: "",
      website: "",
      status: "Active",
      logoUrl: "",
      certifications: "",
    });
  };

  // Open modal for adding new brand
  const handleAdd = () => {
    setEditingBrand(null);
    resetFormData();
    setIsModalOpen(true);
  };

  // Open modal for editing brand
  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setFormData({ ...brand });
    setIsModalOpen(true);
  };

  // Save brand (add or update)
  const handleSave = () => {
    if (!formData.brandCode || !formData.brandName) {
      alert("Brand Code and Brand Name are required fields!");
      return;
    }

    if (editingBrand) {
      setBrands((prev) =>
        prev.map((brand) =>
          brand.id === editingBrand.id ? { ...brand, ...formData } : brand
        )
      );
    } else {
      const newBrand = {
        id: Math.max(...brands.map((b) => b.id)) + 1,
        ...formData,
        establishedYear: parseInt(formData.establishedYear) || 0,
      };
      setBrands((prev) => [...prev, newBrand]);
    }

    setIsModalOpen(false);
    resetFormData();
  };

  // Delete brand
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      setBrands((prev) => prev.filter((brand) => brand.id !== id));
    }
  };

  // Cancel modal
  const handleCancel = () => {
    setIsModalOpen(false);
    resetFormData();
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Brand Master</h1>
              <p className="text-blue-100">Bullion Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Settings className="w-6 h-6 text-blue-100" />
            <span className="text-sm text-blue-100">Brand Management</span>
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
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md placeholder-gray-400"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add Brand</span>
          </button>
        </div>
      </div>

      {/* Brand List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4" />
                    <span>Brand Code</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>Brand Name</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Country</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4" />
                    <span>Specialization</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Purity</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Status</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentBrands.length > 0 ? (
                currentBrands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {brand.brandCode}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {brand.brandName}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-xs">
                          {brand.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{brand.country}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex flex-wrap gap-1">
                        {brand.specialization.split(', ').slice(0, 2).map((metal, index) => (
                          <span
                            key={index}
                            className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs"
                          >
                            {metal}
                          </span>
                        ))}
                        {brand.specialization.split(', ').length > 2 && (
                          <span className="text-xs text-gray-500">+{brand.specialization.split(', ').length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {brand.purity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          brand.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {brand.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(brand)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-full transition-all duration-200"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(brand.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
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
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-medium">No brands found</p>
                    <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredBrands.length > itemsPerPage && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredBrands.length)} of{" "}
                {filteredBrands.length} results
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
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 rounded-t-lg sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>{editingBrand ? "Edit Brand" : "Add New Brand"}</span>
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-white hover:text-gray-200 transition-colors hover:bg-white hover:bg-opacity-20 p-1 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="brandCode"
                      value={formData.brandCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                      placeholder="Enter brand code"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="brandName"
                      value={formData.brandName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                      placeholder="Enter brand name"
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
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                      placeholder="Enter description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                      placeholder="Enter country"
                    />
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
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Refinery & Certification */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Refinery & Certification</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Refinery Name
                    </label>
                    <input
                      type="text"
                      name="refinery"
                      value={formData.refinery}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                      placeholder="Enter refinery name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Accreditation
                    </label>
                    <input
                      type="text"
                      name="accreditation"
                      value={formData.accreditation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                      placeholder="Enter accreditation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Established Year
                    </label>
                    <input
                      type="number"
                      name="establishedYear"
                      value={formData.establishedYear}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                      placeholder="Enter established year"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                     placeholder="e.g., Gold, Silver, Platinum"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purity
                    </label>
                    <input
                      type="text"
                      name="purity"
                      value={formData.purity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                      placeholder="e.g., 999.9"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certifications
                    </label>
                    <input
                      type="text"
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                      placeholder="e.g., ISO 9001, LBMA"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Contact Person</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                        placeholder="Enter contact person name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </div>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                        placeholder="Enter email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Phone</span>
                        </div>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4" />
                          <span>Website</span>
                        </div>
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                        placeholder="Enter website URL"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span>Logo URL</span>
                        </div>
                      </label>
                      <input
                        type="url"
                        name="logoUrl"
                        value={formData.logoUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-none outline-none rounded-xl focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400"
                        placeholder="Enter logo URL"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex items-center justify-end space-x-3 border-t">
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
                <span>{editingBrand ? "Update Brand" : "Save Brand"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}