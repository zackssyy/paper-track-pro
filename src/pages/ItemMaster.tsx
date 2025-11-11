import { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useItems } from "@/hooks/useAppData";
import { Item } from "@/types";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { logAudit } from "@/utils/auditLogger";

export default function ItemMaster() {
  const [items, setItems] = useItems();
  const { currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Item>({
    itemNumber: "",
    itemName: "",
    description: "",
    size: "",
    color: "",
    currentStock: 0,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const columns = [
    { key: "itemNumber" as keyof Item, label: "Item Number" },
    { key: "itemName" as keyof Item, label: "Item Name" },
    { key: "description" as keyof Item, label: "Description" },
    { key: "size" as keyof Item, label: "Size" },
    { key: "color" as keyof Item, label: "Color" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...items];
      updated[editingIndex] = formData;
      setItems(updated);
      if (currentUser) {
        logAudit({
          userId: currentUser.userId,
          userName: currentUser.name,
          action: 'update',
          module: 'Item Master',
          recordId: formData.itemNumber,
        });
      }
      toast.success("Item updated successfully", { duration: 5000 });
    } else {
      setItems([...items, formData]);
      if (currentUser) {
        logAudit({
          userId: currentUser.userId,
          userName: currentUser.name,
          action: 'create',
          module: 'Item Master',
          recordId: formData.itemNumber,
        });
      }
      toast.success("Item added successfully", { duration: 5000 });
    }
    resetForm();
  };

  const handleEdit = (row: Item) => {
    setFormData(row);
    setEditingIndex(items.findIndex((item) => item.itemNumber === row.itemNumber));
    setShowForm(true);
  };

  const handleDelete = (row: Item) => {
    setItems(items.filter((item) => item.itemNumber !== row.itemNumber));
    if (currentUser) {
      logAudit({
        userId: currentUser.userId,
        userName: currentUser.name,
        action: 'delete',
        module: 'Item Master',
        recordId: row.itemNumber,
      });
    }
    toast.success("Item deleted successfully", { duration: 5000 });
  };

  const resetForm = () => {
    setFormData({
      itemNumber: "",
      itemName: "",
      description: "",
      size: "",
      color: "",
      currentStock: 0,
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Item Master</h2>
          <p className="text-sm md:text-base text-muted-foreground">Manage inventory items</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">{editingIndex !== null ? "Edit" : "Add"} Item</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="itemNumber">Item Number</Label>
                <Input
                  id="itemNumber"
                  value={formData.itemNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, itemNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  value={formData.itemName}
                  onChange={(e) =>
                    setFormData({ ...formData, itemName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  value={formData.size}
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:col-span-2">
                <Button type="submit">
                  {editingIndex !== null ? "Update" : "Add"}
                </Button>
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
          <CardTitle className="text-lg md:text-xl">Items List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={items}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchPlaceholder="Search items..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
