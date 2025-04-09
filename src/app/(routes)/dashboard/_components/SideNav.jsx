import React, { useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  CircleDollarSign,
  TrendingUp,
  TrendingDownIcon,
  Wallet,
  IndianRupee,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashboard/incomes",
    },
    {
      id: 3,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 4,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 5,
      name: "Investments",
      icon: TrendingUp,
      path: "/dashboard/investments",
    },
    {
      id: 6,
      name: "Debts/Emi",
      icon: TrendingDownIcon,
      path: "/dashboard/emi",
    },
    {
      id: 7,
      name: "My savings",
      icon: Wallet,
      path: "/dashboard/savings",
    },
    {
      id: 8,
      name: "Tax",
      icon: IndianRupee,
      path: "/dashboard/Tax",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen p-5 border shadow-sm">
      <div className="flex flex-row items-center">
        <Image src="/images/my-logo.png" alt="logo" width={40} height={25} />
        <Link href="/dashboard">
        <span className="text-gray-800 font-bold text-3xl cursor-pointer">
            Finac
          </span>
        </Link>
      </div>

      {/* Dropdown Menu for the Navigation */}
      <DropdownMenu>
        <DropdownMenuTrigger className="mt-5 px-4 py-5 ml-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-all text-m sm:text-base">
          Track your finance
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-black text-white sm:w-70 p-2">
          <DropdownMenuSeparator className="bg-gray-600" />
          {menuList.map((menu, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link
                href={menu.path}
                className="flex gap-2 items-center px-3 py-2 rounded-md text-lg sm:text-xl hover:bg-gray-700"
              >
                <menu.icon className="text-white" />
                <span className="text-gray-300">{menu.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton />
        <span className="text-black">Profile</span>
      </div>
    </div>
  );
}

export default SideNav;
