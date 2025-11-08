import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/common/DataTable";
import { useVendors, useVendorPayments } from "@/hooks/useAppData";
import { VendorLedgerPayment } from "@/types";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { logAudit } from "@/utils/auditLogger";

export default function VendorPayment() {
  const { currentUser } = useAuth();
  const [vendors] = useVendors();
  const [payments, setPayments] = useVendorPayments();
  const [formData, setFormData] = useState({
    paymentDate: "",
    vendorName: "",
    modeOfPayment: "",
    paymentAmount: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPayment: VendorLedgerPayment = {
      paymentDate: formData.paymentDate,
      modeOfPayment: formData.modeOfPayment,
      paymentAmount: parseFloat(formData.paymentAmount),
    };

    setPayments([...payments, newPayment]);
    logAudit({
      action: "create",
      module: "Vendor Payment",
      recordId: `${formData.vendorName}-${formData.paymentDate}`,
      userId: currentUser?.userId || "GUEST",
      userName: currentUser?.name || "Guest",
    });

    toast.success("Vendor payment recorded successfully", { duration: 5000 });

    setFormData({
      paymentDate: "",
      vendorName: "",
      modeOfPayment: "",
      paymentAmount: "",
    });
  };

  const handleDelete = (row: VendorLedgerPayment) => {
    setPayments(payments.filter((payment) => payment !== row));
    
    logAudit({
      action: "delete",
      module: "Vendor Payment",
      recordId: `${row.paymentDate}`,
      userId: currentUser?.userId || "GUEST",
      userName: currentUser?.name || "Guest",
    });

    toast.success("Vendor payment deleted successfully", { duration: 5000 });
  };

  const columns = [
    { key: "paymentDate" as keyof VendorLedgerPayment, label: "Payment Date", header: "Payment Date" },
    { key: "modeOfPayment" as keyof VendorLedgerPayment, label: "Mode of Payment", header: "Mode of Payment" },
    {
      key: "paymentAmount" as keyof VendorLedgerPayment,
      label: "Payment Amount",
      header: "Payment Amount",
      render: (value: number) => `₹${value.toLocaleString()}`,
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Vendor Payment</h2>
        <p className="text-sm md:text-base text-muted-foreground">Record vendor payments</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">New Payment Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentDate">Payment Date</Label>
                <Input
                  id="paymentDate"
                  type="date"
                  value={formData.paymentDate}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentDate: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendorName">Vendor Name</Label>
                <Select
                  value={formData.vendorName}
                  onValueChange={(value) =>
                    setFormData({ ...formData, vendorName: value })
                  }
                  required
                >
                  <SelectTrigger id="vendorName">
                    <SelectValue placeholder="Select Vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor.vendorCode} value={vendor.vendorName}>
                        {vendor.vendorName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="modeOfPayment">Mode of Payment</Label>
                <Select
                  value={formData.modeOfPayment}
                  onValueChange={(value) =>
                    setFormData({ ...formData, modeOfPayment: value })
                  }
                  required
                >
                  <SelectTrigger id="modeOfPayment">
                    <SelectValue placeholder="Select Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentAmount">Payment Amount</Label>
                <Input
                  id="paymentAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.paymentAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentAmount: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              Record Payment
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={payments}
            columns={columns}
            onDelete={handleDelete}
            searchPlaceholder="Search payments..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
