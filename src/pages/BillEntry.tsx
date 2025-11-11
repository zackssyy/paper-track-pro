import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/common/DataTable";
import { useBills, useChallans, useItems, useVendors } from "@/hooks/useAppData";
import { Bill } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { logAudit } from "@/utils/auditLogger";
import { toast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";

export default function BillEntry() {
  const [bills, setBills] = useBills();
  const [challans] = useChallans();
  const [items] = useItems();
  const [vendors] = useVendors();
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState<Bill>({
    billNo: "",
    billDate: "",
    challanNo: "",
    vendorCode: "",
    itemNumber: "",
    quantity: 0,
    unit: "",
    ratePerUnit: 0,
    amount: 0,
    cgstPercent: 9,
    cgstAmount: 0,
    sgstPercent: 9,
    sgstAmount: 0,
    totalAmount: 0,
    isPaid: false,
  });

  const selectedChallan = challans.find(c => c.challanNo === formData.challanNo);

  useEffect(() => {
    if (selectedChallan) {
      setFormData(prev => ({
        ...prev,
        vendorCode: selectedChallan.vendorCode,
        itemNumber: selectedChallan.itemNumber,
        quantity: selectedChallan.receivedQuantity,
        unit: selectedChallan.unit,
      }));
    }
  }, [selectedChallan]);

  useEffect(() => {
    const amount = formData.quantity * formData.ratePerUnit;
    const cgstAmount = (amount * formData.cgstPercent) / 100;
    const sgstAmount = (amount * formData.sgstPercent) / 100;
    const totalAmount = amount + cgstAmount + sgstAmount;
    
    setFormData(prev => ({
      ...prev,
      amount,
      cgstAmount,
      sgstAmount,
      totalAmount,
    }));
  }, [formData.quantity, formData.ratePerUnit, formData.cgstPercent, formData.sgstPercent]);

  const columns = [
    { key: "billNo" as keyof Bill, label: "Bill No" },
    { key: "billDate" as keyof Bill, label: "Bill Date" },
    { key: "challanNo" as keyof Bill, label: "Challan No" },
    { key: "itemNumber" as keyof Bill, label: "Item" },
    { key: "quantity" as keyof Bill, label: "Quantity" },
    { key: "amount" as keyof Bill, label: "Amount", render: (value: number) => `₹${value.toLocaleString()}` },
    { key: "totalAmount" as keyof Bill, label: "Total", render: (value: number) => `₹${value.toLocaleString()}` },
    { key: "isPaid" as keyof Bill, label: "Status", render: (value: boolean) => value ? "Paid" : "Unpaid" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBills([...bills, formData]);
    
    if (currentUser) {
      logAudit({
        userId: currentUser.id,
        userName: currentUser.name,
        action: 'create',
        module: 'Bill Entry',
        recordId: formData.billNo,
      });
    }
    
    toast({ title: "Success", description: "Bill entry created successfully", duration: 5000 });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      billNo: "",
      billDate: "",
      challanNo: "",
      vendorCode: "",
      itemNumber: "",
      quantity: 0,
      unit: "",
      ratePerUnit: 0,
      amount: 0,
      cgstPercent: 9,
      cgstAmount: 0,
      sgstPercent: 9,
      sgstAmount: 0,
      totalAmount: 0,
      isPaid: false,
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Bill Entry</h2>
          <p className="text-sm md:text-base text-muted-foreground">Record vendor bills with tax calculations</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="w-full sm:w-auto">
          {showForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? "Cancel" : "Add Bill"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">New Bill Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billNo">Bill Number</Label>
                  <Input
                    id="billNo"
                    value={formData.billNo}
                    onChange={(e) => setFormData({ ...formData, billNo: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billDate">Bill Date</Label>
                  <Input
                    id="billDate"
                    type="date"
                    value={formData.billDate}
                    onChange={(e) => setFormData({ ...formData, billDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="challanNo">Challan No</Label>
                  <Select value={formData.challanNo} onValueChange={(value) => setFormData({ ...formData, challanNo: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select challan" />
                    </SelectTrigger>
                    <SelectContent>
                      {challans.map((challan) => (
                        <SelectItem key={challan.challanNo} value={challan.challanNo}>
                          {challan.challanNo} - {items.find(i => i.itemNumber === challan.itemNumber)?.itemName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedChallan && (
                  <>
                    <div className="space-y-2">
                      <Label>Vendor</Label>
                      <Input value={vendors.find(v => v.vendorCode === selectedChallan.vendorCode)?.vendorName || ''} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Item</Label>
                      <Input value={items.find(i => i.itemNumber === selectedChallan.itemNumber)?.itemName || ''} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input value={`${formData.quantity} ${formData.unit}`} disabled />
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="ratePerUnit">Rate Per Unit (₹)</Label>
                  <Input
                    id="ratePerUnit"
                    type="number"
                    step="0.01"
                    value={formData.ratePerUnit}
                    onChange={(e) => setFormData({ ...formData, ratePerUnit: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input value={`₹${formData.amount.toLocaleString()}`} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cgstPercent">CGST %</Label>
                  <Input
                    id="cgstPercent"
                    type="number"
                    step="0.01"
                    value={formData.cgstPercent}
                    onChange={(e) => setFormData({ ...formData, cgstPercent: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>CGST Amount</Label>
                  <Input value={`₹${formData.cgstAmount.toLocaleString()}`} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sgstPercent">SGST %</Label>
                  <Input
                    id="sgstPercent"
                    type="number"
                    step="0.01"
                    value={formData.sgstPercent}
                    onChange={(e) => setFormData({ ...formData, sgstPercent: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>SGST Amount</Label>
                  <Input value={`₹${formData.sgstAmount.toLocaleString()}`} disabled />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-lg font-semibold">Total Payable Amount</Label>
                  <Input className="text-lg font-bold" value={`₹${formData.totalAmount.toLocaleString()}`} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="isPaid">Payment Status</Label>
                  <Select value={formData.isPaid.toString()} onValueChange={(value) => setFormData({ ...formData, isPaid: value === 'true' })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">Unpaid</SelectItem>
                      <SelectItem value="true">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="w-full sm:w-auto" disabled={!selectedChallan}>Submit</Button>
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
          <CardTitle className="text-lg md:text-xl">Bill Records</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={bills}
            columns={columns}
            searchPlaceholder="Search bills..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
