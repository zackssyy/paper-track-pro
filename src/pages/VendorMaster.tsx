import { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { vendorsData } from "@/data/dummyData";
import { Vendor } from "@/types";
import { toast } from "sonner";

export default function VendorMaster() {
  const [vendors, setVendors] = useState<Vendor[]>(vendorsData);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Vendor>({
    vendorCode: "",
    vendorName: "",
    vendorAddress: "",
    vendorContact: "",
    materialType: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const columns = [
    { key: "vendorCode" as keyof Vendor, label: "Vendor Code" },
    { key: "vendorName" as keyof Vendor, label: "Vendor Name" },
    { key: "vendorAddress" as keyof Vendor, label: "Address" },
    { key: "vendorContact" as keyof Vendor, label: "Contact Number" },
    { key: "materialType" as keyof Vendor, label: "Material Type" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...vendors];
      updated[editingIndex] = formData;
      setVendors(updated);
      toast.success("Vendor updated successfully");
    } else {
      setVendors([...vendors, formData]);
      toast.success("Vendor added successfully");
    }
    resetForm();
  };

  const handleEdit = (row: Vendor) => {
    setFormData(row);
    setEditingIndex(
      vendors.findIndex((vendor) => vendor.vendorCode === row.vendorCode)
    );
    setShowForm(true);
  };

  const handleDelete = (row: Vendor) => {
    setVendors(vendors.filter((vendor) => vendor.vendorCode !== row.vendorCode));
    toast.success("Vendor deleted successfully");
  };

  const resetForm = () => {
    setFormData({
      vendorCode: "",
      vendorName: "",
      vendorAddress: "",
      vendorContact: "",
      materialType: "",
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Vendor Master</h2>
          <p className="text-muted-foreground">Manage vendor information</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingIndex !== null ? "Edit" : "Add"} Vendor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vendorCode">Vendor Code</Label>
                <Input
                  id="vendorCode"
                  value={formData.vendorCode}
                  onChange={(e) =>
                    setFormData({ ...formData, vendorCode: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendorName">Vendor Name</Label>
                <Input
                  id="vendorName"
                  value={formData.vendorName}
                  onChange={(e) =>
                    setFormData({ ...formData, vendorName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="vendorAddress">Address</Label>
                <Input
                  id="vendorAddress"
                  value={formData.vendorAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, vendorAddress: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendorContact">Contact Number</Label>
                <Input
                  id="vendorContact"
                  value={formData.vendorContact}
                  onChange={(e) =>
                    setFormData({ ...formData, vendorContact: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="materialType">Material Type</Label>
                <Input
                  id="materialType"
                  value={formData.materialType}
                  onChange={(e) =>
                    setFormData({ ...formData, materialType: e.target.value })
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
          <CardTitle>Vendors List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={vendors}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchPlaceholder="Search vendors..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
