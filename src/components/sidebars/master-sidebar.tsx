import { useLocation, Link } from "wouter";
import {
  LayoutDashboard,
  Users,
  Shield,
  UserCheck,
  Settings,
  Activity,
  Crown,
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
  master: "/ms-panel-9921",
};

const menuItems = [
  {
    title: "Dashboard",
    url: `${PANEL_PATHS.master}/`,
    icon: LayoutDashboard,
  },
  {
    title: "Kelola Admin",
    url: `${PANEL_PATHS.master}/admins`,
    icon: Shield,
  },
  {
    title: "Kelola Agent",
    url: `${PANEL_PATHS.master}/agents`,
    icon: UserCheck,
  },
  {
    title: "Semua Anggota",
    url: `${PANEL_PATHS.master}/members`,
    icon: Users,
  },
  {
    title: "Log Aktivitas",
    url: `${PANEL_PATHS.master}/activities`,
    icon: Activity,
  },
  {
    title: "Manajemen Produk",
    url: `${PANEL_PATHS.master}/products`,
    icon: Package,
  },
  {
    title: "Bank Tujuan Deposit",
    url: `${PANEL_PATHS.master}/system-banks`,
    icon: Landmark,
  },
  {
    title: "Pengaturan Sistem",
    url: `${PANEL_PATHS.master}/settings`,
    icon: Settings,
  },
];

export function MasterSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-purple-600">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-sidebar-foreground">
              Master Panel
            </span>
            <Badge className="w-fit bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-[10px]">
              Kontrol Penuh
            </Badge>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Master</SidebarGroupLabel>
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
                      data-testid={`nav-master-${item.url.replace("/master/", "").replace("/", "") || "dashboard"}`}
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
          Master Panel v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
