import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LogOut, CreditCard, UserCog, ShieldCheck, Users, ChevronUp, Search, Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from '@/assets/logo.svg';
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
    "flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200",
    active
      ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/20"
      : "hover:bg-white/10 text-blue-100 hover:text-white"
  )}>
    <Icon className={cn("size-5", active ? "text-white" : "text-blue-300")} />
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
      <aside 
        className="hidden md:flex flex-col w-72 border-r p-6 gap-8 transition-colors shadow-2xl z-20"
        style={{ background: 'rgba(20, 35, 90, 0.95)', borderColor: 'rgba(100, 140, 255, 0.25)' }}
      >
        <div className="flex items-center gap-4 px-2 py-4">
          <img src={logo} alt="SaniTek Logo" className="h-16 w-auto object-contain" />
          <h1 className="text-2xl font-black tracking-tighter text-white">SaniTek</h1>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
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

        <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 cursor-pointer transition-colors group border-none bg-transparent w-full text-left outline-none">
              <Avatar className="h-10 w-10 border border-white/20">
                <AvatarImage src="" />
                <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden flex-1">
                <span className="text-sm font-bold truncate text-white">{userName}</span>
                <span className="text-[11px] text-blue-200 truncate">{userRole}</span>
              </div>
              <ChevronUp className="size-4 text-blue-200 group-data-[state=open]:rotate-180 transition-transform" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-64 mb-2 ml-4 bg-[#14235a] border-white/20 text-white">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-blue-100">Configuración</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {filteredAdminLinks.map((item) => (
                  <DropdownMenuItem key={item.title} onClick={() => navigate(item.href)} className="hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer">
                    <item.icon className="mr-3 size-4 text-blue-300" />
                    <span>{item.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer">
                <LogOut className="mr-3 size-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-muted/5">
        <header 
          className="min-h-20 border-b flex items-center px-10 justify-between shrink-0 py-4 z-10 shadow-sm"
          style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', borderColor: 'rgba(0, 0, 0, 0.08)' }}
        >
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 leading-tight">{pageTitle}</h2>
            {subtitle && <p className="text-sm text-slate-500 mt-1 font-medium">{subtitle}</p>}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Elementos de búsqueda y campana eliminados para una vista más limpia */}
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
