export interface User {
    "id": string,
    "firstName": string,
    "lastName": string, 
    "age": string,
}  


export interface APIResponse {
    "users": User[],
    "total": number,
    "skip": number,
    "limit": number
}