import { useNavigate, useLocation } from "react-router";
import { LogOut, Activity } from "lucide-react";
import { UseAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState, signOut } = UseAuth();
  const { user } = authState;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-blue-950 shadow-md px-6 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Activity size={26} className="text-primary-700" />
          <h1 className="text-2xl font-bold text-primary-700">DevFinance</h1>
        </div>

        <nav className="flex flex-wrap gap-2 md:gap-3">
          <button
            type="button"
            className={`px-4 py-2 cursor-pointer transition ${
              isActive("/dashboard") ? "text-primary-700" : "hover:text-primary-700"
            }`}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={`px-4 py-2 cursor-pointer transition ${
              isActive("/transactions") ? "text-primary-700" : "hover:text-primary-700"
            }`}
            onClick={() => navigate("/transactions")}
          >
            Transações
          </button>
        </nav>

        {user && (
          <div className="flex items-center gap-3 flex-wrap">
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt={user.displayName || "Usuário"}
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
            <span className="font-medium text-gray-100 text-sm">
              {user.displayName || "Sem nome"}
            </span>
            <button
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                signOut();
                navigate("/");
              }}
              className="flex items-center gap-1 text-red-500 hover:text-red-600 transition text-sm cursor-pointer"
            >
              <LogOut size={24} className="text-gray-300" />
              <span>Sair</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
