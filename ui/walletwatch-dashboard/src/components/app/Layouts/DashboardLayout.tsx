import { Outlet } from "react-router-dom";

import { Resolutions, useMediaQuery } from "@/hooks/useMediaQuery";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SideBar from "@/components/app/SideBar";
import { MenuDrawer } from "@/components/app/MenuDrawer";

const DashboardLayout = () => {
  const isDesktop = useMediaQuery(Resolutions.desktop);

  return (
    <main className="h-screen p-4 pb-8 md:p-4 md:pb-4">
      <Card className="w-vw h-full bg-transparent md:flex overflow-y-auto md:overflow-hidden">
        {isDesktop ? <SideBar /> : <MenuDrawer />}
        {isDesktop && <Separator orientation="vertical" className="h-full" />}
        <Card className="border-none bg-transparent w-full overflow-hidden md:overflow-y-auto">
          <Outlet />
        </Card>
      </Card>
    </main>
  );
};

export default DashboardLayout;
