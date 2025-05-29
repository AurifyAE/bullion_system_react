import React, { useState } from "react";
import {
  ArrowDownUp,
  X,
  DollarSign,
  Package,
  Download,
  Trash2,
  Search,
  TrendingUp,
  TrendingDown,
  Scale,
  Target,
  Activity,
  Zap,
  CreditCard,
  Calculator,
} from "lucide-react";

const MarkingChargeCostCenter = () => {
  // Demo marking charge transaction logs data
  const [transactionLogs] = useState([
    {
      id: "MKG-2024-001",
      costCenterId: "MCC-001",
      costCenterName: "Dubai Marking Center",
      type: "MARKING_FEE",
      nature: "CREDIT",
      chargeAmount: 1250.0,
      itemsProcessed: 50,
      chargePerItem: 25.0,
      description: "Gold jewelry marking charges - 22K certification",
      referenceNumber: "MRK-2024-0891",
      processedBy: "Ahmed Al-Rashid",
      createdAt: "2024-05-29T09:15:00Z",
      status: "COMPLETED",
      customerType: "RETAIL",
    },
    {
      id: "MKG-2024-002",
      costCenterId: "MCC-001",
      costCenterName: "Dubai Marking Center",
      type: "TRANSFER_OUT",
      nature: "DEBIT",
      chargeAmount: 750.0,
      itemsProcessed: 30,
      chargePerItem: 25.0,
      description: "Transfer to Abu Dhabi Processing Center",
      referenceNumber: "TRF-2024-0234",
      processedBy: "Ahmed Al-Rashid",
      createdAt: "2024-05-29T11:30:00Z",
      status: "COMPLETED",
      customerType: "INTERNAL",
    },
    {
      id: "MKG-2024-003",
      costCenterId: "MCC-002",
      costCenterName: "Abu Dhabi Processing Center",
      type: "TRANSFER_IN",
      nature: "CREDIT",
      chargeAmount: 750.0,
      itemsProcessed: 30,
      chargePerItem: 25.0,
      description: "Transfer from Dubai Marking Center",
      referenceNumber: "TRF-2024-0234",
      processedBy: "Fatima Al-Zahra",
      createdAt: "2024-05-29T12:45:00Z",
      status: "COMPLETED",
      customerType: "INTERNAL",
    },
    {
      id: "MKG-2024-004",
      costCenterId: "MCC-002",
      costCenterName: "Abu Dhabi Processing Center",
      type: "HALLMARK_FEE",
      nature: "CREDIT",
      chargeAmount: 2100.0,
      itemsProcessed: 70,
      chargePerItem: 30.0,
      description: "Premium hallmarking service charges",
      referenceNumber: "HLM-2024-0156",
      processedBy: "Fatima Al-Zahra",
      createdAt: "2024-05-29T14:20:00Z",
      status: "IN_PROGRESS",
      customerType: "WHOLESALE",
    },
    {
      id: "MKG-2024-005",
      costCenterId: "MCC-003",
      costCenterName: "Sharjah Service Hub",
      type: "CERTIFICATION_FEE",
      nature: "CREDIT",
      chargeAmount: 875.0,
      itemsProcessed: 25,
      chargePerItem: 35.0,
      description: "Diamond certification and marking charges",
      referenceNumber: "CERT-2024-0789",
      processedBy: "Mohammad Hassan",
      createdAt: "2024-05-28T16:20:00Z",
      status: "COMPLETED",
      customerType: "RETAIL",
    },
    {
      id: "MKG-2024-006",
      costCenterId: "MCC-001",
      costCenterName: "Dubai Marking Center",
      type: "REFUND",
      nature: "DEBIT",
      chargeAmount: 125.0,
      itemsProcessed: 5,
      chargePerItem: 25.0,
      description: "Customer refund for cancelled marking order",
      referenceNumber: "REF-2024-0023",
      processedBy: "Ahmed Al-Rashid",
      createdAt: "2024-05-28T10:15:00Z",
      status: "COMPLETED",
      customerType: "RETAIL",
    },
    {
      id: "MKG-2024-007",
      costCenterId: "MCC-002",
      costCenterName: "Abu Dhabi Processing Center",
      type: "REWORK_FEE",
      nature: "CREDIT",
      chargeAmount: 450.0,
      itemsProcessed: 15,
      chargePerItem: 30.0,
      description: "Rework charges for quality corrections",
      referenceNumber: "RWK-2024-0067",
      processedBy: "Fatima Al-Zahra",
      createdAt: "2024-05-27T13:45:00Z",
      status: "COMPLETED",
      customerType: "WHOLESALE",
    },
    {
      id: "MKG-2024-008",
      costCenterId: "MCC-003",
      costCenterName: "Sharjah Service Hub",
      type: "EXPEDITE_FEE",
      nature: "CREDIT",
      chargeAmount: 600.0,
      itemsProcessed: 12,
      chargePerItem: 50.0,
      description: "Express marking service premium charges",
      referenceNumber: "EXP-2024-0124",
      processedBy: "Mohammad Hassan",
      createdAt: "2024-05-27T09:30:00Z",
      status: "COMPLETED",
      customerType: "RETAIL",
    },
  ]);

  // State management
  const [selectedCostCenter, setSelectedCostCenter] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [filterNature, setFilterNature] = useState("ALL");
  const [expandedRow, setExpandedRow] = useState(null);

  // Calculate filtered transactions
  const filteredTransactions = transactionLogs.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.referenceNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.costCenterName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "ALL" || transaction.type === filterType;
    const matchesNature =
      filterNature === "ALL" || transaction.nature === filterNature;
    const matchesCostCenter =
      !selectedCostCenter || transaction.costCenterId === selectedCostCenter.id;

    return matchesSearch && matchesType && matchesNature && matchesCostCenter;
  });

  // Sort transactions by date for proper ledger order
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  // Calculate running balance for ledger
  const transactionsWithBalance = React.useMemo(() => {
    let runningBalance = 0;
    return sortedTransactions.map((transaction) => {
      if (transaction.nature === "CREDIT") {
        runningBalance += transaction.chargeAmount;
      } else {
        runningBalance -= transaction.chargeAmount;
      }
      return {
        ...transaction,
        runningBalance: runningBalance,
      };
    });
  }, [sortedTransactions]);

  // Calculate summary totals
  const summaryTotals = React.useMemo(() => {
    const relevantTransactions = selectedCostCenter
      ? transactionLogs.filter((t) => t.costCenterId === selectedCostCenter.id)
      : transactionLogs;

    const totalCredits = relevantTransactions
      .filter((t) => t.nature === "CREDIT")
      .reduce((sum, t) => sum + t.chargeAmount, 0);

    const totalDebits = relevantTransactions
      .filter((t) => t.nature === "DEBIT")
      .reduce((sum, t) => sum + t.chargeAmount, 0);

    const netBalance = totalCredits - totalDebits;
    const totalTransactions = relevantTransactions.length;
    const totalItemsProcessed = relevantTransactions.reduce(
      (sum, t) => sum + t.itemsProcessed,
      0
    );

    return {
      totalCredits,
      totalDebits,
      netBalance,
      totalTransactions,
      totalItemsProcessed,
    };
  }, [transactionLogs, selectedCostCenter]);

  // Pagination
  const totalPages = Math.ceil(transactionsWithBalance.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactionsWithBalance.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Format functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return `AED ${amount.toFixed(2)}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "PENDING":
        return "bg-orange-100 text-orange-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "MARKING_FEE":
        return <Zap className="w-4 h-4 text-blue-600" />;
      case "TRANSFER_IN":
      case "TRANSFER_OUT":
        return <ArrowDownUp className="w-4 h-4 text-indigo-600" />;
      case "HALLMARK_FEE":
        return <Target className="w-4 h-4 text-purple-600" />;
      case "CERTIFICATION_FEE":
        return <Package className="w-4 h-4 text-green-600" />;
      case "REFUND":
        return <CreditCard className="w-4 h-4 text-red-600" />;
      case "REWORK_FEE":
        return <Scale className="w-4 h-4 text-orange-600" />;
      case "EXPEDITE_FEE":
        return <Calculator className="w-4 h-4 text-cyan-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterType("ALL");
    setFilterNature("ALL");
    setSelectedCostCenter(null);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r  from-blue-600 to-cyan-500 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Marking Charge Cost Center Management
              </h1>
              <p className="text-purple-100">
                Monitor and manage marking charges across all cost centers
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-lg p-3">
                <Zap className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Total Revenue
                  </p>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {formatCurrency(summaryTotals.totalCredits)}
                </p>
                <p className="text-sm text-gray-500">Credit Transactions</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-green-50 px-6 py-2 border-t border-green-100">
            <p className="text-xs text-green-700 font-medium">
              Incoming Charges
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Total Outgoing
                  </p>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {formatCurrency(summaryTotals.totalDebits)}
                </p>
                <p className="text-sm text-gray-500">Debit Transactions</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-red-50 px-6 py-2 border-t border-red-100">
            <p className="text-xs text-red-700 font-medium">
              Refunds & Transfers
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Net Balance
                  </p>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {formatCurrency(summaryTotals.netBalance)}
                </p>
                <p className="text-sm text-gray-500">Current Balance</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-blue-50 px-6 py-2 border-t border-blue-100">
            <p className="text-xs text-blue-700 font-medium">
              Available Balance
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Items Processed
                  </p>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {summaryTotals.totalItemsProcessed.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Total Items</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-purple-50 px-6 py-2 border-t border-purple-100">
            <p className="text-xs text-purple-700 font-medium">
              Processing Count
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Logs */}
      <div className="bg-white rounded-xl shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 lg:mb-0">
              Marking Charge Logs{" "}
              {selectedCostCenter && `- ${selectedCostCenter.name}`}
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={resetFilters}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </button>
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="ALL">All Types</option>
              <option value="MARKING_FEE">Marking Fee</option>
              <option value="TRANSFER_IN">Transfer In</option>
              <option value="TRANSFER_OUT">Transfer Out</option>
              <option value="HALLMARK_FEE">Hallmark Fee</option>
              <option value="CERTIFICATION_FEE">Certification Fee</option>
              <option value="REFUND">Refund</option>
              <option value="REWORK_FEE">Rework Fee</option>
              <option value="EXPEDITE_FEE">Expedite Fee</option>
            </select>

            <select
              value={filterNature}
              onChange={(e) => setFilterNature(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="ALL">All Natures</option>
              <option value="CREDIT">Credits</option>
              <option value="DEBIT">Debits</option>
            </select>

            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost Center
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items/Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Debit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Running Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedTransactions.map((transaction) => (
                <React.Fragment key={transaction.id}>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.id}
                        </div>
                        <div className="text-xs text-gray-500">
                          {transaction.referenceNumber}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">
                        {transaction.costCenterName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.processedBy}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTypeIcon(transaction.type)}
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          {transaction.type.replace("_", " ")}
                        </span>
                      </div>
                      <div
                        className={`text-xs font-medium mt-1 ${
                          transaction.nature === "CREDIT"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.nature}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {transaction.itemsProcessed} items
                      </div>
                      <div className="text-xs text-gray-500">
                        @ {formatCurrency(transaction.chargePerItem)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.nature === "DEBIT" ? (
                        <div className="text-sm font-bold text-red-700">
                          {formatCurrency(transaction.chargeAmount)}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-300">________</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.nature === "CREDIT" ? (
                        <div className="text-sm font-bold text-green-700">
                          {formatCurrency(transaction.chargeAmount)}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-300">________</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-blue-900 px-2 py-1 rounded">
                        {formatCurrency(transaction.runningBalance)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(transaction.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-red-600 hover:text-red-900 p-1 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredTransactions.length)}{" "}
              of {filteredTransactions.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        currentPage === page
                          ? "bg-purple-600 text-white"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkingChargeCostCenter;
