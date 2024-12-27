import { City } from "./city";
import { Customer } from "./customer";
import { group } from "./group";

export interface Event{
    id:number,
    name:string,
    date:Date,
    location:string,
    description:string,
    capacity:number,
    status:string,
    customer:Customer
    city:City,
    group:group,
    filePath:string[]

}