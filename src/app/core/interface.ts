export interface Categories {
    id: number,
    name: string,
}
export interface Domains {
    id: number,
    domainName: string,
    domainExtension: string,
    price: number,
    cart: boolean,
    categories: [],
}