import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import { useChallans } from "@/hooks/useAppData";
import { Challan } from "@/types";

export default function ChallanRegister() {
  const [challans] = useChallans();
  const columns = [
    { key: "challanDate" as keyof Challan, label: "Challan Date" },
    { key: "challanNo" as keyof Challan, label: "Challan No" },
    { key: "item" as keyof Challan, label: "Item Name" },
    { key: "receivedQuantity" as keyof Challan, label: "Quantity" },
    { key: "quantityType" as keyof Challan, label: "Type of Item" },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Challan Register</h2>
        <p className="text-sm md:text-base text-muted-foreground">All challan records</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Challan Register Report</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={challans}
            columns={columns}
            searchPlaceholder="Search challans..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
