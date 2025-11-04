import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import { challansData } from "@/data/dummyData";
import { Challan } from "@/types";

export default function ChallanRegister() {
  const columns = [
    { key: "challanDate" as keyof Challan, label: "Challan Date" },
    { key: "challanNo" as keyof Challan, label: "Challan No" },
    { key: "item" as keyof Challan, label: "Item Name" },
    { key: "receivedQuantity" as keyof Challan, label: "Quantity" },
    { key: "quantityType" as keyof Challan, label: "Type of Item" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Challan Register</h2>
        <p className="text-muted-foreground">All challan records</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Challan Register Report</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={challansData}
            columns={columns}
            searchPlaceholder="Search challans..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
