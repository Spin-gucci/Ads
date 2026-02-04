import { useRole } from "@/lib/role-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, UserCheck, User, LogOut } from "lucide-react";
import type { UserRole } from "@shared/schema";

const roleConfig: Record<UserRole, { label: string; icon: typeof Crown; color: string }> = {
  master: {
    label: "Master",
    icon: Crown,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  admin: {
    label: "Admin",
    icon: Shield,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  agent: {
    label: "Agent",
    icon: UserCheck,
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  customer: {
    label: "Pelanggan",
    icon: User,
    color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
};

export function RoleSwitcher() {
  const { currentUser, logout } = useRole();

  if (!currentUser) return null;

  const config = roleConfig[currentUser.role];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
      <span className="hidden sm:inline text-sm font-medium">{currentUser.name}</span>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={logout}
        title="Keluar"
        data-testid="button-logout"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
