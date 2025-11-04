import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import { ordersData } from "@/data/dummyData";
import { Order } from "@/types";

export default function OrderRegister() {
  const columns = [
    { key: "orderDate" as keyof Order, label: "Date of Order" },
    { key: "orderNumber" as keyof Order, label: "Order No" },
    { key: "item" as keyof Order, label: "Item Ordered" },
    { key: "receivedQuantity" as keyof Order, label: "Order Quantity" },
    { key: "quantityType" as keyof Order, label: "Type" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Order Register</h2>
        <p className="text-muted-foreground">Complete order history</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Register Report</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={ordersData}
            columns={columns}
            searchPlaceholder="Search orders..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
