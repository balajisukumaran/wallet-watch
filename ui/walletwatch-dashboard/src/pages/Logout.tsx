import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/constants";
import { useAuth } from "@/auth";

const Logout = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  useEffect(() => {
    setTimeout(() => {
      setToken("");
      navigate(ROUTES.LOGIN, { replace: true });
    }, 1500);
  }, []);
  return (
    <main className="h-screen p-4 pb-8 md:p-4 md:pb-4">
      <Card className="w-vw h-full grid place-content-center">
        <div className="loader text-xl md:text-3xl"></div>
      </Card>
    </main>
  );
};

export default Logout;
