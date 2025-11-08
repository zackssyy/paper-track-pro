import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { vendorInvoicesData, vendorPaymentsData } from "@/data/dummyData";

export default function VendorLedger() {
  const totalInvoice = vendorInvoicesData.reduce(
    (sum, inv) => sum + inv.invoiceAmount,
    0
  );
  const totalPayment = vendorPaymentsData.reduce(
    (sum, pay) => sum + pay.paymentAmount,
    0
  );
  const balance = totalInvoice - totalPayment;

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Vendor Ledger</h2>
        <p className="text-sm md:text-base text-muted-foreground">Paper Supplies Ltd</p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date of Invoice</TableHead>
                  <TableHead>Invoice No</TableHead>
                  <TableHead className="text-right">Invoice Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendorInvoicesData.map((invoice, index) => (
                  <TableRow key={index}>
                    <TableCell>{invoice.invoiceDate}</TableCell>
                    <TableCell>{invoice.invoiceNo}</TableCell>
                    <TableCell className="text-right">
                      ₹{invoice.invoiceAmount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-semibold bg-muted/50">
                  <TableCell colSpan={2}>Total Invoice Amount</TableCell>
                  <TableCell className="text-right">
                    ₹{totalInvoice.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date of Payment</TableHead>
                  <TableHead>Mode of Payment</TableHead>
                  <TableHead className="text-right">Payment Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendorPaymentsData.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{payment.paymentDate}</TableCell>
                    <TableCell>{payment.modeOfPayment}</TableCell>
                    <TableCell className="text-right">
                      ₹{payment.paymentAmount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-semibold bg-muted/50">
                  <TableCell colSpan={2}>Total Payment</TableCell>
                  <TableCell className="text-right">
                    ₹{totalPayment.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="border-accent border-2">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-base md:text-lg">
            <span className="font-semibold text-foreground">Balance Amount:</span>
            <span className="text-xl md:text-2xl font-bold text-accent">
              ₹{balance.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
