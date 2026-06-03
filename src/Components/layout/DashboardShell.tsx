import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LogOut, CreditCard, UserCog, ShieldCheck, Users, ChevronUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from '@/assets/logo.png';
import { NAV_LINKS, SCREEN_CONFIGS } from '@/lib/nav-constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

const ADMIN_LINKS = [
  { title: "Estatus de usuarios",     href: "/Gestion_Usuarios", icon: Users },
  { title: "Administrar Suscripción", href: "/Suscrpcion",       icon: CreditCard },
  { title: "Configuración de Perfil", href: "/Perfil_Usuario",   icon: UserCog },
  { title: "Panel SaniTek",           href: "/superadmin",       icon: ShieldCheck },
];

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

function roleLabel(role: string | null) {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'Super administrador';
    case 'ADMIN':
      return 'Administrador';
    case 'USER':
      return 'Usuario';
    default:
      return 'Sin rol';
  }
}

function getInitials(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'ST';
}

export function DashboardShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout, role } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const activeLink = NAV_LINKS.find((l) => l.href === pathname);
  const screenConfig = SCREEN_CONFIGS[pathname];
  const pageTitle = activeLink?.pageTitle ?? screenConfig?.pageTitle ?? "";
  const subtitle  = activeLink?.subtitle  ?? screenConfig?.subtitle;

  const filteredAdminLinks = ADMIN_LINKS.filter((item) => {
    if (item.href === '/Gestion_Usuarios') return role === 'ADMIN';
    if (item.href === '/superadmin') return role === 'SUPER_ADMIN';
    return true;
  });
  const userName = user?.displayName || user?.email || 'Usuario SaniTek';
  const userRole = roleLabel(role);
  const userInitials = getInitials(userName);

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

        <div className="mt-auto flex flex-col gap-2 border-t pt-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent/30 cursor-pointer transition-colors group border-none bg-transparent w-full text-left outline-none">
              <Avatar className="h-9 w-9 border">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden flex-1">
                <span className="text-xs font-bold truncate text-gray-700">{userName}</span>
                <span className="text-[10px] text-muted-foreground truncate">{userRole}</span>
              </div>
              <ChevronUp className="size-4 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-56 mb-2 ml-4">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Configuración</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {filteredAdminLinks.map((item) => (
                  <DropdownMenuItem key={item.title} onClick={() => navigate(item.href)}>
                    <item.icon className="mr-2 size-4" />
                    <span>{item.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 size-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-muted/5">
        <header className="min-h-16 border-b bg-background/50 backdrop-blur-md flex items-center px-8 justify-between shrink-0 py-3">
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-bold tracking-tight text-foreground leading-tight">{pageTitle}</h2>
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
