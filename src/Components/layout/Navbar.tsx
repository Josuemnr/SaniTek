import React from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/Components/ui/navigation-menu';
import { navigationMenuTriggerStyle } from '@/Components/ui/navigation-menu-variants';
import { Input } from '@/Components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Search, Bell } from 'lucide-react';
import logo from '@/assets/logo.svg';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/nav-constants';

export function Navbar() {
  return (
    <header 
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors shadow-sm"
      style={{ background: 'rgba(255, 255, 255, 0.8)', borderColor: 'rgba(0, 0, 0, 0.08)' }}
    >
      <div className="container flex h-20 items-center justify-between px-10 mx-auto">
        <div className="flex items-center gap-12">
          {/* Logo (NAV-01) */}
          <div className="flex items-center gap-4">
            <img src={logo} alt="SaniTek Logo" className="h-14 w-auto object-contain" />
          </div>

          {/* Navigation Links (NAV-02) */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {NAV_LINKS.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <NavigationMenuLink 
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-slate-100 text-slate-700 text-sm font-semibold transition-colors")}
                    href={link.href}
                  >
                    {link.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="flex items-center gap-4 text-slate-700">
            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 p-1.5 rounded-xl transition-colors outline-none border-none bg-transparent"
                data-testid="user-avatar"
              >
                <Avatar className="h-10 w-10 border border-slate-200">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-blue-600 text-white font-bold">ST</AvatarFallback>
                </Avatar>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-sm font-bold leading-none text-slate-900">Admin SaniTek</span>
                  <span className="text-xs text-slate-500">admin@sanitek.com</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Ajustes</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
