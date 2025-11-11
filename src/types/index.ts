export interface Item {
  itemNumber: string;
  itemName: string;
  description: string;
  size: string;
  color: string;
  currentStock: number;
}

export interface Vendor {
  vendorCode: string;
  vendorName: string;
  vendorAddress: string;
  vendorContact: string;
  materialType: string;
}

export interface Department {
  departmentCode: string;
  departmentName: string;
  departmentHead: string;
  contactNumber: string;
}

export interface PurchaseOrder {
  orderNumber: string;
  orderDate: string;
  vendorCode: string;
  itemNumber: string;
  orderedQuantity: number;
  receivedQuantity: number;
  unit: string;
  status: 'Pending' | 'Partial' | 'Completed';
}

export interface Challan {
  challanNo: string;
  challanDate: string;
  orderNumber: string;
  vendorCode: string;
  itemNumber: string;
  receivedQuantity: number;
  unit: string;
}

export interface Bill {
  billNo: string;
  billDate: string;
  challanNo: string;
  vendorCode: string;
  itemNumber: string;
  quantity: number;
  unit: string;
  ratePerUnit: number;
  amount: number;
  cgstPercent: number;
  cgstAmount: number;
  sgstPercent: number;
  sgstAmount: number;
  totalAmount: number;
  isPaid: boolean;
}

export interface ItemIssue {
  issueNo: string;
  issueDate: string;
  itemNumber: string;
  departmentCode: string;
  issuedQuantity: number;
  unit: string;
  issuedBy: string;
  issuedTo: string;
}

export interface ItemLedgerEntry {
  date: string;
  referenceNo: string;
  type: 'Received' | 'Issued';
  itemNumber: string;
  quantity: number;
  balance: number;
}
