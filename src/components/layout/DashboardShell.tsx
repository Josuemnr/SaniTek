import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Settings, LogOut, Search, Bell } from "lucide-react";
import logo from '@/assets/logo.png';
import { NAV_LINKS, SCREEN_CONFIGS } from '@/lib/nav-constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active }: SidebarItemProps) => (
  <div className={cn(
    "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors",
    active
      ? "bg-sidebar-accent text-sidebar-foreground font-bold shadow-sm"
      : "hover:bg-sidebar-accent/30 text-gray-700 hover:text-gray-900"
  )}>
    <Icon className="size-5" />
    <span className="font-medium text-sm">{label}</span>
  </div>
);

export function DashboardShell() {
  const { pathname } = useLocation();

  const activeLink = NAV_LINKS.find((l) => l.href === pathname);
  const screenConfig = SCREEN_CONFIGS[pathname];
  const pageTitle = activeLink?.pageTitle ?? screenConfig?.pageTitle ?? "";
  const subtitle  = activeLink?.subtitle  ?? screenConfig?.subtitle;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-sidebar p-4 gap-6">
        <div className="flex items-center gap-3 px-2 py-4">
          <img src={logo} alt="SaniTek Logo" className="h-10 w-auto object-contain" />
          <h1 className="text-xl font-black tracking-tighter text-sidebar-foreground">SaniTek</h1>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          {NAV_LINKS.map((item) => (
            <Link key={item.title} to={item.href} className="no-underline">
              <SidebarItem
                icon={item.icon}
                label={item.title}
                active={pathname === item.href}
              />
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t pt-4">
          <Link to="/Perfil_Usuario" className="no-underline">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent/30 cursor-pointer transition-colors">
              <Avatar className="h-9 w-9 border">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">CM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold truncate text-gray-700">Carlos Méndez</span>
                <span className="text-[10px] text-muted-foreground truncate">Gerente logística</span>
              </div>
            </div>
          </Link>
          <div className="flex flex-col gap-1">
            <SidebarItem icon={Settings} label="Configuración" />
            <Link to="/login" className="no-underline">
              <SidebarItem icon={LogOut} label="Cerrar sesión" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-muted/5">
        <header className="min-h-16 border-b bg-background/50 backdrop-blur-md flex items-center px-8 justify-between shrink-0 py-3">
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-bold tracking-tight text-foreground leading-tight">{pageTitle}</h2>
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4 max-w-md w-full justify-end">
            <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar en la sección..."
                className="pl-9 h-9 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full border-2 border-background" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
