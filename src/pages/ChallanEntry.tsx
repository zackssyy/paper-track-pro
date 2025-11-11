import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/common/DataTable";
import { useChallans, usePurchaseOrders, useItems } from "@/hooks/useAppData";
import { Challan } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { logAudit } from "@/utils/auditLogger";
import { toast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";

export default function ChallanEntry() {
  const [challans, setChallans] = useChallans();
  const [purchaseOrders, setPurchaseOrders] = usePurchaseOrders();
  const [items] = useItems();
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState<Challan>({
    challanNo: "",
    challanDate: "",
    orderNumber: "",
    vendorCode: "",
    itemNumber: "",
    receivedQuantity: 0,
    unit: "",
  });

  const selectedPO = purchaseOrders.find(po => po.orderNumber === formData.orderNumber);

  const columns = [
    { key: "challanNo" as keyof Challan, label: "Challan No" },
    { key: "challanDate" as keyof Challan, label: "Challan Date" },
    { key: "orderNumber" as keyof Challan, label: "Order No" },
    { key: "itemNumber" as keyof Challan, label: "Item No" },
    { key: "receivedQuantity" as keyof Challan, label: "Received Qty" },
    { key: "unit" as keyof Challan, label: "Unit" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setChallans([...challans, formData]);
    
    if (selectedPO) {
      const newReceivedQty = selectedPO.receivedQuantity + formData.receivedQuantity;
      const newStatus = newReceivedQty >= selectedPO.orderedQuantity ? 'Completed' : 
                       newReceivedQty > 0 ? 'Partial' : 'Pending';
      
      setPurchaseOrders(purchaseOrders.map(po => 
        po.orderNumber === formData.orderNumber 
          ? { ...po, receivedQuantity: newReceivedQty, status: newStatus }
          : po
      ));
    }
    
    if (currentUser) {
      logAudit({
        userId: currentUser.id,
        userName: currentUser.name,
        action: 'create',
        module: 'Challan Entry',
        recordId: formData.challanNo,
      });
    }
    
    toast({ title: "Success", description: "Challan entry created and stock updated", duration: 5000 });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      challanNo: "",
      challanDate: "",
      orderNumber: "",
      vendorCode: "",
      itemNumber: "",
      receivedQuantity: 0,
      unit: "",
    });
    setShowForm(false);
  };

  useEffect(() => {
    if (selectedPO) {
      setFormData(prev => ({
        ...prev,
        vendorCode: selectedPO.vendorCode,
        itemNumber: selectedPO.itemNumber,
        unit: selectedPO.unit,
      }));
    }
  }, [selectedPO]);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Challan Entry</h2>
          <p className="text-sm md:text-base text-muted-foreground">Record material receipts and update orders</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="w-full sm:w-auto">
          {showForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? "Cancel" : "Add Challan"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">New Challan Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="challanNo">Challan Number</Label>
                  <Input
                    id="challanNo"
                    value={formData.challanNo}
                    onChange={(e) => setFormData({ ...formData, challanNo: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="challanDate">Challan Date</Label>
                  <Input
                    id="challanDate"
                    type="date"
                    value={formData.challanDate}
                    onChange={(e) => setFormData({ ...formData, challanDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Purchase Order</Label>
                  <Select value={formData.orderNumber} onValueChange={(value) => setFormData({ ...formData, orderNumber: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purchase order" />
                    </SelectTrigger>
                    <SelectContent>
                      {purchaseOrders.filter(po => po.status !== 'Completed').map((po) => (
                        <SelectItem key={po.orderNumber} value={po.orderNumber}>
                          {po.orderNumber} - Pending: {po.orderedQuantity - po.receivedQuantity} {po.unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedPO && (
                  <>
                    <div className="space-y-2">
                      <Label>Item</Label>
                      <Input value={items.find(i => i.itemNumber === selectedPO.itemNumber)?.itemName || ''} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Ordered Quantity</Label>
                      <Input value={selectedPO.orderedQuantity} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Already Received</Label>
                      <Input value={selectedPO.receivedQuantity} disabled />
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="receivedQuantity">Received Quantity</Label>
                  <Input
                    id="receivedQuantity"
                    type="number"
                    value={formData.receivedQuantity}
                    onChange={(e) => setFormData({ ...formData, receivedQuantity: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="w-full sm:w-auto" disabled={!selectedPO}>Submit</Button>
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
          <CardTitle className="text-lg md:text-xl">Challan Records</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={challans}
            columns={columns}
            searchPlaceholder="Search challans..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
