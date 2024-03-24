import { Link, useLocation } from "react-router-dom";
import { BadgeDollarSign, Receipt, Wallet } from "lucide-react";

import { ROUTES } from "@/routes/constants";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const SideBar = () => {
  const location = useLocation();
  const currentPage = location.pathname.split("/").pop() || "";

  return (
    <Card className="border-none bg-transparent h-full w-full md:max-w-52 flex flex-col justify-between">
      <CardHeader className="flex flex-col gap-4 items-center">
        <Avatar className="w-24 h-24">
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
        <h3 className="w-full px-4 text-center">Balaj CR</h3>{" "}
        {/** Todo: Read from state */}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <Link to={ROUTES.BUDGET}>
            <Button
              variant={
                ROUTES.BUDGET.includes(currentPage) ||
                ROUTES.DASHBOARD.includes(currentPage)
                  ? "default"
                  : "ghost"
              }
              className="flex justify-start p-4 gap-2 text-lg w-full"
            >
              <Wallet />
              Budget
            </Button>
          </Link>
          <Link to={ROUTES.INCOME}>
            <Button
              variant={
                ROUTES.INCOME.includes(currentPage) ? "default" : "ghost"
              }
              className="flex justify-start p-4 gap-2 text-lg w-full"
            >
              <BadgeDollarSign />
              Income
            </Button>
          </Link>
          <Link to={ROUTES.TRANSACTION}>
            <Button
              variant={
                ROUTES.TRANSACTION.includes(currentPage) ? "default" : "ghost"
              }
              className="flex justify-start p-4 gap-2 text-lg w-full"
            >
              <Receipt />
              Transaction
            </Button>
          </Link>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={ROUTES.LOGOUT} className="w-full">
          <Button variant={"destructive"} className="w-full">
            Logout
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SideBar;
