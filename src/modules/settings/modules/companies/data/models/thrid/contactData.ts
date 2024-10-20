export class ContactModel{
    id: number;
    names: string;
    lastNames: string;
    email: string;
    phone: string;

    constructor({
        id,
        names,
        lastNames,
        email,
        phone,
    }:{
        id?: number;
        names?: string;
        lastNames?: string;
        email?: string;
        phone?: string;
    }){
        this.id= id?? 0 ;
        this.names= names?? '' ;
        this.lastNames= lastNames?? '' ;
        this.email= email?? '' ;
        this.phone= phone?? '' ;
    }

    static toJson(contactModel: ContactModel){
        return{
            id: contactModel.id,
            nombre: contactModel.names,
            apellido: contactModel.lastNames,
            correo_electronico: contactModel.email,
            telefono: contactModel.phone,
        }
    }

    static fromJson(json: any){
        return new ContactModel({
            id: json.id,
            names: json.nombre,
            lastNames: json.apellido,
            email: json.correo_electronico,
            phone: json.telefono,
        })
    }
}