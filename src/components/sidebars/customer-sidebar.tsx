import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Bell,
  User,
  History,
  Landmark,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useRole } from "@/lib/role-context";
import type { Member } from "@shared/schema";

const PANEL_PATHS = {
  customer: "/wk-panel-2210",
};

const menuItems = [
  {
    title: "Dashboard",
    url: `${PANEL_PATHS.customer}/`,
    icon: LayoutDashboard,
  },
  {
    title: "Saldo Saya",
    url: `${PANEL_PATHS.customer}/balance`,
    icon: Wallet,
  },
  {
    title: "Deposit",
    url: `${PANEL_PATHS.customer}/deposit`,
    icon: ArrowDownCircle,
  },
  {
    title: "Tarik Dana",
    url: `${PANEL_PATHS.customer}/withdraw`,
    icon: ArrowUpCircle,
  },
  {
    title: "Riwayat Transaksi",
    url: `${PANEL_PATHS.customer}/history`,
    icon: History,
  },
  {
    title: "Rekening Bank",
    url: `${PANEL_PATHS.customer}/bank`,
    icon: Landmark,
  },
  {
    title: "Notifikasi",
    url: `${PANEL_PATHS.customer}/notifications`,
    icon: Bell,
  },
  {
    title: "Profil Saya",
    url: `${PANEL_PATHS.customer}/profile`,
    icon: User,
  },
];

export function CustomerSidebar() {
  const [location] = useLocation();
  const { currentUser } = useRole();

  const { data: members } = useQuery<Member[]>({
    queryKey: ["/api/members"],
  });

  const customerId = currentUser?.id || "m1";
  const myAccount = members?.find((m) => m.id === customerId);

  const displayName = myAccount?.phone || myAccount?.email || "Akun Kerja";

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-600">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-sidebar-foreground truncate max-w-[160px]">
              {displayName}
            </span>
            <Badge className="w-fit bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-[10px]">
              Kredit Skor: {myAccount?.creditScore ?? 100}
            </Badge>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Pelanggan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.url || 
                  (item.url !== "/" && location.startsWith(item.url));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      data-testid={`nav-customer-${item.url.replace(`${PANEL_PATHS.customer}/`, "").replace("/", "") || "dashboard"}`}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-sidebar-foreground/50">
          Akun Kerja v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
