import { Link, useLocation } from "react-router-dom";
import {
  BadgeDollarSign,
  CircleChevronUp,
  Receipt,
  Wallet,
} from "lucide-react";

import { ROUTES } from "@/routes/constants";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function MenuDrawer() {
  const location = useLocation();
  const currentPage = location.pathname.split("/").pop() || "";
  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger
        asChild
        className="fixed left-1/2 -translate-x-1/2 bottom-4 bg-slate-50 p-1.5 rounded-full z-10"
      >
        <Button variant="outline">
          <CircleChevronUp className="stroke-slate-900" />
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 bg-black/40" />
        <DrawerContent className="mx-1">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Wallet Watch</DrawerTitle>
              <DrawerDescription>
                You better watch your wallet !
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid grid-cols-3 gap-2 w-full px-4">
              <DrawerClose asChild>
                <Link
                  to={ROUTES.BUDGET}
                  className="flex justify-center items-center flex-1 mx-2 border rounded-md"
                >
                  <Button
                    variant={
                      ROUTES.BUDGET.includes(currentPage) ||
                      ROUTES.DASHBOARD.includes(currentPage)
                        ? "default"
                        : "ghost"
                    }
                    className="w-full flex flex-col gap-2 p-2 text-sm h-auto"
                  >
                    <Wallet className="size-8" />
                    Budget
                  </Button>
                </Link>
              </DrawerClose>
              <DrawerClose asChild>
                <Link
                  to={ROUTES.INCOME}
                  className="flex justify-center items-center flex-1 mx-2 border rounded-md"
                >
                  <Button
                    variant={
                      ROUTES.INCOME.includes(currentPage) ? "default" : "ghost"
                    }
                    className="w-full flex flex-col gap-2 p-2 text-sm h-auto"
                  >
                    <BadgeDollarSign className="size-8" />
                    Income
                  </Button>
                </Link>
              </DrawerClose>
              <DrawerClose asChild>
                <Link
                  to={ROUTES.TRANSACTION}
                  className="flex justify-center items-center flex-1 mx-2 border rounded-md"
                >
                  <Button
                    variant={
                      ROUTES.TRANSACTION.includes(currentPage)
                        ? "default"
                        : "ghost"
                    }
                    className="w-full flex flex-col gap-2 p-2 text-sm h-auto"
                  >
                    <Receipt className="size-8" />
                    Transaction
                  </Button>
                </Link>
              </DrawerClose>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Link to={ROUTES.LOGOUT} className="w-full">
                  <Button variant={"destructive"} className="w-full">
                    Logout
                  </Button>
                </Link>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
