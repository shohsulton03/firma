import { HttpException } from "@nestjs/common";

export class BlogNotFoundExeption extends HttpException{
    constructor(){
        super('Blog not found', 404)
    }
}

export class FileIsMissinExeption extends HttpException{
    constructor(){
        super('File is missing', 400)
    }
}