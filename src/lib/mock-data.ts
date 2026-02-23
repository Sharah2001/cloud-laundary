export const timeSlots = [
  "8:00 AM – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
];

export interface Laundry {
  id: string;
  name: string;
  distance: string;
  pricePerKg: number;
  rating: number;
  estimatedDelivery: string;
  services: string[];
}

export const laundries: Laundry[] = [
  {
    id: "l1",
    name: "SparkleWash Express",
    distance: "1.2 km",
    pricePerKg: 250,
    rating: 4.8,
    estimatedDelivery: "2 days",
    services: ["Wash & Fold", "Dry Clean", "Ironing", "Express Service"],
  },
  {
    id: "l2",
    name: "FreshPress Laundry",
    distance: "2.5 km",
    pricePerKg: 200,
    rating: 4.5,
    estimatedDelivery: "3 days",
    services: ["Wash & Fold", "Ironing"],
  },
  {
    id: "l3",
    name: "CleanMaster Pro",
    distance: "3.0 km",
    pricePerKg: 180,
    rating: 4.2,
    estimatedDelivery: "2-3 days",
    services: ["Wash & Fold", "Dry Clean", "Ironing"],
  },
  {
    id: "l4",
    name: "Royal Dry Cleaners",
    distance: "0.8 km",
    pricePerKg: 320,
    rating: 4.9,
    estimatedDelivery: "1-2 days",
    services: ["Wash & Fold", "Dry Clean", "Ironing", "Express Service"],
  },
];

export interface DriverOrder {
  id: string;
  customer: string;
  address: string;
  pickupTime: string;
  status: "pending" | "accepted" | "picked_up" | "delivered";
  laundry: string;
}

export const driverOrders: DriverOrder[] = [
  { id: "ORD-1001", customer: "Kasun Perera", address: "45 Galle Road, Colombo 3", pickupTime: "10:00 AM", status: "pending", laundry: "SparkleWash Express" },
  { id: "ORD-1002", customer: "Sarah Williams", address: "12 High Street, London", pickupTime: "2:00 PM", status: "accepted", laundry: "FreshPress Laundry" },
  { id: "ORD-1003", customer: "Nimal Silva", address: "78 Kandy Road, Colombo 7", pickupTime: "9:00 AM", status: "picked_up", laundry: "CleanMaster Pro" },
];

export interface LaundryOrder {
  id: string;
  customer: string;
  weight: number;
  services: string[];
  status: "incoming" | "accepted" | "washing" | "ready";
  actualWeight?: number;
}

export const laundryOrders: LaundryOrder[] = [
  { id: "ORD-1001", customer: "Kasun Perera", weight: 5, services: ["Wash & Fold", "Ironing"], status: "incoming" },
  { id: "ORD-1002", customer: "Sarah Williams", weight: 8, services: ["Dry Clean"], status: "accepted" },
  { id: "ORD-1003", customer: "Nimal Silva", weight: 3, services: ["Wash & Fold"], status: "washing" },
  { id: "ORD-1004", customer: "Amara De Silva", weight: 10, services: ["Wash & Fold", "Ironing", "Express Service"], status: "ready", actualWeight: 9.5 },
];

export const orderStatuses = [
  { key: "booked", label: "Booked", date: "Feb 23, 10:00 AM" },
  { key: "driver_assigned", label: "Driver Assigned", date: "Feb 23, 10:15 AM" },
  { key: "picked_up", label: "Picked Up", date: "Feb 23, 11:00 AM" },
  { key: "washing", label: "Washing", date: "Feb 23, 2:00 PM" },
  { key: "ready", label: "Ready", date: "" },
  { key: "out_for_delivery", label: "Out for Delivery", date: "" },
  { key: "delivered", label: "Delivered", date: "" },
];
