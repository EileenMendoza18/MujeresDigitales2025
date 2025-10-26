import { NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from 'bcrypt';


const userFake= [
                {id: 1, name:"Jefferson", email: "jefferson@gmail.com", password: "12345", role: "admin"},
                { id: 2, name: "Eileen", email: "eileen@gmail.com",  password: "12345", role: "admin"}
]
jest.mock('bcrypt')


describe ('UsersService', () => {

    let service: UsersService;
    let fakeRepo;

    beforeEach(() => {
        jest.clearAllMocks();
        fakeRepo = {
            find: jest.fn().mockResolvedValue(userFake),
            findOne: jest.fn().mockResolvedValue(userFake),
            create: jest.fn().mockResolvedValue(userFake),
            save: jest.fn().mockResolvedValue(userFake),
            update: jest.fn().mockResolvedValue(userFake),
            delete: jest.fn().mockResolvedValue(userFake),
        };
        service = new UsersService(fakeRepo as any)

    })

    it ('Deberia devolver todos los usuarios', async () =>{
        const users = await service.findAll();
        expect(users.length).toBeGreaterThan(0);
        expect(fakeRepo.find).toHaveBeenCalled();
    })

    it ('Deberia retornar un usuario por id', async () => {
        fakeRepo.findOne.mockResolvedValue(userFake[0])
        const result = await service.findOne(1)
        expect(result.email).toEqual('jefferson@gmail.com')
    })

    it ('Deberia lanzar un excepcion si el usuario no existe', async () =>{
        fakeRepo.findOne.mockResolvedValue(null)
        await expect(service.findOne(99)).rejects.toThrow(NotFoundException)

    })
    it ('Deberia crear un usuario', async () => {
        const newUserMock = {name: 'Carlos', email: 'carlito@gmail.com', password: '1234'}
        fakeRepo.save.mockResolvedValue({id:3, ... newUserMock})
        const result= await service.create(newUserMock as any)
        expect(result.id).toBe(3);
    })

    it ('Deberia actualizar un usuario', async () =>{
        const updateUser = {id: 1, name: "Jefferson Dev", role: "admin"}
        fakeRepo.update.mockResolvedValue({affected: 1})
        fakeRepo.findOne.mockResolvedValue(updateUser)
        
        const result = await service.update(1, {name:"Jefferson Dev", role: "admin"})
        expect(fakeRepo.update).toHaveBeenCalledWith(1, {name:"Jefferson Dev", role: "admin"})
        expect(result.name).toEqual("Jefferson Dev")
    })

    it ('Deberia actualizar un usuario y encriptar la nueva contraseña', async () =>{
        const updateUser = {id: 1 , name: "Jefferson Dev", role: "admin", password: 'newpass'};
        (bcrypt.hash as jest.Mock).mockResolvedValue('new_hashed_password');
        fakeRepo.update.mockResolvedValue({affected: 1})
        fakeRepo.findOne.mockResolvedValue({...updateUser, password: 'new_hashed_password'})
        
        const result = await service.update(1, updateUser as any)
        expect(bcrypt.hash).toHaveBeenCalledWith('newpass', 10)
        expect(fakeRepo.update).toHaveBeenCalledWith(1, {...updateUser, password: 'new_hashed_password'})
        expect(result.password).toBe('new_hashed_password')
    })

    it('Deberia eliminar un usuario', async () =>{
        fakeRepo.delete.mockResolvedValue({affected: 1})
        const result = await service.remove(1)
        expect(fakeRepo.delete).toHaveBeenCalledWith(1)
        expect(result).toEqual({delete: `El usuario con id 1 fue eliminado correctamente`})
    })
})