import { CreateProductDTO } from "./create-products.dto";

// Este DTO se utiliza para actualizar la informacion de un producto
// existente en el sistema.

// Extiende de la clase `CreateProductDTO`, lo que significa que hereda
// todas las validaciones definidas para la creacion de productos,
// se reutiliza la logica existente sin tener que 
// volver a escribir las mismas reglas de validacion.
//
// En caso de necesitar validaciones especificas para la actualizacion,
// estas se podrian agregar dentro de esta clase sin afectar a CreateProductDTO.

export class UpdateProductDTO extends (CreateProductDTO){


}