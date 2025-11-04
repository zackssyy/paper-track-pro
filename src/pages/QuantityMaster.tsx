import { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { quantitiesData } from "@/data/dummyData";
import { Quantity } from "@/types";
import { toast } from "sonner";

export default function QuantityMaster() {
  const [quantities, setQuantities] = useState<Quantity[]>(quantitiesData);
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
      toast.success("Quantity updated successfully");
    } else {
      setQuantities([...quantities, formData]);
      toast.success("Quantity added successfully");
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
    toast.success("Quantity deleted successfully");
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Quantity Master</h2>
          <p className="text-muted-foreground">Manage quantity definitions</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Quantity
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingIndex !== null ? "Edit" : "Add"} Quantity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
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
              <div className="flex gap-2 md:col-span-2">
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
          <CardTitle>Quantities List</CardTitle>
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
