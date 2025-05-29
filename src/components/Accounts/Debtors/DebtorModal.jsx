import React, { useState, useEffect, useCallback } from "react";
import {
  User,
  Settings,
  MapPin,
  CreditCard,
  X,
  Save,
  Plus,
  Shield,
  FileText,
  Receipt,
  Building,
  TrendingUp,
} from "lucide-react";

const Header = ({ searchTerm, setSearchTerm, handleAdd }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Trade Debtors</h1>
      <div className="flex space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search debtors..."
          className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Debtor</span>
        </button>
      </div>
    </div>
  </div>
);

const DebtorsTable = ({
  filteredDebtors,
  currentPage,
  itemsPerPage,
  setCurrentPage,
  handleEdit,
  handleDelete,
}) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDebtors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDebtors.length / itemsPerPage);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Customer Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Division
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Item Code
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((debtor, index) => (
              <tr
                key={debtor.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 py-3 text-sm text-gray-600">
                  {debtor.customerName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {debtor.division}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {debtor.itemCode}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleEdit(debtor)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(debtor.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-xl disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-xl disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const EmployeeModal = ({
  isOpen,
  onClose,
  employeeForm,
  setEmployeeForm,
  editingEmployee,
  handleAddEmployee,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">
          {editingEmployee ? "Edit Employee" : "Add Employee"}
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            value={employeeForm.name || ""}
            onChange={(e) =>
              setEmployeeForm({ ...employeeForm, name: e.target.value })
            }
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl"
          />
          <input
            type="text"
            value={employeeForm.email || ""}
            onChange={(e) =>
              setEmployeeForm({ ...employeeForm, email: e.target.value })
            }
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl"
          />
          <button
            onClick={handleAddEmployee}
            className="w-full py-2 bg-blue-600 text-white rounded-xl"
          >
            {editingEmployee ? "Save" : "Add"}
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 border border-gray-300 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const BankModal = ({
  isOpen,
  onClose,
  bankForm,
  setBankForm,
  editingBank,
  handleAddBank,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">
          {editingBank ? "Edit Bank" : "Add Bank"}
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            value={bankForm.name || ""}
            onChange={(e) => setBankForm({ ...bankForm, name: e.target.value })}
            placeholder="Bank Name"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl"
          />
          <input
            type="text"
            value={bankForm.iban || ""}
            onChange={(e) => setBankForm({ ...bankForm, iban: e.target.value })}
            placeholder="IBAN"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl"
          />
          <button
            onClick={handleAddBank}
            className="w-full py-2 bg-blue-600 text-white rounded-xl"
          >
            {editingBank ? "Save" : "Add"}
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 border border-gray-300 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const BasicInfoHeader = ({
  basicFormData,
  setBasicFormData,
  titleOptions,
  modeOptions,
  documentTypes,
}) => {
  const [selectedType, setSelectedType] = useState(
    basicFormData?.type || "account"
  );

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setBasicFormData({ ...basicFormData, type });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 border border-blue-200 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Basic Information
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
          >
            <option value="account">Account</option>
            <option value="group">Group</option>
            <option value="main-ledger">Main Ledger</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <select
            value={basicFormData.title || ""}
            onChange={(e) =>
              setBasicFormData({ ...basicFormData, title: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            disabled={selectedType !== "account"}
          >
            <option value="">Select Title</option>
            {titleOptions.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mode
          </label>
          <select
            value={basicFormData.mode || ""}
            onChange={(e) =>
              setBasicFormData({ ...basicFormData, mode: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
          >
            <option value="">Select Mode</option>
            {modeOptions.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            A/c Code
          </label>
          <input
            type="text"
            value={basicFormData.acCode || ""}
            onChange={(e) =>
              setBasicFormData({ ...basicFormData, acCode: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter account code"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {selectedType === "account" ? "Customer Name" : "Group Name"}
          </label>
          <input
            type="text"
            value={basicFormData.customerName || ""}
            onChange={(e) =>
              setBasicFormData({
                ...basicFormData,
                customerName: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder={
              selectedType === "account"
                ? "Enter customer name"
                : "Enter group name"
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parent Group
          </label>
          <input
            type="text"
            value={basicFormData.parentGroup || ""}
            onChange={(e) =>
              setBasicFormData({
                ...basicFormData,
                parentGroup: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter parent group"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Classification
          </label>
          <input
            type="text"
            value={basicFormData.classification || ""}
            onChange={(e) =>
              setBasicFormData({
                ...basicFormData,
                classification: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter classification"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Name
          </label>
          <input
            type="text"
            value={basicFormData.shortName || ""}
            onChange={(e) =>
              setBasicFormData({ ...basicFormData, shortName: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter short name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Remarks
          </label>
          <input
            type="text"
            value={basicFormData.remarks || ""}
            onChange={(e) =>
              setBasicFormData({ ...basicFormData, remarks: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter remarks"
          />
        </div>
      </div>

      {selectedType !== "main-ledger" && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">
              KYC Information Required
            </span>
          </div>
          <p className="text-sm text-yellow-700">
            {selectedType === "account"
              ? "Individual KYC documents will be required for this account type."
              : "Organization KYC documents will be required for this group type."}
          </p>
        </div>
      )}
    </div>
  );
};

const AcDefinitionTab = ({
  acDefinitionData,
  setAcDefinitionData,
  currencyOptions,
  branchOptions,
  limitTypes,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(
    acDefinitionData?.currency?.currency || "AED"
  );

  const handleCurrencyChange = (e) => {
    const selected = currencyOptions.find((c) => c.currency === e.target.value);
    setSelectedCurrency(e.target.value);
    setAcDefinitionData({
      ...acDefinitionData,
      currency: selected,
    });
  };

  const handleBranchChange = (branch) => {
    setAcDefinitionData({
      ...acDefinitionData,
      branch,
    });
  };

  const handleCreditLimitChange = (field, value) => {
    setAcDefinitionData({
      ...acDefinitionData,
      creditLimit: {
        ...acDefinitionData.creditLimit,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Currency Configuration
          </h3>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Currency
          </label>
          <select
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            className="w-full md:w-1/3 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select Currency</option>
            {currencyOptions.map((curr) => (
              <option key={curr.currency} value={curr.currency}>
                {curr.currency}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-emerald-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  No
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Currency
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Sal Rate
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Pur Rate
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Default
                </th>
              </tr>
            </thead>
            <tbody>
              {currencyOptions.map((curr, index) => (
                <tr
                  key={curr.currency}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-3 text-sm text-gray-600">{curr.no}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {curr.currency}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {curr.salRate}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {curr.purRate}
                  </td>
                  <td className="px-4 py-3">
                    {curr.default && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Default
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <Building className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Branch Selection
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  No
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Branch Code
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Branch Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Select
                </th>
              </tr>
            </thead>
            <tbody>
              {branchOptions.map((branch, index) => (
                <tr
                  key={branch.branchCode}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {branch.no}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {branch.branchCode}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {branch.branchName}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="radio"
                      name="selectedBranch"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      checked={acDefinitionData.branch?.no === branch.no}
                      onChange={() => handleBranchChange(branch)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Limits & Margins
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Limit Type
            </label>
            <select
              value={acDefinitionData.creditLimit?.limitType || ""}
              onChange={(e) =>
                handleCreditLimitChange("limitType", e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Limit Type</option>
              {limitTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={acDefinitionData.creditLimit?.currency || ""}
              onChange={(e) =>
                handleCreditLimitChange("currency", e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Currency</option>
              {currencyOptions.map((curr) => (
                <option key={curr.currency} value={curr.currency}>
                  {curr.currency}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unfix Gold Gms
            </label>
            <input
              type="number"
              value={acDefinitionData.creditLimit?.unfixGold || ""}
              onChange={(e) =>
                handleCreditLimitChange(
                  "unfixGold",
                  parseFloat(e.target.value) || ""
                )
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Net Amount (L C)
            </label>
            <input
              type="number"
              value={acDefinitionData.creditLimit?.netAmount || ""}
              onChange={(e) =>
                handleCreditLimitChange(
                  "netAmount",
                  parseFloat(e.target.value) || ""
                )
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Credit Days Amt
            </label>
            <input
              type="number"
              value={acDefinitionData.creditLimit?.creditDaysAmt || ""}
              onChange={(e) =>
                handleCreditLimitChange(
                  "creditDaysAmt",
                  parseInt(e.target.value) || ""
                )
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Credit Days Mtl
            </label>
            <input
              type="number"
              value={acDefinitionData.creditLimit?.creditDaysMtl || ""}
              onChange={(e) =>
                handleCreditLimitChange(
                  "creditDaysMtl",
                  parseInt(e.target.value) || ""
                )
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Margin
            </label>
            <input
              type="number"
              step="0.01"
              value={acDefinitionData.creditLimit?.shortMargin || ""}
              onChange={(e) =>
                handleCreditLimitChange(
                  "shortMargin",
                  parseFloat(e.target.value) || ""
                )
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Long Margin
            </label>
            <input
              type="number"
              step="0.01"
              value={acDefinitionData.creditLimit?.longMargin || ""}
              onChange={(e) =>
                handleCreditLimitChange(
                  "longMargin",
                  parseFloat(e.target.value) || ""
                )
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AddressTab = ({
  addressData,
  setAddressData,
  employees,
  idTypes,
  setShowEmployeeModal,
  handleEditEmployee,
  handleDeleteEmployee,
}) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street Address
        </label>
        <textarea
          value={addressData.address || ""}
          onChange={(e) =>
            setAddressData({ ...addressData, address: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          rows="3"
          placeholder="Enter street address"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={addressData.city || ""}
          onChange={(e) =>
            setAddressData({ ...addressData, city: e.target.value })
          }
          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="City"
        />
        <input
          type="text"
          value={addressData.country || ""}
          onChange={(e) =>
            setAddressData({ ...addressData, country: e.target.value })
          }
          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Country"
        />
        <input
          type="text"
          value={addressData.zip || ""}
          onChange={(e) =>
            setAddressData({ ...addressData, zip: e.target.value })
          }
          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="ZIP Code"
        />
      </div>
    </div>
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Employees</h3>
        <button
          onClick={() => setShowEmployeeModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>
      {employees.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
          No employees added yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr
                  key={emp.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {emp.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {emp.email}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEditEmployee(emp)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(emp.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);

const VATGSTTab = ({ vatGstData, setVatGstData }) => (
  <div className="space-y-6">
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
        <Receipt className="w-5 h-5 text-blue-600" />
        <span>VAT/GST Information</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            VAT/GST Registration Number
          </label>
          <input
            type="text"
            value={vatGstData.registrationNumber || ""}
            onChange={(e) =>
              setVatGstData({
                ...vatGstData,
                registrationNumber: e.target.value,
              })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter VAT/GST number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration Type
          </label>
          <select
            value={vatGstData.registrationType || ""}
            onChange={(e) =>
              setVatGstData({ ...vatGstData, registrationType: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select registration type</option>
            <option value="Regular">Regular</option>
            <option value="Composition">Composition</option>
            <option value="Casual">Casual</option>
            <option value="Non-resident">Non-resident</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration Date
          </label>
          <input
            type="date"
            value={vatGstData.registrationDate || ""}
            onChange={(e) =>
              setVatGstData({ ...vatGstData, registrationDate: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State/Province
          </label>
          <select
            value={vatGstData.state || ""}
            onChange={(e) =>
              setVatGstData({ ...vatGstData, state: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select state/province</option>
            <option value="Dubai">Dubai</option>
            <option value="Abu Dhabi">Abu Dhabi</option>
            <option value="Sharjah">Sharjah</option>
            <option value="Al Ain">Al Ain</option>
          </select>
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload VAT/GST Certificate
        </label>
        <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
          <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <p className="text-gray-600">
            Drag & drop VAT/GST certificate here or click to browse
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Supported formats: PDF, JPG, PNG (Max 5MB)
          </p>
        </div>
      </div>
    </div>
  </div>
);

const KYCTab = ({ kycData, setKycData, selectedType = "account" }) => (
  <div className="space-y-6">
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
        <Shield className="w-5 h-5 text-blue-600" />
        <span>
          {selectedType === "account"
            ? "Individual KYC Documents"
            : "Organization KYC Documents"}
        </span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Type
          </label>
          <select
            value={kycData.documentType || ""}
            onChange={(e) =>
              setKycData({ ...kycData, documentType: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select document type</option>
            {selectedType === "account" ? (
              <>
                <option value="Passport">Passport</option>
                <option value="Driver's License">Driver's License</option>
                <option value="National ID">National ID</option>
                <option value="Emirates ID">Emirates ID</option>
              </>
            ) : (
              <>
                <option value="Trade License">Trade License</option>
                <option value="Certificate of Incorporation">
                  Certificate of Incorporation
                </option>
                <option value="Tax Registration Certificate">
                  Tax Registration Certificate
                </option>
                <option value="MOA & AOA">MOA & AOA</option>
              </>
            )}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Number
          </label>
          <input
            type="text"
            value={kycData.documentNumber || ""}
            onChange={(e) =>
              setKycData({ ...kycData, documentNumber: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter document number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Issue Date
          </label>
          <input
            type="date"
            value={kycData.issueDate || ""}
            onChange={(e) =>
              setKycData({ ...kycData, issueDate: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date
          </label>
          <input
            type="date"
            value={kycData.expiryDate || ""}
            onChange={(e) =>
              setKycData({ ...kycData, expiryDate: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Document
        </label>
        <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
          <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <p className="text-gray-600">
            Drag & drop files here or click to browse
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Supported formats: PDF, JPG, PNG (Max 5MB)
          </p>
        </div>
      </div>
    </div>
  </div>
);

const BankTab = ({
  bankDetails,
  setShowBankModal,
  handleEditBank,
  handleDeleteBank,
}) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-800">Bank Information</h3>
      <button
        onClick={() => setShowBankModal(true)}
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add Bank</span>
      </button>
    </div>
    {bankDetails.length === 0 ? (
      <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
        No bank details added yet. Click "Add Bank" to get started.
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Bank Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                IBAN
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bankDetails.map((bank, index) => (
              <tr
                key={bank.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 py-3 text-sm text-gray-600">{bank.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{bank.iban}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleEditBank(bank)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBank(bank.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default function DebtorModal({
  isOpen = true,
  onClose = () => {},
  editingDebtor = null,
  activeTab = "ac-definition",
  setActiveTab = () => {},
  basicFormData = { type: "account" },
  setBasicFormData = () => {},
  acDefinitionData = {},
  setAcDefinitionData = () => {},
  addressData = {},
  setAddressData = () => {},
  employees = [],
  setEmployees = () => {},
  bankDetails = [],
  setBankDetails = () => {},
  kycData = {},
  setKycData = () => {},
  vatGstData = {},
  setVatGstData = () => {},
  handleSave = () => {},
  titleOptions = [],
  modeOptions = [],
  documentTypes = [],
  currencyOptions = [],
  branchOptions = [],
  limitTypes = [],
  idTypes = [],
  setShowEmployeeModal = () => {},
  setShowBankModal = () => {},
  handleEditEmployee = () => {},
  handleDeleteEmployee = () => {},
  handleEditBank = () => {},
  handleDeleteBank = () => {},
}) {
  if (!isOpen) return null;

  const tabs = [
    {
      id: "ac-definition",
      label: "A/C Definition",
      icon: Settings,
      color: "from-blue-600 to-cyan-500",
    },
    {
      id: "address",
      label: "Address Details",
      icon: MapPin,
      color: "from-blue-600 to-cyan-500",
    },
    {
      id: "vat-gst",
      label: "VAT/GST",
      icon: Receipt,
      color: "from-blue-600 to-cyan-500",
    },
    {
      id: "bank",
      label: "Bank Details",
      icon: CreditCard,
      color: "from-blue-600 to-cyan-500",
    },
    {
      id: "kyc",
      label: "KYC Documents",
      icon: Shield,
      color: "from-blue-600 to-cyan-500",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {editingDebtor ? "Edit Trade Debtor" : "Add Trade Debtor"}
                </h2>
                <p className="text-white/80 text-sm">
                  Manage debtor information and details
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[60vh]">
          <BasicInfoHeader
            basicFormData={basicFormData}
            setBasicFormData={setBasicFormData}
            titleOptions={titleOptions}
            modeOptions={modeOptions}
            documentTypes={documentTypes}
          />

          <div className="mb-6">
            <div className="flex space-x-1 mt-4 bg-gray-100 rounded-xl p-1 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-[1.02]`
                      : "text-gray-600 hover:text-gray-800 hover:bg-white"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="animate-in slide-in-from-right-4 duration-300">
            {activeTab === "ac-definition" && (
              <AcDefinitionTab
                acDefinitionData={acDefinitionData}
                setAcDefinitionData={setAcDefinitionData}
                currencyOptions={currencyOptions}
                branchOptions={branchOptions}
                limitTypes={limitTypes}
              />
            )}
            {activeTab === "address" && (
              <AddressTab
                addressData={addressData}
                setAddressData={setAddressData}
                employees={employees}
                idTypes={idTypes}
                setShowEmployeeModal={setShowEmployeeModal}
                handleEditEmployee={handleEditEmployee}
                handleDeleteEmployee={handleDeleteEmployee}
              />
            )}
            {activeTab === "vat-gst" && (
              <VATGSTTab
                vatGstData={vatGstData}
                setVatGstData={setVatGstData}
              />
            )}
            {activeTab === "bank" && (
              <BankTab
                bankDetails={bankDetails}
                setShowBankModal={setShowBankModal}
                handleEditBank={handleEditBank}
                handleDeleteBank={handleDeleteBank}
              />
            )}
            {activeTab === "kyc" && (
              <KYCTab
                kycData={kycData}
                setKycData={setKycData}
                selectedType={basicFormData.type || "account"}
              />
            )}
          </div>
        </div>

        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Auto-save enabled</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center space-x-2 font-medium"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
