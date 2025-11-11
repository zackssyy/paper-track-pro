import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/common/DataTable";
import { usePurchaseOrders, useItems, useVendors } from "@/hooks/useAppData";
import { PurchaseOrder } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { logAudit } from "@/utils/auditLogger";
import { toast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";

export default function PurchaseOrderEntry() {
  const [purchaseOrders, setPurchaseOrders] = usePurchaseOrders();
  const [items] = useItems();
  const [vendors] = useVendors();
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState<PurchaseOrder>({
    orderNumber: "",
    orderDate: "",
    vendorCode: "",
    itemNumber: "",
    orderedQuantity: 0,
    receivedQuantity: 0,
    unit: "",
    status: "Pending",
  });

  const columns = [
    { key: "orderNumber" as keyof PurchaseOrder, label: "Order No" },
    { key: "orderDate" as keyof PurchaseOrder, label: "Order Date" },
    { key: "vendorCode" as keyof PurchaseOrder, label: "Vendor Code" },
    { key: "itemNumber" as keyof PurchaseOrder, label: "Item No" },
    { key: "orderedQuantity" as keyof PurchaseOrder, label: "Ordered Qty" },
    { key: "receivedQuantity" as keyof PurchaseOrder, label: "Received Qty" },
    { key: "unit" as keyof PurchaseOrder, label: "Unit" },
    { key: "status" as keyof PurchaseOrder, label: "Status" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPurchaseOrders([...purchaseOrders, formData]);
    
    if (currentUser) {
      logAudit({
        userId: currentUser.id,
        userName: currentUser.name,
        action: 'create',
        module: 'Purchase Order Entry',
        recordId: formData.orderNumber,
      });
    }
    
    toast({ title: "Success", description: "Purchase order created successfully", duration: 5000 });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      orderNumber: "",
      orderDate: "",
      vendorCode: "",
      itemNumber: "",
      orderedQuantity: 0,
      receivedQuantity: 0,
      unit: "",
      status: "Pending",
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Purchase Order Entry</h2>
          <p className="text-sm md:text-base text-muted-foreground">Create and manage purchase orders</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="w-full sm:w-auto">
          {showForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? "Cancel" : "Add Order"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">New Purchase Order</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Order Number</Label>
                  <Input
                    id="orderNumber"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderDate">Order Date</Label>
                  <Input
                    id="orderDate"
                    type="date"
                    value={formData.orderDate}
                    onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendorCode">Vendor</Label>
                  <Select value={formData.vendorCode} onValueChange={(value) => setFormData({ ...formData, vendorCode: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map((vendor) => (
                        <SelectItem key={vendor.vendorCode} value={vendor.vendorCode}>
                          {vendor.vendorName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemNumber">Item</Label>
                  <Select value={formData.itemNumber} onValueChange={(value) => setFormData({ ...formData, itemNumber: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent>
                      {items.map((item) => (
                        <SelectItem key={item.itemNumber} value={item.itemNumber}>
                          {item.itemName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderedQuantity">Ordered Quantity</Label>
                  <Input
                    id="orderedQuantity"
                    type="number"
                    value={formData.orderedQuantity}
                    onChange={(e) => setFormData({ ...formData, orderedQuantity: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="e.g., Ream, Box, Bundle"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="w-full sm:w-auto">Submit</Button>
                <Button type="button" variant="outline" onClick={resetForm} className="w-full sm:w-auto">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={purchaseOrders}
            columns={columns}
            searchPlaceholder="Search purchase orders..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
