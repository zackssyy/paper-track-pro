import { Item, Vendor, Quantity, Order, Challan, Invoice, ItemLedgerEntry, VendorLedgerInvoice, VendorLedgerPayment } from '@/types';

export const itemsData: Item[] = [
  { itemNumber: '001', itemName: 'Standard Paper', description: 'A4 size white paper', size: 'A4', color: 'White' },
  { itemNumber: '002', itemName: 'Premium Paper', description: 'A4 size glossy paper', size: 'A4', color: 'Cream' },
  { itemNumber: '003', itemName: 'Answer Book', description: '24 pages answer booklet', size: 'A5', color: 'Blue' },
  { itemNumber: '004', itemName: 'Graph Paper', description: 'Grid pattern paper', size: 'A4', color: 'White' },
  { itemNumber: '005', itemName: 'OMR Sheet', description: 'Optical mark recognition sheet', size: 'A4', color: 'White' },
];

export const vendorsData: Vendor[] = [
  { vendorCode: 'V001', vendorName: 'Paper Supplies Ltd', vendorAddress: '123 Main St, City', vendorContact: '9876543210', materialType: 'Paper' },
  { vendorCode: 'V002', vendorName: 'Quality Stationery', vendorAddress: '456 Market Rd, Town', vendorContact: '9876543211', materialType: 'Stationery' },
  { vendorCode: 'V003', vendorName: 'Print Masters', vendorAddress: '789 Industrial Area', vendorContact: '9876543212', materialType: 'Printing Materials' },
  { vendorCode: 'V004', vendorName: 'Exam Supplies Co', vendorAddress: '321 Business Park', vendorContact: '9876543213', materialType: 'Examination Materials' },
];

export const quantitiesData: Quantity[] = [
  { quantityId: 'Q001', quantityName: 'Ream', quantity: 500 },
  { quantityId: 'Q002', quantityName: 'Bundle', quantity: 100 },
  { quantityId: 'Q003', quantityName: 'Box', quantity: 1000 },
  { quantityId: 'Q004', quantityName: 'Packet', quantity: 50 },
];

export const ordersData: Order[] = [
  { orderNumber: 'ORD001', orderDate: '2024-01-15', challanNo: 'CH001', challanDate: '2024-01-16', item: 'Standard Paper', receivedQuantity: 10, quantityType: 'Ream' },
  { orderNumber: 'ORD002', orderDate: '2024-01-20', challanNo: 'CH002', challanDate: '2024-01-21', item: 'Answer Book', receivedQuantity: 50, quantityType: 'Bundle' },
  { orderNumber: 'ORD003', orderDate: '2024-02-05', challanNo: 'CH003', challanDate: '2024-02-06', item: 'OMR Sheet', receivedQuantity: 5, quantityType: 'Box' },
];

export const challansData: Challan[] = [
  { orderNo: 'ORD001', orderDate: '2024-01-15', challanNo: 'CH001', challanDate: '2024-01-16', item: 'Standard Paper', receivedQuantity: 10, quantityType: 'Ream' },
  { orderNo: 'ORD002', orderDate: '2024-01-20', challanNo: 'CH002', challanDate: '2024-01-21', item: 'Answer Book', receivedQuantity: 50, quantityType: 'Bundle' },
  { orderNo: 'ORD003', orderDate: '2024-02-05', challanNo: 'CH003', challanDate: '2024-02-06', item: 'OMR Sheet', receivedQuantity: 5, quantityType: 'Box' },
];

export const invoicesData: Invoice[] = [
  { challanNo: 'CH001', challanDate: '2024-01-16', invoiceNo: 'INV001', invoiceDate: '2024-01-17', itemName: 'Standard Paper', quantity: 10, itemType: 'Ream', invoiceAmount: 5000 },
  { challanNo: 'CH002', challanDate: '2024-01-21', invoiceNo: 'INV002', invoiceDate: '2024-01-22', itemName: 'Answer Book', quantity: 50, itemType: 'Bundle', invoiceAmount: 12500 },
  { challanNo: 'CH003', challanDate: '2024-02-06', invoiceNo: 'INV003', invoiceDate: '2024-02-07', itemName: 'OMR Sheet', quantity: 5, itemType: 'Box', invoiceAmount: 7500 },
];

export const itemLedgerData: ItemLedgerEntry[] = [
  { challanDate: '2024-01-16', challanNo: 'CH001', receivedQuantity: 10, issueDate: '2024-01-20', issuedTo: 'Dept A', quantity: 5, balanceQuantity: 5 },
  { challanDate: '2024-01-21', challanNo: 'CH002', receivedQuantity: 50, issueDate: '2024-01-25', issuedTo: 'Dept B', quantity: 20, balanceQuantity: 30 },
  { challanDate: '2024-02-06', challanNo: 'CH003', receivedQuantity: 5, issueDate: '2024-02-10', issuedTo: 'Dept C', quantity: 2, balanceQuantity: 3 },
];

export const vendorInvoicesData: VendorLedgerInvoice[] = [
  { invoiceDate: '2024-01-17', invoiceNo: 'INV001', invoiceAmount: 5000 },
  { invoiceDate: '2024-01-22', invoiceNo: 'INV002', invoiceAmount: 12500 },
  { invoiceDate: '2024-02-07', invoiceNo: 'INV003', invoiceAmount: 7500 },
];

export const vendorPaymentsData: VendorLedgerPayment[] = [
  { paymentDate: '2024-01-25', modeOfPayment: 'Bank Transfer', paymentAmount: 5000 },
  { paymentDate: '2024-02-01', modeOfPayment: 'Cheque', paymentAmount: 10000 },
];
