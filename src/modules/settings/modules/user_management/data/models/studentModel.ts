import { UserModel } from 'src/models/userModel';

class StudentModel extends UserModel{
    groupCode: number;

    constructor({
        id,
        names,
        lastNames,
        documentType,
        documentNumber,
        email,
        rol,
        groupCode
    } : {
        id: number;
        names?: string;
        lastNames?: string;
        documentType?: string;
        documentNumber?: string;
        email?: string;
        rol: number;
        groupCode: number;
    }){
        super({id, names, lastNames, documentType, documentNumber, email, rol});
        this.groupCode= groupCode;
    }
}

const studentModelFromJson = (json: any) =>{
    return new StudentModel({
        id: json.id,
        names: json.nombres,
        lastNames: json.apellidos,
        documentType: json.tipo_identificacion,
        documentNumber: json.numero_identificacion,
        email: json.email,
        rol: json.rol_id_rol,
        groupCode: json.ficha,
    });
}

const studentModelToJson = (student: StudentModel) =>{
    return {
        id: student.id,
        nombres: student.names,
        apellidos: student.lastNames,
        tipo_identificacion: student.documentType,
        numero_identificacion: student.documentNumber,
        email: student.email,
        rol_id_rol: student.rol,
        ficha: student.groupCode,
    };
}

export { StudentModel, studentModelFromJson, studentModelToJson }