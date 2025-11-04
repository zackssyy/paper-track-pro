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
import { invoicesData, itemsData } from "@/data/dummyData";
import { Invoice } from "@/types";
import { toast } from "sonner";

export default function InvoiceEntry() {
  const [invoices, setInvoices] = useState<Invoice[]>(invoicesData);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Invoice>({
    challanNo: "",
    challanDate: "",
    invoiceNo: "",
    invoiceDate: "",
    itemName: "",
    quantity: 0,
    itemType: "",
    invoiceAmount: 0,
  });

  const columns = [
    { key: "challanNo" as keyof Invoice, label: "Challan No" },
    { key: "challanDate" as keyof Invoice, label: "Challan Date" },
    { key: "invoiceNo" as keyof Invoice, label: "Invoice No" },
    { key: "invoiceDate" as keyof Invoice, label: "Invoice Date" },
    { key: "itemName" as keyof Invoice, label: "Item Name" },
    { key: "quantity" as keyof Invoice, label: "Quantity" },
    { key: "itemType" as keyof Invoice, label: "Item Type" },
    {
      key: "invoiceAmount" as keyof Invoice,
      label: "Amount",
      render: (value: number) => `₹${value.toLocaleString()}`,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInvoices([...invoices, formData]);
    toast.success("Invoice added successfully");
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      challanNo: "",
      challanDate: "",
      invoiceNo: "",
      invoiceDate: "",
      itemName: "",
      quantity: 0,
      itemType: "",
      invoiceAmount: 0,
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Invoice Entry</h2>
          <p className="text-muted-foreground">Record invoice details</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Invoice
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
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
                <Label htmlFor="invoiceNo">Invoice No</Label>
                <Input
                  id="invoiceNo"
                  value={formData.invoiceNo}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceNo: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceDate">Invoice Date</Label>
                <Input
                  id="invoiceDate"
                  type="date"
                  value={formData.invoiceDate}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Select
                  value={formData.itemName}
                  onValueChange={(value) =>
                    setFormData({ ...formData, itemName: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    {itemsData.map((item) => (
                      <SelectItem key={item.itemNumber} value={item.itemName}>
                        {item.itemName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <div className="space-y-2">
                <Label htmlFor="itemType">Item Type</Label>
                <Input
                  id="itemType"
                  value={formData.itemType}
                  onChange={(e) =>
                    setFormData({ ...formData, itemType: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceAmount">Invoice Amount (₹)</Label>
                <Input
                  id="invoiceAmount"
                  type="number"
                  value={formData.invoiceAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      invoiceAmount: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="flex gap-2 md:col-span-2">
                <Button type="submit">Add Invoice</Button>
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
          <CardTitle>Invoices List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={invoices}
            columns={columns}
            searchPlaceholder="Search invoices..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
