import { Outlet } from "react-router-dom";
import { Card } from "@/components/ui/card";
import SideBar from "./SideBar";
import { Separator } from "../ui/separator";

const Layout = () => {
  return (
    <Card className="w-vw h-svh m-4 bg-transparent md:flex items-center">
      <SideBar />
      <Separator orientation="vertical" className="h-full" />
      <Card className="border-none bg-transparent w-full">
        <Outlet />
      </Card>
    </Card>
  );
};

export default Layout;
