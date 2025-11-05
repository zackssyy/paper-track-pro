import { NavLink } from "react-router-dom";
import {
  Package,
  Users,
  Layers,
  FileText,
  BarChart3,
  ChevronDown,
  LayoutDashboard,
  Activity,
  AlertCircle,
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function AppSidebar() {
  const { open } = useSidebar();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  const masterItems = [
    { title: "Item Master", url: "/item-master", icon: Package },
    { title: "Vendor Master", url: "/vendor-master", icon: Users },
    { title: "Quantity Master", url: "/quantity-master", icon: Layers },
  ];

  const entryItems = [
    { title: "Order Entry", url: "/order-entry" },
    { title: "Challan Entry", url: "/challan-entry" },
    { title: "Invoice Entry", url: "/invoice-entry" },
  ];

  const reportItems = [
    { title: "Item Ledger", url: "/item-ledger" },
    { title: "Order Register", url: "/order-register" },
    { title: "Challan Register", url: "/challan-register" },
    { title: "Invoice Register", url: "/invoice-register" },
    { title: "Vendor Ledger", url: "/vendor-ledger" },
  ];

  const adminItems = [
    { title: "Admin Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "User Management", url: "/admin/users", icon: Users },
    { title: "Audit Logs", url: "/admin/audit-logs", icon: Activity },
    { title: "Failed Transactions", url: "/admin/failed-transactions", icon: AlertCircle },
  ];

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="px-6 py-4 border-b border-sidebar-border">
          <h2 className="text-lg font-bold text-sidebar-foreground">
            Inventory System
          </h2>
          <p className="text-xs text-sidebar-foreground/70">
            Paper Sales Management
          </p>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      isActive ? "bg-sidebar-accent" : ""
                    }
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === '/admin'}
                        className={({ isActive }) =>
                          isActive ? "bg-sidebar-accent" : ""
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Masters</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {masterItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? "bg-sidebar-accent" : ""
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center">
                <FileText className="h-4 w-4 mr-2" />
                Entry
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {entryItems.map((item) => (
                    <SidebarMenuSub key={item.title}>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive }) =>
                              isActive ? "bg-sidebar-accent" : ""
                            }
                          >
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Reports
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {reportItems.map((item) => (
                    <SidebarMenuSub key={item.title}>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive }) =>
                              isActive ? "bg-sidebar-accent" : ""
                            }
                          >
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
