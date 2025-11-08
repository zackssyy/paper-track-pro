import { useLocalStorage } from './useLocalStorage';
import { 
  Item, 
  Vendor, 
  Quantity, 
  Order, 
  Challan, 
  Invoice, 
  VendorLedgerPayment 
} from '@/types';
import { 
  itemsData, 
  vendorsData, 
  quantitiesData, 
  ordersData, 
  challansData, 
  invoicesData,
  vendorPaymentsData
} from '@/data/dummyData';

// Custom hooks for each data type
export function useItems() {
  return useLocalStorage<Item[]>('app_items', itemsData);
}

export function useVendors() {
  return useLocalStorage<Vendor[]>('app_vendors', vendorsData);
}

export function useQuantities() {
  return useLocalStorage<Quantity[]>('app_quantities', quantitiesData);
}

export function useOrders() {
  return useLocalStorage<Order[]>('app_orders', ordersData);
}

export function useChallans() {
  return useLocalStorage<Challan[]>('app_challans', challansData);
}

export function useInvoices() {
  return useLocalStorage<Invoice[]>('app_invoices', invoicesData);
}

export function useVendorPayments() {
  return useLocalStorage<VendorLedgerPayment[]>('app_vendor_payments', vendorPaymentsData);
}
