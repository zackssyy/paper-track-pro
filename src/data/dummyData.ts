import { Item, Vendor, Department, PurchaseOrder, Challan, Bill, ItemIssue } from '@/types';

export const itemsData: Item[] = [
  { itemNumber: '001', itemName: 'Standard Paper', description: 'A4 size white paper', size: 'A4', color: 'White', currentStock: 500 },
  { itemNumber: '002', itemName: 'Premium Paper', description: 'A4 size glossy paper', size: 'A4', color: 'Cream', currentStock: 300 },
  { itemNumber: '003', itemName: 'Answer Book', description: '24 pages answer booklet', size: 'A5', color: 'Blue', currentStock: 1000 },
  { itemNumber: '004', itemName: 'Graph Paper', description: 'Grid pattern paper', size: 'A4', color: 'White', currentStock: 200 },
  { itemNumber: '005', itemName: 'OMR Sheet', description: 'Optical mark recognition sheet', size: 'A4', color: 'White', currentStock: 150 },
];

export const vendorsData: Vendor[] = [
  { vendorCode: 'V001', vendorName: 'Paper Supplies Ltd', vendorAddress: '123 Main St, City', vendorContact: '9876543210', materialType: 'Paper' },
  { vendorCode: 'V002', vendorName: 'Quality Stationery', vendorAddress: '456 Market Rd, Town', vendorContact: '9876543211', materialType: 'Stationery' },
  { vendorCode: 'V003', vendorName: 'Print Masters', vendorAddress: '789 Industrial Area', vendorContact: '9876543212', materialType: 'Printing Materials' },
  { vendorCode: 'V004', vendorName: 'Exam Supplies Co', vendorAddress: '321 Business Park', vendorContact: '9876543213', materialType: 'Examination Materials' },
];

export const departmentsData: Department[] = [
  { departmentCode: 'DEPT001', departmentName: 'IT Department', departmentHead: 'John Smith', contactNumber: '9876543214' },
  { departmentCode: 'DEPT002', departmentName: 'HR Department', departmentHead: 'Jane Doe', contactNumber: '9876543215' },
  { departmentCode: 'DEPT003', departmentName: 'Finance Department', departmentHead: 'Bob Johnson', contactNumber: '9876543216' },
];

export const purchaseOrdersData: PurchaseOrder[] = [
  { orderNumber: 'PO001', orderDate: '2024-01-15', vendorCode: 'V001', itemNumber: '001', orderedQuantity: 100, receivedQuantity: 60, unit: 'Ream', status: 'Partial' },
  { orderNumber: 'PO002', orderDate: '2024-01-20', vendorCode: 'V002', itemNumber: '003', orderedQuantity: 200, receivedQuantity: 200, unit: 'Bundle', status: 'Completed' },
  { orderNumber: 'PO003', orderDate: '2024-02-05', vendorCode: 'V004', itemNumber: '005', orderedQuantity: 50, receivedQuantity: 0, unit: 'Box', status: 'Pending' },
];

export const challansData: Challan[] = [
  { challanNo: 'CH001', challanDate: '2024-01-18', orderNumber: 'PO001', vendorCode: 'V001', itemNumber: '001', receivedQuantity: 40, unit: 'Ream' },
  { challanNo: 'CH002', challanDate: '2024-01-22', orderNumber: 'PO001', vendorCode: 'V001', itemNumber: '001', receivedQuantity: 20, unit: 'Ream' },
  { challanNo: 'CH003', challanDate: '2024-01-25', orderNumber: 'PO002', vendorCode: 'V002', itemNumber: '003', receivedQuantity: 200, unit: 'Bundle' },
];

export const billsData: Bill[] = [
  { billNo: 'BILL001', billDate: '2024-01-20', challanNo: 'CH001', vendorCode: 'V001', itemNumber: '001', quantity: 40, unit: 'Ream', ratePerUnit: 500, amount: 20000, cgstPercent: 9, cgstAmount: 1800, sgstPercent: 9, sgstAmount: 1800, totalAmount: 23600, isPaid: false },
  { billNo: 'BILL002', billDate: '2024-01-27', challanNo: 'CH003', vendorCode: 'V002', itemNumber: '003', quantity: 200, unit: 'Bundle', ratePerUnit: 25, amount: 5000, cgstPercent: 9, cgstAmount: 450, sgstPercent: 9, sgstAmount: 450, totalAmount: 5900, isPaid: true },
];

export const itemIssuesData: ItemIssue[] = [
  { issueNo: 'ISS001', issueDate: '2024-01-28', itemNumber: '001', departmentCode: 'DEPT001', issuedQuantity: 10, unit: 'Ream', issuedBy: 'Admin User', issuedTo: 'John Smith' },
  { issueNo: 'ISS002', issueDate: '2024-02-02', itemNumber: '003', departmentCode: 'DEPT002', issuedQuantity: 50, unit: 'Bundle', issuedBy: 'Admin User', issuedTo: 'Jane Doe' },
];
