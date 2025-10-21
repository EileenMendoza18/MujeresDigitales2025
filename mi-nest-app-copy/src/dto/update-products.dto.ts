import { CreateProductDTO } from "./create-products.dto";


// En caso de necesitar validaciones especificas para la actualizacion,
// estas se podrian agregar dentro de esta clase sin afectar a CreateProductDTO.

/**
 * @class UpdateProductDTO
 * @extends CreateProductDTO
 * * Data Transfer Object (DTO) para la actualización de un producto existente.
 * Extiende de `CreateProductDTO` para heredar todas sus reglas de validación,
 * permitiendo la reutilización de la lógica para el *reemplazo* completo de un producto.
 */
export class UpdateProductDTO extends (CreateProductDTO){


}