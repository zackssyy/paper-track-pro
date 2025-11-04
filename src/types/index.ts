export interface Item {
  itemNumber: string;
  itemName: string;
  description: string;
  size: string;
  color: string;
}

export interface Vendor {
  vendorCode: string;
  vendorName: string;
  vendorAddress: string;
  vendorContact: string;
  materialType: string;
}

export interface Quantity {
  quantityId: string;
  quantityName: string;
  quantity: number;
}

export interface Order {
  orderNumber: string;
  orderDate: string;
  challanNo: string;
  challanDate: string;
  item: string;
  receivedQuantity: number;
  quantityType: string;
}

export interface Challan {
  orderNo: string;
  orderDate: string;
  challanNo: string;
  challanDate: string;
  item: string;
  receivedQuantity: number;
  quantityType: string;
}

export interface Invoice {
  challanNo: string;
  challanDate: string;
  invoiceNo: string;
  invoiceDate: string;
  itemName: string;
  quantity: number;
  itemType: string;
  invoiceAmount?: number;
}

export interface ItemLedgerEntry {
  challanDate: string;
  challanNo: string;
  receivedQuantity: number;
  issueDate: string;
  issuedTo: string;
  quantity: number;
  balanceQuantity: number;
}

export interface VendorLedgerInvoice {
  invoiceDate: string;
  invoiceNo: string;
  invoiceAmount: number;
}

export interface VendorLedgerPayment {
  paymentDate: string;
  modeOfPayment: string;
  paymentAmount: number;
}
