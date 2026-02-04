import { useLocation, Link } from "wouter";
import { LayoutGrid, ShoppingBag, BookOpen, User, Bell, RefreshCcw, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useRole } from "@/lib/role-context";
import type { Notification } from "@shared/schema";

const PANEL_PATH = "/wk-panel-2210";

function formatDate(date: Date | string | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

const navItems = [
  { title: "Dashboard", url: `${PANEL_PATH}/`, icon: LayoutGrid, testId: "nav-customer-dashboard" },
  { title: "Mall", url: `${PANEL_PATH}/mall`, icon: ShoppingBag, testId: "nav-customer-mall" },
  { title: "Aturan", url: `${PANEL_PATH}/aturan`, icon: BookOpen, testId: "nav-customer-aturan" },
  { title: "Akun", url: `${PANEL_PATH}/akun`, icon: User, testId: "nav-customer-akun" },
];

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export function CustomerLayout({ children }: CustomerLayoutProps) {
  const [location] = useLocation();
  const { currentUser } = useRole();
  const customerId = currentUser?.id || "m1";

  const { data: notifications, refetch: refetchNotifications } = useQuery<Notification[]>({
    queryKey: ["/api/notifications"],
  });

  const myNotifications = notifications?.filter((n) => n.memberId === customerId) || [];
  const unreadNotifications = myNotifications.filter((n) => !n.isRead);

  const markAllReadMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("PATCH", `/api/notifications/member/${customerId}/read-all`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
    },
  });

  const handleRefresh = () => {
    refetchNotifications();
    queryClient.invalidateQueries({ queryKey: ["/api/members"] });
    queryClient.invalidateQueries({ queryKey: ["/api/deposits"] });
    queryClient.invalidateQueries({ queryKey: ["/api/withdrawals"] });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const isActive = (url: string) => {
    if (url === `${PANEL_PATH}/`) {
      return location === url;
    }
    return location.startsWith(url);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card border-b">
        <div className="flex items-center justify-end gap-2 px-4 py-2">
          <Popover onOpenChange={(open) => {
            if (open && unreadNotifications.length > 0) {
              markAllReadMutation.mutate();
            }
          }}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                data-testid="button-header-notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {unreadNotifications.length > 9 ? "9+" : unreadNotifications.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between border-b p-3">
                <h4 className="font-semibold">Notifikasi</h4>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {myNotifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Tidak ada notifikasi
                  </div>
                ) : (
                  myNotifications.slice(0, 10).map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex gap-3 border-b p-3 last:border-0 ${!notification.isRead ? "bg-muted/50" : ""}`}
                      data-testid={`header-notification-${notification.id}`}
                    >
                      <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${!notification.isRead ? "" : "text-muted-foreground"}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            data-testid="button-header-refresh"
          >
            <RefreshCcw className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-auto pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t z-50 pb-safe">
        <div className="flex justify-around items-center gap-2 max-w-lg mx-auto py-2">
          {navItems.map((item) => {
            const active = isActive(item.url);
            return (
              <Link key={item.title} href={item.url}>
                <div
                  className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg hover-elevate cursor-pointer ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                  data-testid={item.testId}
                >
                  <item.icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
                  <span className={`text-xs ${active ? "font-semibold" : ""}`}>{item.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
