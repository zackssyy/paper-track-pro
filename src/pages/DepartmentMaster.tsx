import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/common/DataTable";
import { useDepartments } from "@/hooks/useAppData";
import { Department } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { logAudit } from "@/utils/auditLogger";
import { toast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";

export default function DepartmentMaster() {
  const [departments, setDepartments] = useDepartments();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState<Department>({
    departmentCode: "",
    departmentName: "",
    departmentHead: "",
    contactNumber: "",
  });

  const columns = [
    { key: "departmentCode" as keyof Department, label: "Department Code" },
    { key: "departmentName" as keyof Department, label: "Department Name" },
    { key: "departmentHead" as keyof Department, label: "Department Head" },
    { key: "contactNumber" as keyof Department, label: "Contact Number" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setDepartments(departments.map(dept => 
        dept.departmentCode === editingId ? formData : dept
      ));
      if (currentUser) {
        logAudit({
          userId: currentUser.id,
          userName: currentUser.name,
          action: 'update',
          module: 'Department Master',
          recordId: editingId,
        });
      }
      toast({ title: "Success", description: "Department updated successfully", duration: 5000 });
    } else {
      setDepartments([...departments, formData]);
      if (currentUser) {
        logAudit({
          userId: currentUser.id,
          userName: currentUser.name,
          action: 'create',
          module: 'Department Master',
          recordId: formData.departmentCode,
        });
      }
      toast({ title: "Success", description: "Department added successfully", duration: 5000 });
    }
    
    resetForm();
  };

  const handleEdit = (department: Department) => {
    setFormData(department);
    setEditingId(department.departmentCode);
    setShowForm(true);
  };

  const handleDelete = (department: Department) => {
    setDepartments(departments.filter(d => d.departmentCode !== department.departmentCode));
    if (currentUser) {
      logAudit({
        userId: currentUser.id,
        userName: currentUser.name,
        action: 'delete',
        module: 'Department Master',
        recordId: department.departmentCode,
      });
    }
    toast({ title: "Success", description: "Department deleted successfully", duration: 5000 });
  };

  const resetForm = () => {
    setFormData({
      departmentCode: "",
      departmentName: "",
      departmentHead: "",
      contactNumber: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Department Master</h2>
          <p className="text-sm md:text-base text-muted-foreground">Manage department information</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="w-full sm:w-auto">
          {showForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? "Cancel" : "Add Department"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              {editingId ? "Edit Department" : "Add New Department"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departmentCode">Department Code</Label>
                  <Input
                    id="departmentCode"
                    value={formData.departmentCode}
                    onChange={(e) => setFormData({ ...formData, departmentCode: e.target.value })}
                    required
                    disabled={!!editingId}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departmentName">Department Name</Label>
                  <Input
                    id="departmentName"
                    value={formData.departmentName}
                    onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departmentHead">Department Head</Label>
                  <Input
                    id="departmentHead"
                    value={formData.departmentHead}
                    onChange={(e) => setFormData({ ...formData, departmentHead: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="w-full sm:w-auto">
                  {editingId ? "Update" : "Submit"}
                </Button>
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
          <CardTitle className="text-lg md:text-xl">Department List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={departments}
            columns={columns}
            searchPlaceholder="Search departments..."
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
