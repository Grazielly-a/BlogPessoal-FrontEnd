import { postagens } from "./postagens"

export class usuario{
    public id: number
    public nome: string
    public usuario: string
    public senha: string
    public foto: string
    public tipo: string
    public postagens: postagens[]
}