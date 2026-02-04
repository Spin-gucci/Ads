import { useLocation, Link } from "wouter";
import {
  LayoutDashboard,
  Users,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  UserCheck,
  UserPlus,
  TrendingUp,
  Package,
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

const PANEL_PATHS = {
  agent: "/ag-panel-7781",
};

const menuItems = [
  {
    title: "Dashboard",
    url: `${PANEL_PATHS.agent}/`,
    icon: LayoutDashboard,
  },
  {
    title: "Pelanggan Saya",
    url: `${PANEL_PATHS.agent}/customers`,
    icon: Users,
  },
  {
    title: "Persetujuan Anggota",
    url: `${PANEL_PATHS.agent}/member-approval`,
    icon: UserPlus,
  },
  {
    title: "Persetujuan Deposit",
    url: `${PANEL_PATHS.agent}/deposit-approval`,
    icon: ArrowDownCircle,
  },
  {
    title: "Persetujuan Penarikan",
    url: `${PANEL_PATHS.agent}/withdrawal-approval`,
    icon: ArrowUpCircle,
  },
  {
    title: "Isi Saldo Pelanggan",
    url: `${PANEL_PATHS.agent}/balance`,
    icon: Wallet,
  },
  {
    title: "Komisi Saya",
    url: `${PANEL_PATHS.agent}/commission`,
    icon: TrendingUp,
  },
  {
    title: "Manajemen Produk",
    url: `${PANEL_PATHS.agent}/products`,
    icon: Package,
  },
  {
    title: "Bank Tujuan Deposit",
    url: `${PANEL_PATHS.agent}/system-banks`,
    icon: Landmark,
  },
];

export function AgentSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-600">
            <UserCheck className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-sidebar-foreground">
              Agent Panel
            </span>
            <Badge className="w-fit bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px]">
              Agen Penjualan
            </Badge>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Agent</SidebarGroupLabel>
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
                      data-testid={`nav-agent-${item.url.replace("/agent/", "").replace("/", "") || "dashboard"}`}
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
          Agent Panel v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
