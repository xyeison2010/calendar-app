export interface Category {
    id: number
    name: string
    sublevels?: Category[] //q es opcional
}
export type CartItem ={

   
    product? : Products,
    quantity : number 
  }
export interface Products {
 
    id: string
    name: string
    quantity: number
    price: string
    available: boolean
    sublevel_id: number
   
   
}