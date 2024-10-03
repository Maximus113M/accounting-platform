class UserModel{
    id: number;
    names: string;
    lastNames: string;
    documentType: string;
    documentNumber: string;
    email: string;
    rol: number;
    classGroupCode: number | undefined;
    accessToken: string;


    constructor({
        id,
        names,
        lastNames,
        documentType,
        documentNumber,
        email,
        rol,
        classGroupCode,
        accessToken
    } : {
        id?: number;
        names?: string;
        lastNames?: string;
        documentType?: string;
        documentNumber?: string;
        email?: string;
        rol?: number;
        classGroupCode?: number;
        accessToken?: string;
    }){
        this.id= id?? 0;
        this.names= names?? '';
        this.lastNames= lastNames?? '';
        this.documentType= documentType?? '';
        this.documentNumber= documentNumber?? '';
        this.email= email?? '';
        this.rol= rol?? 0;
        this.classGroupCode= classGroupCode;
        this.accessToken= accessToken?? '';
    }
}

const userModelFromJson = (json: any) =>{
    return new UserModel({
        id: json.id,
        names: json.nombres,
        lastNames: json.apellidos,
        documentType: json.tipo_identificacion,
        documentNumber: json.numero_identificacion,
        email: json.correo_electronico,
        rol: json.rol_id,
        classGroupCode: json.ficha,
    });
}

const userModelToJson = (user: UserModel) =>{
    return {
        id: user.id,
        nombres: user.names,
        apellidos: user.lastNames,
        tipo_identificacion: user.documentType,
        numero_identificacion: user.documentNumber,
        correo_electronico: user.email,
        rol_id: user.rol,
        ficha: user.classGroupCode,
    };
}

export { UserModel, userModelFromJson, userModelToJson }
