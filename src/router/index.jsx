import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../components/login";
import Protect from "../protectorRouter/adminProtect";
import NotFound from "../components/notFound";
import Dashboard from "../pages/homePage";
import DivisionPage from "../pages/divisionPage";
import KaratPage from "../pages/karatPage";
import MetalRatePage from "../pages/metalRatePage";
import MetalStock from "../pages/metalStock";
import TradeDebtor from "../pages/tradeDebtorPage";
import Layout from "../components/Layout";
import Currency from "../pages/currencyPage";
import BranchMaster from "../pages/branchPage";
import CostCenterPage from "../pages/costCenterPage";
import CountryPage from "../pages/countryPage";
import VendorMaster from "../pages/vendorPage";
import BrandPage from "../pages/brandPage";
import SizePage from "../pages/sizePage";
import ColorPage from "../pages/colorPage";
import CategoryPage from "../pages/categoryPage";
import SubCategoryPage from "../pages/subCategoryPage";
import TypeMasterPage from "../pages/typeMasterPage";
import GoldCenterPage from "../pages/goldCenterPage";
import ChargeCostPage from "../pages/chargeCostPage";
import PremiumDiscountPage from "../pages/premiumDiscountPage";
import ExpenseCostPage from "../pages/ExpenseCostPage";
export default function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route element={<Protect />}> */}
      <Route element={<Layout />}>
        <Route path="/trade-debtor" element={<TradeDebtor />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/division-master" element={<DivisionPage />} />
        <Route path="/karat-master" element={<KaratPage />} />
        <Route path="/metal-rate-type" element={<MetalRatePage />} />
        <Route path="/metal-stock" element={<MetalStock />} />
        <Route path="/currency-master" element={<Currency />} />
        <Route path="/branch-master" element={<BranchMaster />} />
        <Route path="/cost-center" element={<CostCenterPage />} />
        <Route path="/country-master" element={<CountryPage />} />
        <Route path="/vendor-master" element={<VendorMaster />} />
        <Route path="/brand-master" element={<BrandPage />} />
        <Route path="/size-master" element={<SizePage />} />
        <Route path="/color-master" element={<ColorPage />} />
        <Route path="/main-category" element={<CategoryPage />} />
        <Route path="/sub-category" element={<SubCategoryPage />} />
        <Route path="/type-master" element={<TypeMasterPage />} />
        <Route path="/gold" element={<GoldCenterPage />} />
        <Route path="/charge" element={<ChargeCostPage />} />
        <Route path="/premium-discount" element={<PremiumDiscountPage />} />
        <Route path="/expense" element={<ExpenseCostPage />} />
      </Route>
      {/* </Route> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
