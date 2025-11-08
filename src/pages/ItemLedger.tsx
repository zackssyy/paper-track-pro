import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import { itemLedgerData } from "@/data/dummyData";
import { ItemLedgerEntry } from "@/types";

export default function ItemLedger() {
  const columns = [
    { key: "challanDate" as keyof ItemLedgerEntry, label: "Challan Date" },
    { key: "challanNo" as keyof ItemLedgerEntry, label: "Challan No" },
    {
      key: "receivedQuantity" as keyof ItemLedgerEntry,
      label: "Received Quantity",
    },
    { key: "issueDate" as keyof ItemLedgerEntry, label: "Issue Date" },
    { key: "issuedTo" as keyof ItemLedgerEntry, label: "Issued To" },
    { key: "quantity" as keyof ItemLedgerEntry, label: "Quantity" },
    {
      key: "balanceQuantity" as keyof ItemLedgerEntry,
      label: "Balance Quantity",
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Item Ledger</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Track item movements and balances
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Item Ledger Report</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <DataTable
            data={itemLedgerData}
            columns={columns}
            searchPlaceholder="Search ledger entries..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
