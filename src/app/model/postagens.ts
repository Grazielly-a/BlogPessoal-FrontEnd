import { temas } from "./temas"
import { usuario } from "./usuario"

export class postagens{
    public id: number
    public titulo: string
    public texto: string
    public data: Date
    public usuarios: usuario
    public temas: temas
}