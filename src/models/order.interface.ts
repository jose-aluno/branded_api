import { CartItem } from "./cart-item.interface";

export interface Order{
    id: number;
    userId: number;
    items: CartItem[];
    totalValue: number;
    createdAt: Date
}