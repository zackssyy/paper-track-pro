import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import { invoicesData } from "@/data/dummyData";
import { Invoice } from "@/types";

export default function InvoiceRegister() {
  const columns = [
    { key: "invoiceDate" as keyof Invoice, label: "Date of Invoice" },
    { key: "invoiceNo" as keyof Invoice, label: "Invoice No" },
    { key: "challanNo" as keyof Invoice, label: "Challan No" },
    { key: "challanDate" as keyof Invoice, label: "Challan Date" },
    { key: "itemName" as keyof Invoice, label: "Item Name" },
    { key: "quantity" as keyof Invoice, label: "Quantity" },
    { key: "itemType" as keyof Invoice, label: "Item Type" },
    {
      key: "invoiceAmount" as keyof Invoice,
      label: "Invoice Amount",
      render: (value: number) => `₹${value?.toLocaleString() || 0}`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Invoice Register</h2>
        <p className="text-muted-foreground">Complete invoice records</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Register Report</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={invoicesData}
            columns={columns}
            searchPlaceholder="Search invoices..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
