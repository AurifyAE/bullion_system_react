import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, Edit3, Trash2, Code, FileText, Settings } from 'lucide-react';
import MasterModal from '../../../hooks/MasterModal';

// Dummy data for SubCategoryMaster
const initialSubCategories = [
  { id: 1, code: 'SCAT001', description: '1 oz Gold Bar' },
  { id: 2, code: 'SCAT002', description: '10 oz Gold Bar' },
  { id: 3, code: 'SCAT003', description: '1 oz Silver Coin' },
];

const SubCategoryMaster = () => {
  const [subCategories, setSubCategories] = useState(initialSubCategories);
  const [filteredSubCategories, setFilteredSubCategories] = useState(initialSubCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({ code: '', description: '' });

  // Fields configuration for the modal
  const fields = [
    { name: 'code', label: 'Code', required: true },
    { name: 'description', label: 'Description', required: true },
  ];

  // Filter subcategories based on search term
  useEffect(() => {
    const filtered = subCategories.filter(
      (subCategory) =>
        subCategory.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subCategory.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubCategories(filtered);
    setCurrentPage(1);
  }, [searchTerm, subCategories]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredSubCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubCategories = filteredSubCategories.slice(startIndex, endIndex);

  // Pagination functions
  const goToPage = (page) => setCurrentPage(page);
  const goToPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open modal for adding new subcategory
  const handleAdd = () => {
    setEditingSubCategory(null);
    setFormData({ code: '', description: '' });
    setIsModalOpen(true);
  };

  // Open modal for editing subcategory
  const handleEdit = (subCategory) => {
    setEditingSubCategory(subCategory);
    setFormData({ code: subCategory.code, description: subCategory.description });
    setIsModalOpen(true);
  };

  // Save subcategory (add or update)
  const handleSave = () => {
    if (!formData.code || !formData.description) {
      alert('Code and Description are required fields!');
      return;
    }

    if (editingSubCategory) {
      setSubCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingSubCategory.id ? { ...cat, ...formData } : cat
        )
      );
    } else {
      const newSubCategory = {
        id: subCategories.length ? Math.max(...subCategories.map((c) => c.id)) + 1 : 1,
        ...formData,
      };
      setSubCategories((prev) => [...prev, newSubCategory]);
    }

    setIsModalOpen(false);
    setFormData({ code: '', description: '' });
  };

  // Delete subcategory
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      setSubCategories((prev) => prev.filter((cat) => cat.id !== id));
    }
  };

  // Cancel modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({ code: '', description: '' });
  };

  return (
    <div className="min-h-screen w-full ">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Package className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Sub Category Master</h1>
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
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search subcategories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md placeholder-gray-400"
            />
          </div>
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>Add Sub Category</span>
          </button>
        </div>
      </div>

      {/* SubCategory List */}
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
                <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentSubCategories.length > 0 ? (
                currentSubCategories.map((subCategory) => (
                  <tr key={subCategory.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{subCategory.code}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{subCategory.description}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(subCategory)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(subCategory.id)}
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
                  <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                    No subcategories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredSubCategories.length > itemsPerPage && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredSubCategories.length)} of {filteredSubCategories.length} results
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
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
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
      <MasterModal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onSave={handleSave}
        formData={formData}
        onInputChange={handleInputChange}
        editingItem={editingSubCategory}
        entityName="SubCategoryMaster"
        fields={fields}
      />
    </div>
  );
};

export default SubCategoryMaster;