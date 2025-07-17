import { useEffect } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton.tsx";
import { UseAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Login = () => {
  const { signWithGoogle, authState } = UseAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signWithGoogle();
    } catch (err) {
      console.error("Erro ao fazer login com Google:", err);
    }
  };
  useEffect(() => {
    if (authState.user && !authState.loading) {
      navigate("/dashboard");
    }
  }, [authState.user, authState.loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8">
        <header>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">DevFinance</h1>
          <p className="mt-2 text-center text-sm text-gray-700">
            Gerencie suas finanças de forma simples e eficiente
          </p>
        </header>
        <main className="mt-8 bg-white py-8 px-4 shadow-md rounded-lg sm:px-10 space-y-6">
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-900">Faça login para continuar</h2>
            <p className="mt-2 text-sm text-gray-700">
              Acesse sua conta para começar a gerenciar suas finanças
            </p>
          </section>
          <GoogleLoginButton onClick={handleLogin} isloading={false} />

          {authState.error && (
            <div className="bg-red-50 text-center text-red-700 mt-4">
              <p>{authState.error}Erro no sistema</p>
            </div>
          )}
          <footer className="mt-6">
            <p className="mt-2 text-center text-sm text-gray-400">
              Ao fazer login, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Login;
