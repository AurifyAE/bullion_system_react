import React from "react";
import { Edit3, Trash2, Package, FileText, DollarSign, Gem } from "lucide-react";

export default function DebtorsTable({ filteredDebtors, currentPage, itemsPerPage, setCurrentPage, handleEdit, handleDelete }) {
  const totalPages = Math.ceil(filteredDebtors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDebtors = filteredDebtors.slice(startIndex, endIndex);

  const goToPage = (page) => setCurrentPage(page);
  const goToPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4" />
                  <span>Division</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Item Code</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Description</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                <div className="flex items-center space-x-2">
                  <Gem className="w-4 h-4" />
                  <span>Karat Code</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Type Code</th>
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
              <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentDebtors.length > 0 ? (
              currentDebtors.map(debtor => (
                <tr key={debtor.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{debtor.division}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{debtor.itemCode}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{debtor.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{debtor.karatCode}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{debtor.typeCode}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{debtor.price1.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{debtor.price2.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(debtor)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(debtor.id)}
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
                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                  No trade debtors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredDebtors.length > itemsPerPage && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredDebtors.length)} of {filteredDebtors.length} results
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
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
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
                      <span key={page} className="px-2 py-2 text-gray-400">...</span>
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
  );
}