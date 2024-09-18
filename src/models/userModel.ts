export class UserModel{
    id: number;
    names: string;
    lastNames: string;
    documentType: string;
    documentNumber: string;
    email: string;
    rol: number;

    constructor({
        id,
        names,
        lastNames,
        documentType,
        documentNumber,
        email,
        rol,
    } : {
        id?: number;
        names?: string;
        lastNames?: string;
        documentType?: string;
        documentNumber?: string;
        email?: string;
        rol?: number;
    }){
        this.id= id?? 0;
        this.names= names?? '';
        this.lastNames= lastNames?? '';
        this.documentType= documentType?? '';
        this.documentNumber= documentNumber?? '';
        this.email= email?? '';
        this.rol= rol?? 0;
    }
}
