import { useLocation, Link } from "wouter";
import {
  LayoutDashboard,
  Users,
  Wallet,
  ArrowDownCircle,
  Lock,
  AlertTriangle,
  Shield,
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

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Semua Anggota",
    url: "/members",
    icon: Users,
  },
  {
    title: "Isi Saldo",
    url: "/balance",
    icon: Wallet,
  },
  {
    title: "Persetujuan Deposit",
    url: "/deposits",
    icon: ArrowDownCircle,
  },
  {
    title: "Kunci Akun",
    url: "/account-lock",
    icon: Lock,
  },
  {
    title: "Deteksi Penarikan",
    url: "/withdrawal-detection",
    icon: AlertTriangle,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-sidebar-primary">
            <Shield className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-sidebar-foreground">
              Admin Panel
            </span>
            <span className="text-xs text-sidebar-foreground/60">
              Sistem Kontrol
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      data-testid={`nav-${item.url.replace("/", "") || "dashboard"}`}
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
          Panel Sistem v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
