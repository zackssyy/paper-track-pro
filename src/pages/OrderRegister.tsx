import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import { useOrders } from "@/hooks/useAppData";
import { Order } from "@/types";

export default function OrderRegister() {
  const [orders] = useOrders();
  const columns = [
    { key: "orderDate" as keyof Order, label: "Date of Order" },
    { key: "orderNumber" as keyof Order, label: "Order No" },
    { key: "item" as keyof Order, label: "Item Ordered" },
    { key: "receivedQuantity" as keyof Order, label: "Order Quantity" },
    { key: "quantityType" as keyof Order, label: "Type" },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Order Register</h2>
        <p className="text-sm md:text-base text-muted-foreground">Complete order history</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Order Register Report</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={orders}
            columns={columns}
            searchPlaceholder="Search orders..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
