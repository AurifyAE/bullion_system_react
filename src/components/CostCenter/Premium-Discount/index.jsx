
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
  Gift,
  Star,
  Percent,
  Award,
} from "lucide-react";

const PremiumDiscountCostCenter = () => {
  // Demo premium-discount transaction logs data
  const [transactionLogs] = useState([
    {
      id: "PD-2024-001",
      costCenterId: "PDC-001",
      costCenterName: "Dubai Premium Services",
      type: "PREMIUM_CHARGE",
      nature: "CREDIT",
      chargeAmount: 2500.0,
      itemsProcessed: 25,
      chargePerItem: 100.0,
      description: "Premium gold consultation and design services",
      referenceNumber: "PREM-2024-0891",
      processedBy: "Amira Al-Mansouri",
      createdAt: "2024-05-29T09:15:00Z",
      status: "COMPLETED",
      customerType: "VIP",
    },
    {
      id: "PD-2024-002",
      costCenterId: "PDC-001",
      costCenterName: "Dubai Premium Services",
      type: "VOLUME_DISCOUNT",
      nature: "DEBIT",
      chargeAmount: 750.0,
      itemsProcessed: 50,
      chargePerItem: 15.0,
      description: "Volume discount for bulk purchase - 15% off",
      referenceNumber: "DISC-2024-0234",
      processedBy: "Amira Al-Mansouri",
      createdAt: "2024-05-29T11:30:00Z",
      status: "COMPLETED",
      customerType: "WHOLESALE",
    },
    {
      id: "PD-2024-003",
      costCenterId: "PDC-002",
      costCenterName: "Abu Dhabi Luxury Center",
      type: "LOYALTY_DISCOUNT",
      nature: "DEBIT",
      chargeAmount: 1200.0,
      itemsProcessed: 30,
      chargePerItem: 40.0,
      description: "Loyalty member discount - Gold tier benefits",
      referenceNumber: "LOY-2024-0456",
      processedBy: "Hassan Al-Zahra",
      createdAt: "2024-05-29T12:45:00Z",
      status: "COMPLETED",
      customerType: "LOYALTY",
    },
    {
      id: "PD-2024-004",
      costCenterId: "PDC-002",
      costCenterName: "Abu Dhabi Luxury Center",
      type: "EXCLUSIVE_PREMIUM",
      nature: "CREDIT",
      chargeAmount: 3500.0,
      itemsProcessed: 10,
      chargePerItem: 350.0,
      description: "Exclusive premium service charges - VIP treatment",
      referenceNumber: "EXCL-2024-0156",
      processedBy: "Hassan Al-Zahra",
      createdAt: "2024-05-29T14:20:00Z",
      status: "IN_PROGRESS",
      customerType: "EXCLUSIVE",
    },
    {
      id: "PD-2024-005",
      costCenterId: "PDC-003",
      costCenterName: "Sharjah Elite Hub",
      type: "SEASONAL_DISCOUNT",
      nature: "DEBIT",
      chargeAmount: 875.0,
      itemsProcessed: 35,
      chargePerItem: 25.0,
      description: "Summer seasonal discount promotion - 20% off",
      referenceNumber: "SEAS-2024-0789",
      processedBy: "Layla Hassan",
      createdAt: "2024-05-28T16:20:00Z",
      status: "COMPLETED",
      customerType: "RETAIL",
    },
    {
      id: "PD-2024-006",
      costCenterId: "PDC-001",
      costCenterName: "Dubai Premium Services",
      type: "PREMIUM_REVERSAL",
      nature: "DEBIT",
      chargeAmount: 500.0,
      itemsProcessed: 5,
      chargePerItem: 100.0,
      description: "Premium charge reversal for service complaint",
      referenceNumber: "REV-2024-0023",
      processedBy: "Amira Al-Mansouri",
      createdAt: "2024-05-28T10:15:00Z",
      status: "COMPLETED",
      customerType: "VIP",
    },
    {
      id: "PD-2024-007",
      costCenterId: "PDC-002",
      costCenterName: "Abu Dhabi Luxury Center",
      type: "CUSTOMIZATION_PREMIUM",
      nature: "CREDIT",
      chargeAmount: 1800.0,
      itemsProcessed: 12,
      chargePerItem: 150.0,
      description: "Custom design and craftsmanship premium charges",
      referenceNumber: "CUST-2024-0067",
      processedBy: "Hassan Al-Zahra",
      createdAt: "2024-05-27T13:45:00Z",
      status: "COMPLETED",
      customerType: "CUSTOM",
    },
    {
      id: "PD-2024-008",
      costCenterId: "PDC-003",
      costCenterName: "Sharjah Elite Hub",
      type: "EARLY_BIRD_DISCOUNT",
      nature: "DEBIT",
      chargeAmount: 600.0,
      itemsProcessed: 20,
      chargePerItem: 30.0,
      description: "Early bird discount for advance bookings",
      referenceNumber: "EARLY-2024-0124",
      processedBy: "Layla Hassan",
      createdAt: "2024-05-27T09:30:00Z",
      status: "COMPLETED",
      customerType: "RETAIL",
    },
    {
      id: "PD-2024-009",
      costCenterId: "PDC-001",
      costCenterName: "Dubai Premium Services",
      type: "MEMBERSHIP_PREMIUM",
      nature: "CREDIT",
      chargeAmount: 2200.0,
      itemsProcessed: 8,
      chargePerItem: 275.0,
      description: "Premium membership upgrade charges",
      referenceNumber: "MEMB-2024-0345",
      processedBy: "Amira Al-Mansouri",
      createdAt: "2024-05-26T15:20:00Z",
      status: "COMPLETED",
      customerType: "PREMIUM",
    },
    {
      id: "PD-2024-010",
      costCenterId: "PDC-003",
      costCenterName: "Sharjah Elite Hub",
      type: "REFERRAL_DISCOUNT",
      nature: "DEBIT",
      chargeAmount: 450.0,
      itemsProcessed: 15,
      chargePerItem: 30.0,
      description: "Referral program discount for new customer referrals",
      referenceNumber: "REF-2024-0890",
      processedBy: "Layla Hassan",
      createdAt: "2024-05-26T11:10:00Z",
      status: "COMPLETED",
      customerType: "REFERRAL",
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

    const premiumCharges = relevantTransactions
      .filter((t) => t.nature === "CREDIT")
      .reduce((sum, t) => sum + t.chargeAmount, 0);

    const discountsGiven = relevantTransactions
      .filter((t) => t.nature === "DEBIT")
      .reduce((sum, t) => sum + t.chargeAmount, 0);

    const netRevenue = premiumCharges - discountsGiven;
    const totalTransactions = relevantTransactions.length;
    const totalItemsProcessed = relevantTransactions.reduce(
      (sum, t) => sum + t.itemsProcessed,
      0
    );

    return {
      premiumCharges,
      discountsGiven,
      netRevenue,
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
      case "PREMIUM_CHARGE":
        return <Star className="w-4 h-4 text-purple-600" />;
      case "VOLUME_DISCOUNT":
        return <Package className="w-4 h-4 text-blue-600" />;
      case "LOYALTY_DISCOUNT":
        return <Award className="w-4 h-4 text-gold-600" />;
      case "EXCLUSIVE_PREMIUM":
        return <Target className="w-4 h-4 text-indigo-600" />;
      case "SEASONAL_DISCOUNT":
        return <Gift className="w-4 h-4 text-green-600" />;
      case "PREMIUM_REVERSAL":
        return <ArrowDownUp className="w-4 h-4 text-red-600" />;
      case "CUSTOMIZATION_PREMIUM":
        return <Zap className="w-4 h-4 text-cyan-600" />;
      case "EARLY_BIRD_DISCOUNT":
        return <Percent className="w-4 h-4 text-orange-600" />;
      case "MEMBERSHIP_PREMIUM":
        return <CreditCard className="w-4 h-4 text-violet-600" />;
      case "REFERRAL_DISCOUNT":
        return <Scale className="w-4 h-4 text-teal-600" />;
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
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Premium-Discount Cost Center Management
              </h1>
              <p className="text-purple-100">
                Monitor and manage premium charges and discounts across all cost centers
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-lg p-3">
                <Star className="w-8 h-8" />
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
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Premium Charges
                  </p>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {formatCurrency(summaryTotals.premiumCharges)}
                </p>
                <p className="text-sm text-gray-500">Credit Transactions</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-purple-50 px-6 py-2 border-t border-purple-100">
            <p className="text-xs text-purple-700 font-medium">
              Premium Revenue
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Discounts Given
                  </p>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {formatCurrency(summaryTotals.discountsGiven)}
                </p>
                <p className="text-sm text-gray-500">Debit Transactions</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <TrendingDown className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-orange-50 px-6 py-2 border-t border-orange-100">
            <p className="text-xs text-orange-700 font-medium">
              Customer Savings
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
                    Net Revenue
                  </p>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {formatCurrency(summaryTotals.netRevenue)}
                </p>
                <p className="text-sm text-gray-500">After Discounts</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-blue-50 px-6 py-2 border-t border-blue-100">
            <p className="text-xs text-blue-700 font-medium">
              Final Revenue
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Items Processed
                  </p>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {summaryTotals.totalItemsProcessed.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Total Items</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-green-50 px-6 py-2 border-t border-green-100">
            <p className="text-xs text-green-700 font-medium">
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
              Premium-Discount Logs{" "}
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
              <option value="PREMIUM_CHARGE">Premium Charge</option>
              <option value="VOLUME_DISCOUNT">Volume Discount</option>
              <option value="LOYALTY_DISCOUNT">Loyalty Discount</option>
              <option value="EXCLUSIVE_PREMIUM">Exclusive Premium</option>
              <option value="SEASONAL_DISCOUNT">Seasonal Discount</option>
              <option value="PREMIUM_REVERSAL">Premium Reversal</option>
              <option value="CUSTOMIZATION_PREMIUM">Customization Premium</option>
              <option value="EARLY_BIRD_DISCOUNT">Early Bird Discount</option>
              <option value="MEMBERSHIP_PREMIUM">Membership Premium</option>
              <option value="REFERRAL_DISCOUNT">Referral Discount</option>
            </select>

            <select
              value={filterNature}
              onChange={(e) => setFilterNature(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="ALL">All Natures</option>
              <option value="CREDIT">Premiums</option>
              <option value="DEBIT">Discounts</option>
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
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Premium
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
                            ? "text-purple-600"
                            : "text-orange-600"
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
                        <div className="text-sm font-bold text-orange-700">
                          {formatCurrency(transaction.chargeAmount)}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-300">________</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.nature === "CREDIT" ? (
                        <div className="text-sm font-bold text-purple-700">
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

export default PremiumDiscountCostCenter;
