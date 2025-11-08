import { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useOrders, useItems, useQuantities } from "@/hooks/useAppData";
import { Order } from "@/types";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { logAudit } from "@/utils/auditLogger";

export default function OrderEntry() {
  const [orders, setOrders] = useOrders();
  const [items] = useItems();
  const [quantities] = useQuantities();
  const { currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Order>({
    orderNumber: "",
    orderDate: "",
    challanNo: "",
    challanDate: "",
    item: "",
    receivedQuantity: 0,
    quantityType: "",
  });

  const columns = [
    { key: "orderNumber" as keyof Order, label: "Order Number" },
    { key: "orderDate" as keyof Order, label: "Order Date" },
    { key: "challanNo" as keyof Order, label: "Challan No" },
    { key: "challanDate" as keyof Order, label: "Challan Date" },
    { key: "item" as keyof Order, label: "Item" },
    { key: "receivedQuantity" as keyof Order, label: "Received Qty" },
    { key: "quantityType" as keyof Order, label: "Quantity Type" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrders([...orders, formData]);
    if (currentUser) {
      logAudit({
        userId: currentUser.userId,
        userName: currentUser.name,
        action: 'create',
        module: 'Order Entry',
        recordId: formData.orderNumber,
      });
    }
    toast.success("Order added successfully", { duration: 5000 });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      orderNumber: "",
      orderDate: "",
      challanNo: "",
      challanDate: "",
      item: "",
      receivedQuantity: 0,
      quantityType: "",
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Order Entry</h2>
          <p className="text-sm md:text-base text-muted-foreground">Record new orders</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add Order
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Add Order</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Order Number</Label>
                <Input
                  id="orderNumber"
                  value={formData.orderNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, orderNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orderDate">Order Date</Label>
                <Input
                  id="orderDate"
                  type="date"
                  value={formData.orderDate}
                  onChange={(e) =>
                    setFormData({ ...formData, orderDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="challanNo">Challan No</Label>
                <Input
                  id="challanNo"
                  value={formData.challanNo}
                  onChange={(e) =>
                    setFormData({ ...formData, challanNo: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="challanDate">Challan Date</Label>
                <Input
                  id="challanDate"
                  type="date"
                  value={formData.challanDate}
                  onChange={(e) =>
                    setFormData({ ...formData, challanDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item">Item</Label>
                <Select
                  value={formData.item}
                  onValueChange={(value) =>
                    setFormData({ ...formData, item: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    {items.map((item) => (
                      <SelectItem key={item.itemNumber} value={item.itemName}>
                        {item.itemName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="receivedQuantity">Received Quantity</Label>
                <Input
                  id="receivedQuantity"
                  type="number"
                  value={formData.receivedQuantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      receivedQuantity: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantityType">Quantity Type</Label>
                <Select
                  value={formData.quantityType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, quantityType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {quantities.map((qty) => (
                      <SelectItem key={qty.quantityId} value={qty.quantityName}>
                        {qty.quantityName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:col-span-2">
                <Button type="submit">Add Order</Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Orders List</CardTitle>
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
