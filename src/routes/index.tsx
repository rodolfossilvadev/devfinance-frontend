import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/home";
import Login from "../pages/login";
import { AuthProvider } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import AppLayout from "../layout/AppLayout";
import TransactionsList from "../pages/listTransactions";
import Transactions from "../pages/transactions";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoutes />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionsList />} />
              <Route path="/transactions/new" element={<Transactions />} />
            </Route>
          </Route>

          <Route path="*" element={<h2>Página não encontrada</h2>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
