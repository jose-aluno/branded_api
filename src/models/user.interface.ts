import { Address } from "cluster";

export interface User{
    id: number;
    name: string;
    email: string;
    password: string;
    address?: Address;
}