import { HttpException } from "@nestjs/common";

export class ContactNotFoundExeption extends HttpException{
    constructor(){
        super('Contact not found', 404)
    }
}