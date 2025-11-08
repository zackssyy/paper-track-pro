import { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useQuantities } from "@/hooks/useAppData";
import { Quantity } from "@/types";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { logAudit } from "@/utils/auditLogger";

export default function QuantityMaster() {
  const [quantities, setQuantities] = useQuantities();
  const { currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Quantity>({
    quantityId: "",
    quantityName: "",
    quantity: 0,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const columns = [
    { key: "quantityId" as keyof Quantity, label: "Quantity ID" },
    { key: "quantityName" as keyof Quantity, label: "Quantity Name" },
    { key: "quantity" as keyof Quantity, label: "Quantity" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...quantities];
      updated[editingIndex] = formData;
      setQuantities(updated);
      if (currentUser) {
        logAudit({
          userId: currentUser.userId,
          userName: currentUser.name,
          action: 'update',
          module: 'Quantity Master',
          recordId: formData.quantityId,
        });
      }
      toast.success("Quantity updated successfully", { duration: 5000 });
    } else {
      setQuantities([...quantities, formData]);
      if (currentUser) {
        logAudit({
          userId: currentUser.userId,
          userName: currentUser.name,
          action: 'create',
          module: 'Quantity Master',
          recordId: formData.quantityId,
        });
      }
      toast.success("Quantity added successfully", { duration: 5000 });
    }
    resetForm();
  };

  const handleEdit = (row: Quantity) => {
    setFormData(row);
    setEditingIndex(
      quantities.findIndex((q) => q.quantityId === row.quantityId)
    );
    setShowForm(true);
  };

  const handleDelete = (row: Quantity) => {
    setQuantities(
      quantities.filter((q) => q.quantityId !== row.quantityId)
    );
    if (currentUser) {
      logAudit({
        userId: currentUser.userId,
        userName: currentUser.name,
        action: 'delete',
        module: 'Quantity Master',
        recordId: row.quantityId,
      });
    }
    toast.success("Quantity deleted successfully", { duration: 5000 });
  };

  const resetForm = () => {
    setFormData({
      quantityId: "",
      quantityName: "",
      quantity: 0,
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Quantity Master</h2>
          <p className="text-sm md:text-base text-muted-foreground">Manage quantity definitions</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add Quantity
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              {editingIndex !== null ? "Edit" : "Add"} Quantity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quantityId">Quantity ID</Label>
                <Input
                  id="quantityId"
                  value={formData.quantityId}
                  onChange={(e) =>
                    setFormData({ ...formData, quantityId: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantityName">Quantity Name</Label>
                <Input
                  id="quantityName"
                  value={formData.quantityName}
                  onChange={(e) =>
                    setFormData({ ...formData, quantityName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: parseInt(e.target.value),
                    })
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
          <CardTitle className="text-lg md:text-xl">Quantities List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={quantities}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchPlaceholder="Search quantities..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
