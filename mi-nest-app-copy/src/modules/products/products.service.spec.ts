import { NotFoundException } from "@nestjs/common";
import { ProductsService } from "./products.service"

//AAA 
/**
 * A: Arrange - Organizar
 * A: Act- Actuar
 * A: Assert: - Afirmar
 */

const mockproducts=[
    {id: 1, name: "balon", description: "balon futbol", price: 50000, category: "Otros", marca: "Hasbro", active: true},
    {id: 2, name: "guantes", description: "guates box", price: 60000, category: "Otros", marca: "Hasbro", active: true}
]

fdescribe('ProductService', () => {
    let service: ProductsService;
    let fakeRepo: any;
    let fakePipe: any;

    beforeEach(() => {
        jest.clearAllMocks();

        fakeRepo = {
            productsAll: jest.fn(),
            find: jest.fn(),
            productOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            push: jest.fn(),
            transform: jest.fn(),
            ILike: jest.fn(),
        }

        fakePipe = {
            
            transform: jest.fn((value: any) =>{
                if (typeof value==='string') return value.toUpperCase().trim();
                if (typeof value ==='number') return value;
                
                return  '';
            }),
        };

        service = new ProductsService (fakeRepo, fakePipe)

    })

    it('Deberia retornar todos los productos', async () => {
        fakeRepo.find.mockResolvedValue(mockproducts)

        const result = await service.productsAll();

        expect(fakeRepo.find).toHaveBeenCalledWith();
        expect(result[0].name).toEqual("balon")
        expect(result[1].name).toEqual("guantes")
    })

    it ('Deberia retornar un  producto por nombre/categoria/marca y retornar resultados', async () => {
        //Organizar
        fakeRepo.find.mockResolvedValue(mockproducts);
        //Actuar
        const busqueda = 'guantes';
        await service.productOne(busqueda);
        //Afirmar
        expect(fakeRepo.find).toHaveBeenCalledWith(
            expect.objectContaining({ // 1. Ignoramos propiedades en el nivel superior
                where: expect.arrayContaining([
                    expect.objectContaining({ name: expect.anything() }),
                    expect.objectContaining({ category: expect.anything() }),
                    expect.objectContaining({ marca: expect.anything() }),
                ]),
            })
        );
        expect(busqueda).toEqual('guantes')
    })

    it('Debería incluir filtros por id y price cuando la búsqueda es numérica', async () => {
        fakeRepo.find.mockResolvedValue(mockproducts);

        const busqueda = '1'; // activa id y price
        await service.productOne(busqueda);

        expect(fakeRepo.find).toHaveBeenCalledWith(
            expect.objectContaining({
            where: expect.arrayContaining([
                expect.objectContaining({ id: expect.any(Number) }),
                expect.objectContaining({ price: expect.any(Number) }),
            ]),
            }),
        );
    });

    it ('Deberia lanzar una excepcion si no encuentra el producto', async () =>{
        fakeRepo.find.mockResolvedValue(null)

        await expect(service.productOne('guantes')).rejects.toThrow(NotFoundException)
        expect(fakeRepo.find).toHaveBeenCalledWith(
            expect.objectContaining({ // 1. Ignoramos propiedades en el nivel superior
                where: expect.arrayContaining([
                    expect.objectContaining({ name: expect.anything() }),
                    expect.objectContaining({ category: expect.anything() }),
                    expect.objectContaining({ marca: expect.anything() }),
                ]),
            })
        );
        
    })

    it('Deberia crear un producto correctamente', async() => {
        const newProduct = {name: 'Pastel de fresa', description: 'Pastel frio con salsa de fresa', price: 30000, category: 'Pasteleria', marca: 'Oreo', active: true};
        const savedProduct = {id: 3, ...newProduct};

        fakeRepo.create.mockReturnValue(newProduct);
        fakeRepo.save.mockResolvedValue(savedProduct);

        const result = await service.create(newProduct as any);

        expect(fakeRepo.create).toHaveBeenCalledWith(newProduct);
        expect(fakeRepo.save).toHaveBeenCalledWith(newProduct);
        expect(result).toEqual(savedProduct);
    })

    it('Deberia actualizar un producto y retornar el producto actualizado', async() =>{
        const updateData = {name: 'Pastel de fresa', description: 'Pastel frio con salsa de fresa', price: 30000, category: 'Pasteleria', marca: 'Oreo', active: true};
        const updatedData = {id: 1, ...updateData};

        fakeRepo.update.mockResolvedValue({affected: 1});
        fakeRepo.find.mockResolvedValue([updatedData]);

        const result = await service.update(1, updateData);

        expect(fakeRepo.update).toHaveBeenCalledWith(1, updateData);
        expect(result).toEqual([updatedData]);
    } )

    it('Debería lanzar NotFoundException si el producto no existe', async () => {
        fakeRepo.update.mockResolvedValue({ affected: 0 });
        fakeRepo.find.mockResolvedValue([]);

        await expect(service.update(999, {} as any)).rejects.toThrow('Producto no encontrado');
    });

    it ('Debearia desactivar un producto correctamente', async () => {
        const product = {id: 1, name: "Guantes", status: true};

        fakeRepo.update.mockResolvedValue({affected: 1});
        const result = await service.softDelete(1);

        expect(fakeRepo.update).toHaveBeenCalledWith(1, {active: false});
        expect(result).toEqual({
            message: `Producto con ID 1 marcado como inactivo`
        })

    })


})