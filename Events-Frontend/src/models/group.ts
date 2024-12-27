import { Customer } from "./customer";

export interface group{
    id:number,
    name:string,
    admin:Customer,
    users:Customer[]
}