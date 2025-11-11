import { useLocalStorage } from './useLocalStorage';
import { 
  Item, 
  Vendor, 
  Department,
  PurchaseOrder,
  Challan, 
  Bill,
  ItemIssue
} from '@/types';
import { 
  itemsData, 
  vendorsData, 
  departmentsData,
  purchaseOrdersData,
  challansData, 
  billsData,
  itemIssuesData
} from '@/data/dummyData';

// Custom hooks for each data type
export function useItems() {
  return useLocalStorage<Item[]>('app_items', itemsData);
}

export function useVendors() {
  return useLocalStorage<Vendor[]>('app_vendors', vendorsData);
}

export function useDepartments() {
  return useLocalStorage<Department[]>('app_departments', departmentsData);
}

export function usePurchaseOrders() {
  return useLocalStorage<PurchaseOrder[]>('app_purchase_orders', purchaseOrdersData);
}

export function useChallans() {
  return useLocalStorage<Challan[]>('app_challans', challansData);
}

export function useBills() {
  return useLocalStorage<Bill[]>('app_bills', billsData);
}

export function useItemIssues() {
  return useLocalStorage<ItemIssue[]>('app_item_issues', itemIssuesData);
}
