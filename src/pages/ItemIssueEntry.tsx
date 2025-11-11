import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/common/DataTable";
import { useItemIssues, useItems, useDepartments } from "@/hooks/useAppData";
import { ItemIssue } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { logAudit } from "@/utils/auditLogger";
import { toast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";

export default function ItemIssueEntry() {
  const [itemIssues, setItemIssues] = useItemIssues();
  const [items, setItems] = useItems();
  const [departments] = useDepartments();
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState<ItemIssue>({
    issueNo: "",
    issueDate: "",
    itemNumber: "",
    departmentCode: "",
    issuedQuantity: 0,
    unit: "",
    issuedBy: currentUser?.name || "",
    issuedTo: "",
  });

  const columns = [
    { key: "issueNo" as keyof ItemIssue, label: "Issue No" },
    { key: "issueDate" as keyof ItemIssue, label: "Issue Date" },
    { key: "itemNumber" as keyof ItemIssue, label: "Item" },
    { key: "departmentCode" as keyof ItemIssue, label: "Department" },
    { key: "issuedQuantity" as keyof ItemIssue, label: "Quantity" },
    { key: "issuedTo" as keyof ItemIssue, label: "Issued To" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update item stock
    const itemToUpdate = items.find(item => item.itemNumber === formData.itemNumber);
    if (itemToUpdate && itemToUpdate.currentStock >= formData.issuedQuantity) {
      setItems(items.map(item => 
        item.itemNumber === formData.itemNumber
          ? { ...item, currentStock: item.currentStock - formData.issuedQuantity }
          : item
      ));
      
      setItemIssues([...itemIssues, formData]);
      
      if (currentUser) {
        logAudit({
          userId: currentUser.id,
          userName: currentUser.name,
          action: 'create',
          module: 'Item Issue Entry',
          recordId: formData.issueNo,
        });
      }
      
      toast({ title: "Success", description: "Item issued successfully and stock updated", duration: 5000 });
      resetForm();
    } else {
      toast({ title: "Error", description: "Insufficient stock available", variant: "destructive", duration: 5000 });
    }
  };

  const resetForm = () => {
    setFormData({
      issueNo: "",
      issueDate: "",
      itemNumber: "",
      departmentCode: "",
      issuedQuantity: 0,
      unit: "",
      issuedBy: currentUser?.name || "",
      issuedTo: "",
    });
    setShowForm(false);
  };

  const selectedItem = items.find(i => i.itemNumber === formData.itemNumber);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Item Issue Entry</h2>
          <p className="text-sm md:text-base text-muted-foreground">Issue items to departments</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="w-full sm:w-auto">
          {showForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? "Cancel" : "Issue Item"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">New Item Issue</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueNo">Issue Number</Label>
                  <Input
                    id="issueNo"
                    value={formData.issueNo}
                    onChange={(e) => setFormData({ ...formData, issueNo: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemNumber">Item</Label>
                  <Select value={formData.itemNumber} onValueChange={(value) => {
                    const item = items.find(i => i.itemNumber === value);
                    setFormData({ ...formData, itemNumber: value, unit: item ? 'Pieces' : '' });
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent>
                      {items.map((item) => (
                        <SelectItem key={item.itemNumber} value={item.itemNumber}>
                          {item.itemName} (Stock: {item.currentStock})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departmentCode">Department</Label>
                  <Select value={formData.departmentCode} onValueChange={(value) => {
                    const dept = departments.find(d => d.departmentCode === value);
                    setFormData({ ...formData, departmentCode: value, issuedTo: dept?.departmentHead || '' });
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.departmentCode} value={dept.departmentCode}>
                          {dept.departmentName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedItem && (
                  <div className="space-y-2">
                    <Label>Available Stock</Label>
                    <Input value={`${selectedItem.currentStock} units`} disabled />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="issuedQuantity">Issue Quantity</Label>
                  <Input
                    id="issuedQuantity"
                    type="number"
                    value={formData.issuedQuantity}
                    onChange={(e) => setFormData({ ...formData, issuedQuantity: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issuedTo">Issued To (Person Name)</Label>
                  <Input
                    id="issuedTo"
                    value={formData.issuedTo}
                    onChange={(e) => setFormData({ ...formData, issuedTo: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issued By</Label>
                  <Input value={formData.issuedBy} disabled />
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
          <CardTitle className="text-lg md:text-xl">Issue Records</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={itemIssues}
            columns={columns}
            searchPlaceholder="Search issues..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
