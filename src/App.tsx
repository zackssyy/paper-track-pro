import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AppLayout } from "./components/layout/AppLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import AuditLogs from "./pages/admin/AuditLogs";
import FailedTransactions from "./pages/admin/FailedTransactions";
import ItemMaster from "./pages/ItemMaster";
import VendorMaster from "./pages/VendorMaster";
import QuantityMaster from "./pages/QuantityMaster";
import OrderEntry from "./pages/OrderEntry";
import ChallanEntry from "./pages/ChallanEntry";
import InvoiceEntry from "./pages/InvoiceEntry";
import ItemLedger from "./pages/ItemLedger";
import OrderRegister from "./pages/OrderRegister";
import ChallanRegister from "./pages/ChallanRegister";
import InvoiceRegister from "./pages/InvoiceRegister";
import VendorLedger from "./pages/VendorLedger";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/admin/*" element={
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/users" element={<UserManagement />} />
                  <Route path="/audit-logs" element={<AuditLogs />} />
                  <Route path="/failed-transactions" element={<FailedTransactions />} />
                </Routes>
              </AdminLayout>
            } />
            
            <Route path="/*" element={
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/item-master" element={<ItemMaster />} />
                  <Route path="/vendor-master" element={<VendorMaster />} />
                  <Route path="/quantity-master" element={<QuantityMaster />} />
                  <Route path="/order-entry" element={<OrderEntry />} />
                  <Route path="/challan-entry" element={<ChallanEntry />} />
                  <Route path="/invoice-entry" element={<InvoiceEntry />} />
                  <Route path="/item-ledger" element={<ItemLedger />} />
                  <Route path="/order-register" element={<OrderRegister />} />
                  <Route path="/challan-register" element={<ChallanRegister />} />
                  <Route path="/invoice-register" element={<InvoiceRegister />} />
                  <Route path="/vendor-ledger" element={<VendorLedger />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
