import React, { useState, useEffect, useCallback } from "react";
import Header from "../Debtors/Header.jsx";
import DebtorsTable from "../Debtors/DebtorsTable.jsx";
import DebtorModal from "../Debtors/DebtorModal.jsx";
import EmployeeModal from "../Debtors/EmployeeModal.jsx";
import BankModal from "../Debtors/BankModal.jsx";

// Initial data
const initialTradeDebtors = [
  {
    id: 1,
    division: "DIV001",
    itemCode: "GOLD001",
    description: "Gold Trading Account",
    karatCode: "24K",
    typeCode: "TRD001",
    price1: 2450.5,
    price2: 2455.75,
    type: "account",
    customerName: "Ahmed Al-Rashid",
    mode: "Bank",
    acCode: "AC001",
    classification: "Premium",
    shortName: "Ahmed R.",
    parentGroup: "Gold Traders",
    remarks: "VIP Customer",
    documentType: "Passport",
    expiryDate: "2025-12-31",
    attachments: [],
    currency: {
      no: 1,
      currency: "AED",
      salRate: 3.67,
      purRate: 3.65,
      default: true,
    },
    branch: { no: 1, branchCode: "BR001", branchName: "Dubai Main Branch" },
    creditLimit: {
      limitType: "Fixed",
      currency: "AED",
      unfixGold: 1000,
      netAmount: 50000,
      creditDaysAmt: 30,
      creditDaysMtl: 15,
      shortMargin: 5.5,
      longMargin: 8.2,
    },
    address: {
      location: "Dubai Marina",
      address: "Tower 1, Marina Walk",
      poBox: "12345",
      city: "Dubai",
      country: "UAE",
      zip: "00000",
      mobile: "+971-50-1234567",
      phone: "+971-4-1234567",
      email: "ahmed@example.com",
      fax: "+971-4-1234568",
      idType: "Emirates ID",
      idExpiry: "2026-06-30",
    },
    employees: [
      {
        id: 1,
        name: "Fatima Hassan",
        designation: "Account Manager",
        email: "fatima@company.com",
        soAlert: true,
        mobile: "+971-50-9876543",
        poAlert: false,
      },
    ],
    bankDetails: [
      {
        id: 1,
        swiftId: "NBADAEAD",
        name: "National Bank of Abu Dhabi",
        address: "Sheikh Zayed Road, Dubai",
        iban: "AE070331234567890123456",
        branchCode: "033",
        accNo: "1234567890",
        purpose: "Trading Account",
        country: "UAE",
        city: "Dubai",
        routingCode: "SWIFT033",
      },
    ],
    kycData: {
      documentType: "Passport",
      documentNumber: "A12345678",
      issueDate: "2020-01-01",
      expiryDate: "2025-12-31",
    },
    vatGstData: {
      registrationNumber: "VAT123456",
      registrationType: "Regular",
      registrationDate: "2020-01-01",
      state: "Dubai",
    },
  },
  {
    id: 2,
    division: "DIV002",
    itemCode: "SILVER002",
    description: "Silver Trading Account",
    karatCode: "925",
    typeCode: "TRD002",
    price1: 31.25,
    price2: 31.85,
    type: "group",
    customerName: "Sarah Johnson",
    mode: "Debtor",
    acCode: "AC002",
    classification: "Standard",
    shortName: "Sarah J.",
    parentGroup: "Silver Traders",
    remarks: "Regular Customer",
    documentType: "Trade License",
    expiryDate: "2024-08-15",
    attachments: [],
    currency: {
      no: 2,
      currency: "USD",
      salRate: 1.0,
      purRate: 1.0,
      default: false,
    },
    branch: { no: 2, branchCode: "BR002", branchName: "Abu Dhabi Branch" },
    creditLimit: {
      limitType: "Flexible",
      currency: "USD",
      unfixGold: 500,
      netAmount: 25000,
      creditDaysAmt: 45,
      creditDaysMtl: 20,
      shortMargin: 4.8,
      longMargin: 7.5,
    },
    address: {
      location: "Business District",
      address: "Office Tower 2, Floor 15",
      poBox: "67890",
      city: "Abu Dhabi",
      country: "UAE",
      zip: "11111",
      mobile: "+971-55-7654321",
      phone: "+971-2-7654321",
      email: "sarah@example.com",
      fax: "+971-2-7654322",
      idType: "Passport",
      idExpiry: "2027-03-15",
    },
    employees: [],
    bankDetails: [],
    kycData: {
      documentType: "Trade License",
      documentNumber: "TL987654",
      issueDate: "2019-06-01",
      expiryDate: "2024-08-15",
    },
    vatGstData: {
      registrationNumber: "VAT987654",
      registrationType: "Composition",
      registrationDate: "2019-06-01",
      state: "Abu Dhabi",
    },
  },
];

