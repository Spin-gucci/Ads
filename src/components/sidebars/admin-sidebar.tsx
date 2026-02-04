import { useLocation, Link } from "wouter";
import {
  LayoutDashboard,
  Users,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Lock,
  AlertTriangle,
  Shield,
  UserCheck,
  UserPlus,
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
  admin: "/ad-panel-4432",
};

const menuItems = [
  {
    title: "Dashboard",
    url: `${PANEL_PATHS.admin}/`,
    icon: LayoutDashboard,
  },
  {
    title: "Kelola Agent",
    url: `${PANEL_PATHS.admin}/agents`,
    icon: UserCheck,
  },
  {
    title: "Semua Anggota",
    url: `${PANEL_PATHS.admin}/members`,
    icon: Users,
  },
  {
    title: "Persetujuan Anggota",
    url: `${PANEL_PATHS.admin}/member-approval`,
    icon: UserPlus,
  },
  {
    title: "Persetujuan Deposit",
    url: `${PANEL_PATHS.admin}/deposit-approval`,
    icon: ArrowDownCircle,
  },
  {
    title: "Persetujuan Penarikan",
    url: `${PANEL_PATHS.admin}/withdrawal-approval`,
    icon: ArrowUpCircle,
  },
  {
    title: "Isi Saldo",
    url: `${PANEL_PATHS.admin}/balance`,
    icon: Wallet,
  },
  {
    title: "Kunci Akun",
    url: `${PANEL_PATHS.admin}/account-lock`,
    icon: Lock,
  },
  {
    title: "Deteksi Penarikan",
    url: `${PANEL_PATHS.admin}/withdrawal-detection`,
    icon: AlertTriangle,
  },
  {
    title: "Manajemen Produk",
    url: `${PANEL_PATHS.admin}/products`,
    icon: Package,
  },
  {
    title: "Bank Tujuan Deposit",
    url: `${PANEL_PATHS.admin}/system-banks`,
    icon: Landmark,
  },
];

export function AdminSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-sidebar-foreground">
              Admin Panel
            </span>
            <Badge className="w-fit bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px]">
              Manajemen
            </Badge>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Admin</SidebarGroupLabel>
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
                      data-testid={`nav-admin-${item.url.replace("/admin/", "").replace("/", "") || "dashboard"}`}
                    >
                      <Link href={item.url} className="bg-[transparent]">
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
          Admin Panel v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
