import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, FileText, BarChart3 } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Items",
      value: "5",
      icon: Package,
      description: "Active inventory items",
    },
    {
      title: "Vendors",
      value: "4",
      icon: Users,
      description: "Registered suppliers",
    },
    {
      title: "Orders",
      value: "3",
      icon: FileText,
      description: "Pending orders",
    },
    {
      title: "Invoices",
      value: "3",
      icon: BarChart3,
      description: "This month",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your inventory management system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Inventory Management System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This system helps you manage examination paper sales efficiently. Use the
            sidebar to navigate through different modules:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Masters:</strong> Manage items,
              vendors, and quantity definitions
            </li>
            <li>
              <strong className="text-foreground">Entry:</strong> Record orders,
              challans, and invoices
            </li>
            <li>
              <strong className="text-foreground">Reports:</strong> View comprehensive
              reports and ledgers
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
