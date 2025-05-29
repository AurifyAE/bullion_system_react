import React, { useState, useMemo, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  LogOut,
  Settings,
  Shield,
  // Metal Master icons
  Box,
  TrendingUp,
  Gem,
  Building,
  // Cost Center Registry icons
  CircleDollarSign,
  RefreshCw,
  Sparkles,
  FileText,
  // Chart of Accounts icons
  User,
  // Metal Reports icons
  BarChart3,
  Activity,
  ClipboardList,
  // General Master icons
  Globe2,
  Database,
  Search,
  // Metal Transaction icons
  ShoppingCart,
  HandHeart,
  Package,
  Send,
  // Guardian Transaction icons
  CreditCard,
  Banknote,
  Wallet2,
  MapPin,
  // New Master icons
  FolderTree,
  Tags,
  Layers,
  Type,
  Award,
  Truck,
  Flag,
  Ruler,
  Palette,
} from "lucide-react";

import logo from "../assets/logo.jpg";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});

  // Memoized navigation structure for better performance
  const navigationSections = useMemo(() => [
    {
      key: 'metalMaster',
      icon: <Box strokeWidth={1.5} size={22} />,
      text: 'Metal Master',
      children: [
        { icon: <Package strokeWidth={1.5} size={20} />, text: 'Metal Stock', to: '/metal-stock' },
        { icon: <TrendingUp strokeWidth={1.5} size={20} />, text: 'Metal Rate/Type', to: '/metal-rate-type' },
        { icon: <Gem strokeWidth={1.5} size={20} />, text: 'Karat Master', to: '/karat-master' },
        { icon: <Building strokeWidth={1.5} size={20} />, text: 'Division Master', to: '/division-master' },
      ]
    },
    {
      key: 'costCenterMaster',
      icon: <CircleDollarSign strokeWidth={1.5} size={22} />,
      text: 'Cost Center Master',
      children: [
        { icon: <Gem strokeWidth={1.5} size={20} />, text: 'Gold', to: '/gold' },
        { icon: <RefreshCw strokeWidth={1.5} size={20} />, text: 'Charges', to: '/charge' },
        { icon: <Sparkles strokeWidth={1.5} size={20} />, text: 'Premium / Discount', to: '/premium-discount' },
        { icon: <FileText strokeWidth={1.5} size={20} />, text: 'Expense', to: '/expense' },
      ]
    },
    {
      key: 'categoryMaster',
      icon: <FolderTree strokeWidth={1.5} size={22} />,
      text: 'Category Master',
      children: [
        { icon: <Tags strokeWidth={1.5} size={20} />, text: 'Main Category', to: '/main-category' },
        { icon: <Layers strokeWidth={1.5} size={20} />, text: 'Sub Category', to: '/sub-category' },
        { icon: <Type strokeWidth={1.5} size={20} />, text: 'Type Master', to: '/type-master' },
      ]
    },
    {
      key: 'productMaster',
      icon: <Award strokeWidth={1.5} size={22} />,
      text: 'Product Master',
      children: [
        { icon: <Award strokeWidth={1.5} size={20} />, text: 'Brand Master', to: '/brand-master' },
        { icon: <Ruler strokeWidth={1.5} size={20} />, text: 'Size Master', to: '/size-master' },
        { icon: <Palette strokeWidth={1.5} size={20} />, text: 'Color Master', to: '/color-master' },
      ]
    },
    {
      key: 'businessMaster',
      icon: <Truck strokeWidth={1.5} size={22} />,
      text: 'Business Master',
      children: [
        { icon: <Truck strokeWidth={1.5} size={20} />, text: 'Vendor Master', to: '/vendor-master' },
        { icon: <Flag strokeWidth={1.5} size={20} />, text: 'Country Master', to: '/country-master' },
        { icon: <MapPin strokeWidth={1.5} size={20} />, text: 'Branch Master', to: '/branch-master' },
        { icon: <CircleDollarSign strokeWidth={1.5} size={20} />, text: 'Cost Center', to: '/cost-center' },
      ]
    },
    {
      key: 'chartAccounts',
      icon: <Database strokeWidth={1.5} size={22} />,
      text: 'Chart of Accounts',
      children: [
        { icon: <User strokeWidth={1.5} size={20} />, text: 'Trade Debtor', to: '/trade-debtor' },
      ]
    },
    {
      key: 'metalReports',
      icon: <BarChart3 strokeWidth={1.5} size={22} />,
      text: 'Metal Reports',
      children: [
        { icon: <BarChart3 strokeWidth={1.5} size={20} />, text: 'Stock Balance', to: '/stock-balance' },
        { icon: <Activity strokeWidth={1.5} size={20} />, text: 'Stock Movements', to: '/stock-movements' },
        { icon: <ClipboardList strokeWidth={1.5} size={20} />, text: 'Transaction Summary', to: '/transaction-summary' },
      ]
    },
    {
      key: 'generalMaster',
      icon: <Globe2 strokeWidth={1.5} size={22} />,
      text: 'General Master',
      children: [
        { icon: <CircleDollarSign strokeWidth={1.5} size={20} />, text: 'Currency Master', to: '/currency-master' },
        { icon: <Database strokeWidth={1.5} size={20} />, text: 'General Reports', to: '/general-reports' },
        { icon: <Search strokeWidth={1.5} size={20} />, text: 'Transaction Enquire', to: '/transaction-enquire' },
      ]
    },
    {
      key: 'metalTransaction',
      icon: <ShoppingCart strokeWidth={1.5} size={22} />,
      text: 'Metal Transaction',
      children: [
        { icon: <ShoppingCart strokeWidth={1.5} size={20} />, text: 'Purchase Fixing', to: '/purchase-fixing' },
        { icon: <HandHeart strokeWidth={1.5} size={20} />, text: 'Sales Fixing', to: '/sales-fixing' },
        { icon: <Package strokeWidth={1.5} size={20} />, text: 'Purchase Metal', to: '/purchase-metal' },
        { icon: <Send strokeWidth={1.5} size={20} />, text: 'Sales Metal', to: '/sales-metal' },
      ]
    },
    {
      key: 'financialTransaction',
      icon: <Wallet2 strokeWidth={1.5} size={22} />,
      text: 'Financial Transaction',
      children: [
        { icon: <CreditCard strokeWidth={1.5} size={20} />, text: 'Payment', to: '/payment' },
        { icon: <Banknote strokeWidth={1.5} size={20} />, text: 'Mode of Receipt', to: '/mode-of-receipt' },
      ]
    },
  ], []);

  // Function to find which section contains the current route
  const findActiveSection = (currentPath) => {
    for (const section of navigationSections) {
      const hasActiveChild = section.children.some(child => child.to === currentPath);
      if (hasActiveChild) {
        return section.key;
      }
    }
    return null;
  };

  // Function to check if a section has an active child
  const hasActiveChild = (section) => {
    return section.children.some(child => child.to === location.pathname);
  };

  // Auto-expand sections with active children on route change
  useEffect(() => {
    const activeSection = findActiveSection(location.pathname);
    if (activeSection) {
      setExpandedSections(prev => ({
        ...prev,
        [activeSection]: true
      }));
    }
  }, [location.pathname, navigationSections]);

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    toast.info("Logging out...", {
      position: "top-right",
      autoClose: 1500,
    });

    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
    localStorage.removeItem("rememberMe");

    setTimeout(() => {
      toast.success("Logged out successfully", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/");
    }, 800);
  };

  return (
    <div className="w-auto bg-white shadow-lg flex flex-col h-screen">
      {/* Fixed Logo Section */}
      <div className="">
        <img src={logo} alt="Bullion System Logo" className=" -mt-9 w-40 ml-10" />
      </div>

      {/* Scrollable Navigation - Hidden Scrollbar */}
      <div className="flex-1 overflow-y-auto -mt-10 px-4 py-4 scrollbar-hide">
        <nav className="space-y-2">
          {/* Dashboard */}
          <SidebarItem
            icon={<LayoutDashboard strokeWidth={1.5} size={22} />}
            text="Dashboard"
            to="/dashboard"
            active={location.pathname === "/dashboard"}
          />

          {/* Dynamic Navigation Sections */}
          {navigationSections.map((section) => (
            <SidebarSection
              key={section.key}
              icon={section.icon}
              text={section.text}
              sectionKey={section.key}
              expanded={expandedSections[section.key]}
              onToggle={() => toggleSection(section.key)}
              hasActiveChild={hasActiveChild(section)}
            >
              {section.children.map((child, index) => (
                <SidebarSubItem
                  key={`${section.key}-${index}`}
                  icon={child.icon}
                  text={child.text}
                  to={child.to}
                  active={location.pathname === child.to}
                />
              ))}
            </SidebarSection>
          ))}

          {/* System Settings Section */}
          <div className="pt-6">
            <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 px-3">
              System Settings
            </div>
            <SidebarItem
              icon={<Shield strokeWidth={1.5} size={22} />}
              text="Security"
              to="/security"
              active={location.pathname === "/security"}
            />
            <SidebarItem
              icon={<Settings strokeWidth={1.5} size={22} />}
              text="Settings"
              to="/settings"
              active={location.pathname === "/settings"}
            />
          </div>
        </nav>
      </div>

      {/* Fixed Footer Section */}
      <div className="flex-shrink-0 border-t border-gray-100 p-4 space-y-2">
        <SidebarItem
          icon={<HelpCircle strokeWidth={1.5} size={22} />}
          text="Help Center"
          to="/help-center"
          active={location.pathname === "/help-center"}
        />
        <div onClick={handleLogout} className="cursor-pointer">
          <div className="flex items-center gap-3 p-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all">
            <LogOut strokeWidth={1.5} size={22} />
            <span className="font-medium">Log Out</span>
          </div>
        </div>
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="text-sm"
      />

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
        }
      `}</style>
    </div>
  );
};

// Optimized components with React.memo for better performance
const SidebarItem = React.memo(({ icon, text, to, active }) => (
  <Link to={to} className="block">
    <div
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium shadow-md"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      {icon}
      <span className="font-medium truncate">{text}</span>
    </div>
  </Link>
));

const SidebarSection = React.memo(({ icon, text, children, expanded, onToggle, hasActiveChild }) => (
  <div className="w-full">
    <div
      onClick={onToggle}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
        hasActiveChild
          ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200 font-medium"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      {icon}
      <span className="font-medium flex-1 truncate">{text}</span>
      <div className="transform transition-transform duration-200">
        {expanded ? (
          <ChevronDown strokeWidth={1.5} size={18} />
        ) : (
          <ChevronRight strokeWidth={1.5} size={18} />
        )}
      </div>
    </div>
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="ml-4 mt-1 space-y-1">
        {children}
      </div>
    </div>
  </div>
));

const SidebarSubItem = React.memo(({ icon, text, to, active }) => (
  <Link to={to} className="block">
    <div
      className={`flex items-center gap-3 p-2 pl-6 rounded-lg cursor-pointer transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium shadow-sm"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-700"
      }`}
    >
      {icon}
      <span className="font-medium text-sm truncate">{text}</span>
    </div>
  </Link>
));

// Add display names for better debugging
SidebarItem.displayName = 'SidebarItem';
SidebarSection.displayName = 'SidebarSection';
SidebarSubItem.displayName = 'SidebarSubItem';

export default Sidebar;