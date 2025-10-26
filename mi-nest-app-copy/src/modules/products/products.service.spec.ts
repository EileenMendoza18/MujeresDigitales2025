import { ProductsService } from "./products.service"

describe('ProductService', () => {
    let service: ProductsService;
    let fakeRepo: any;
    let fakePipe: any;

    beforeEach(() => {
        jest.clearAllMocks();

        fakeRepo = {
            productsAll: jest.fn(),
            productOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
        }

        fakePipe = {
            
            transform: jest.fn((value) => value), 
        };

        service = new ProductsService (fakeRepo, fakePipe)

    })

    it ('Debearia desactivar un producto correctamente', async () => {
        const product = {id: 1, name: "Guantes", status: true};

        fakeRepo.update.mockResolvedValue({affetcted: 1});
        const result = await service.softDelete(1);

        expect(fakeRepo.update).toHaveBeenCalledWith(1, {active: false});
        expect(result).toEqual({
            message: `Producto con ID 1 marcado como inactivo`
        })

    })

})