const titleOptions = ["Mr", "Mrs", "Ms", "Dr", "Prof", "Sheikh", "Eng"];
const modeOptions = ["Bank", "Debtor", "LP"];
const documentTypes = ["Passport", "Emirates ID", "Visa", "Trade License"];
const limitTypes = ["Fixed", "Flexible", "Unlimited"];
const idTypes = ["Emirates ID", "Passport", "Visa", "Driver License"];
const currencyOptions = [
  { no: 1, currency: "AED", salRate: 3.67, purRate: 3.65, default: true },
  { no: 2, currency: "USD", salRate: 1.0, purRate: 1.0, default: false },
  { no: 3, currency: "EUR", salRate: 0.85, purRate: 0.84, default: false },
  { no: 4, currency: "GBP", salRate: 0.76, purRate: 0.75, default: false },
];
const branchOptions = [
  { no: 1, branchCode: "BR001", branchName: "Dubai Main Branch" },
  { no: 2, branchCode: "BR002", branchName: "Abu Dhabi Branch" },
  { no: 3, branchCode: "BR003", branchName: "Sharjah Branch" },
  { no: 4, branchCode: "BR004", branchName: "Al Ain Branch" },
];
export default function TradeDebtors() {
  const [tradeDebtors, setTradeDebtors] = useState(initialTradeDebtors);
  const [filteredDebtors, setFilteredDebtors] = useState(initialTradeDebtors);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDebtor, setEditingDebtor] = useState(null);
  const [activeTab, setActiveTab] = useState("ac-definition");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editingBank, setEditingBank] = useState(null);
  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    designation: "",
    email: "",
    soAlert: false,
    mobile: "",
    poAlert: false,
  });
  const [bankForm, setBankForm] = useState({
    swiftId: "",
    name: "",
    address: "",
    iban: "",
    branchCode: "",
    accNo: "",
    purpose: "",
    country: "",
    city: "",
    routingCode: "",
  });
  const [basicFormData, setBasicFormData] = useState({
    division: "",
    itemCode: "",
    description: "",
    karatCode: "",
    typeCode: "",
    price1: "",
    price2: "",
    type: "account",
    customerName: "",
    mode: "",
    acCode: "",
    classification: "",
    shortName: "",
    parentGroup: "",
    remarks: "",
    documentType: "",
    expiryDate: "",
    attachments: [],
    title: "",
  });
  console.log(basicFormData)
  const [acDefinitionData, setAcDefinitionData] = useState({
    currency: {
      no: 1,
      currency: "AED",
      salRate: 3.67,
      purRate: 3.65,
      default: true,
    },
    branch: { no: 1, branchCode: "BR001", branchName: "Dubai Main Branch" },
    creditLimit: {
      limitType: "Fixed",
      currency: "AED",
      unfixGold: "",
      netAmount: "",
      creditDaysAmt: "",
      creditDaysMtl: "",
      shortMargin: "",
      longMargin: "",
    },
  });
  const [addressData, setAddressData] = useState({
    location: "",
    address: "",
    poBox: "",
    city: "",
    country: "",
    zip: "",
    mobile: "",
    phone: "",
    email: "",
    fax: "",
    idType: "",
    idExpiry: "",
  });
  const [employees, setEmployees] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [kycData, setKycData] = useState({
    documentType: "",
    documentNumber: "",
    issueDate: "",
    expiryDate: "",
  });
  const [vatGstData, setVatGstData] = useState({
    registrationNumber: "",
    registrationType: "",
    registrationDate: "",
    state: "",
  });

  useEffect(() => {
    const filtered = tradeDebtors.filter(
      (debtor) =>
        debtor.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        debtor.division.toLowerCase().includes(searchTerm.toLowerCase()) ||
        debtor.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        debtor.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDebtors(filtered);
    setCurrentPage(1);
  }, [searchTerm, tradeDebtors]);

  const resetAllForms = useCallback(() => {
    setBasicFormData({
      division: "",
      itemCode: "",
      description: "",
      karatCode: "",
      typeCode: "",
      price1: "",
      price2: "",
      type: "account",
      customerName: "",
      mode: "",
      acCode: "",
      classification: "",
      shortName: "",
      parentGroup: "",
      remarks: "",
      documentType: "",
      expiryDate: "",
      attachments: [],
      title: "",
    });
    setAcDefinitionData({
      currency: {
        no: 1,
        currency: "AED",
        salRate: 3.67,
        purRate: 3.65,
        default: true,
      },
      branch: { no: 1, branchCode: "BR001", branchName: "Dubai Main Branch" },
      creditLimit: {
        limitType: "Fixed",
        currency: "AED",
        unfixGold: "",
        netAmount: "",
        creditDaysAmt: "",
        creditDaysMtl: "",
        shortMargin: "",
        longMargin: "",
      },
    });
    setAddressData({
      location: "",
      address: "",
      poBox: "",
      city: "",
      country: "",
      zip: "",
      mobile: "",
      phone: "",
      email: "",
      fax: "",
      idType: "",
      idExpiry: "",
    });
    setEmployees([]);
    setBankDetails([]);
    setKycData({
      documentType: "",
      documentNumber: "",
      issueDate: "",
      expiryDate: "",
    });
    setVatGstData({
      registrationNumber: "",
      registrationType: "",
      registrationDate: "",
      state: "",
    });
    setEmployeeForm({
      name: "",
      designation: "",
      email: "",
      soAlert: false,
      mobile: "",
      poAlert: false,
    });
    setBankForm({
      swiftId: "",
      name: "",
      address: "",
      iban: "",
      branchCode: "",
      accNo: "",
      purpose: "",
      country: "",
      city: "",
      routingCode: "",
    });
  }, []);

  const handleAdd = useCallback(() => {
    setEditingDebtor(null);
    resetAllForms();
    setActiveTab("ac-definition");
    setIsModalOpen(true);
  }, [resetAllForms]);

  const handleEdit = useCallback((debtor) => {
    setEditingDebtor(debtor);
    setBasicFormData({
      division: debtor.division,
      itemCode: debtor.itemCode,
      description: debtor.description,
      karatCode: debtor.karatCode,
      typeCode: debtor.typeCode,
      price1: debtor.price1,
      price2: debtor.price2,
      type: debtor.type,
      customerName: debtor.customerName,
      mode: debtor.mode,
      acCode: debtor.acCode,
      classification: debtor.classification,
      shortName: debtor.shortName,
      parentGroup: debtor.parentGroup,
      remarks: debtor.remarks,
      documentType: debtor.documentType,
      expiryDate: debtor.expiryDate,
      attachments: debtor.attachments || [],
      title: debtor.title || "",
    });
    setAcDefinitionData({
      currency: debtor.currency,
      branch: debtor.branch,
      creditLimit: debtor.creditLimit,
    });
    setAddressData(debtor.address);
    setEmployees(debtor.employees || []);
    setBankDetails(debtor.bankDetails || []);
    setKycData(
      debtor.kycData || {
        documentType: "",
        documentNumber: "",
        issueDate: "",
        expiryDate: "",
      }
    );
    setVatGstData(
      debtor.vatGstData || {
        registrationNumber: "",
        registrationType: "",
        registrationDate: "",
        state: "",
      }
    );
    setActiveTab("ac-definition");
    setIsModalOpen(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!basicFormData.customerName || !basicFormData.division) {
      alert("Customer Name and Division are required fields!");
      return;
    }

    const debtorData = {
      ...basicFormData,
      ...acDefinitionData,
      address: addressData,
      employees,
      bankDetails,
      kycData,
      vatGstData,
      price1: parseFloat(basicFormData.price1) || 0,
      price2: parseFloat(basicFormData.price2) || 0,
    };

    if (editingDebtor) {
      setTradeDebtors((prev) =>
        prev.map((debtor) =>
          debtor.id === editingDebtor.id ? { ...debtor, ...debtorData } : debtor
        )
      );
    } else {
      const newDebtor = {
        id: Math.max(...tradeDebtors.map((d) => d.id), 0) + 1,
        ...debtorData,
      };
      setTradeDebtors((prev) => [...prev, newDebtor]);
    }
console.log(debtorData)
    setIsModalOpen(false);
    resetAllForms();
  }, [
    basicFormData,
    acDefinitionData,
    addressData,
    employees,
    bankDetails,
    kycData,
    vatGstData,
    editingDebtor,
    resetAllForms,
  ]);

  const handleDelete = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this trade debtor?")) {
      setTradeDebtors((prev) => prev.filter((debtor) => debtor.id !== id));
    }
  }, []);

  const handleAddEmployee = useCallback(() => {
    if (!employeeForm.name || !employeeForm.email) {
      alert("Name and Email are required!");
      return;
    }

    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployee.id ? { ...emp, ...employeeForm } : emp
        )
      );
    } else {
      const newEmployee = {
        id: Date.now(),
        ...employeeForm,
      };
      setEmployees((prev) => [...prev, newEmployee]);
    }

    setEmployeeForm({
      name: "",
      designation: "",
      email: "",
      soAlert: false,
      mobile: "",
      poAlert: false,
    });
    setEditingEmployee(null);
    setShowEmployeeModal(false);
  }, [employeeForm, editingEmployee]);

  const handleEditEmployee = useCallback((employee) => {
    setEditingEmployee(employee);
    setEmployeeForm(employee);
    setShowEmployeeModal(true);
  }, []);

  const handleDeleteEmployee = useCallback((id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  }, []);

  const handleAddBank = useCallback(() => {
    if (!bankForm.name || !bankForm.iban) {
      alert("Bank Name and IBAN are required!");
      return;
    }

    if (editingBank) {
      setBankDetails((prev) =>
        prev.map((bank) =>
          bank.id === editingBank.id ? { ...bank, ...bankForm } : bank
        )
      );
    } else {
      const newBank = {
        id: Date.now(),
        ...bankForm,
      };
      setBankDetails((prev) => [...prev, newBank]);
    }

    setBankForm({
      swiftId: "",
      name: "",
      address: "",
      iban: "",
      branchCode: "",
      accNo: "",
      purpose: "",
      country: "",
      city: "",
      routingCode: "",
    });
    setEditingBank(null);
    setShowBankModal(false);
  }, [bankForm, editingBank]);

  const handleEditBank = useCallback((bank) => {
    setEditingBank(bank);
    setBankForm(bank);
    setShowBankModal(true);
  }, []);

  const handleDeleteBank = useCallback((id) => {
    setBankDetails((prev) => prev.filter((bank) => bank.id !== id));
  }, []);

  return (
    <div className="min-h-screen w-full p-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleAdd={handleAdd}
        />
        <DebtorsTable
          filteredDebtors={filteredDebtors}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <DebtorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editingDebtor={editingDebtor}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          basicFormData={basicFormData}
          setBasicFormData={setBasicFormData}
          acDefinitionData={acDefinitionData}
          setAcDefinitionData={setAcDefinitionData}
          addressData={addressData}
          setAddressData={setAddressData}
          employees={employees}
          setEmployees={setEmployees}
          bankDetails={bankDetails}
          setBankDetails={setBankDetails}
          kycData={kycData}
          setKycData={setKycData}
          vatGstData={vatGstData}
          setVatGstData={setVatGstData}
          handleSave={handleSave}
          titleOptions={titleOptions}
          modeOptions={modeOptions}
          documentTypes={documentTypes}
          currencyOptions={currencyOptions}
          branchOptions={branchOptions}
          limitTypes={limitTypes}
          idTypes={idTypes}
          setShowEmployeeModal={setShowEmployeeModal}
          setShowBankModal={setShowBankModal}
          handleEditEmployee={handleEditEmployee}
          handleDeleteEmployee={handleDeleteEmployee}
          handleEditBank={handleEditBank}
          handleDeleteBank={handleDeleteBank}
        />
        <EmployeeModal
          isOpen={showEmployeeModal}
          onClose={() => setShowEmployeeModal(false)}
          employeeForm={employeeForm}
          setEmployeeForm={setEmployeeForm}
          editingEmployee={editingEmployee}
          handleAddEmployee={handleAddEmployee}
        />
        <BankModal
          isOpen={showBankModal}
          onClose={() => setShowBankModal(false)}
          bankForm={bankForm}
          setBankForm={setBankForm}
          editingBank={editingBank}
          handleAddBank={handleAddBank}
        />
      </div>
    </div>
  );
}
