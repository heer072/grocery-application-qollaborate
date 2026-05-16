export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface DeliveryLocation {
  zone: string;
  area: string;
}
