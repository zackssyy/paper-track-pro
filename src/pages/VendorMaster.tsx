import { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useVendors } from "@/hooks/useAppData";
import { Vendor } from "@/types";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { logAudit } from "@/utils/auditLogger";

export default function VendorMaster() {
  const [vendors, setVendors] = useVendors();
  const { currentUser } = useAuth();
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
      if (currentUser) {
        logAudit({
          userId: currentUser.userId,
          userName: currentUser.name,
          action: 'update',
          module: 'Vendor Master',
          recordId: formData.vendorCode,
        });
      }
      toast.success("Vendor updated successfully", { duration: 5000 });
    } else {
      setVendors([...vendors, formData]);
      if (currentUser) {
        logAudit({
          userId: currentUser.userId,
          userName: currentUser.name,
          action: 'create',
          module: 'Vendor Master',
          recordId: formData.vendorCode,
        });
      }
      toast.success("Vendor added successfully", { duration: 5000 });
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
    if (currentUser) {
      logAudit({
        userId: currentUser.userId,
        userName: currentUser.name,
        action: 'delete',
        module: 'Vendor Master',
        recordId: row.vendorCode,
      });
    }
    toast.success("Vendor deleted successfully", { duration: 5000 });
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
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Vendor Master</h2>
          <p className="text-sm md:text-base text-muted-foreground">Manage vendor information</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">{editingIndex !== null ? "Edit" : "Add"} Vendor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 sm:grid-cols-2">
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
              <div className="space-y-2 sm:col-span-2">
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
          <CardTitle className="text-lg md:text-xl">Vendors List</CardTitle>
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
