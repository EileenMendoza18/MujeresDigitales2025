import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common"

@Injectable ()
export class ParseUpperTrimPipe implements PipeTransform {

    transform (value: any, metadata?: ArgumentMetadata){
        if (typeof value==="string"){
            return value.trim().toUpperCase();
        }
        return value;

    }

}