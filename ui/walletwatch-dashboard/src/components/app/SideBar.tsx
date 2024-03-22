import { Link } from "react-router-dom";

import { Avatar, AvatarFallback } from "..//ui/avatar";
import { Button } from "../ui/button";
import { ROUTES } from "@/routes/constants";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const SideBar = () => {
  return (
    <Card className="border-none bg-transparent h-full w-full md:max-w-64 flex flex-col justify-between">
      <CardHeader className="flex flex-col gap-4">
        <Avatar className="w-24 h-24">
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
        <h3 className="w-full px-4">Balaj CR</h3> {/** Todo: Read from state */}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Link to={ROUTES.BUDGET}>
            <Button variant={"ghost"}>Budget</Button>
          </Link>
          <Link to={ROUTES.INCOME}>
            <Button variant={"ghost"}>Budget</Button>
          </Link>
          <Link to={ROUTES.TRANSACTION}>
            <Button variant={"ghost"}>Transaction</Button>
          </Link>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={ROUTES.LOGOUT}>
          <Button variant={"destructive"}>Logout</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SideBar;
