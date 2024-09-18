class BasicData{
    id: number;
    businessTypeName: string;
    documentType: string;
    documentNumber: number;
    businessName: string;
    names: string;
    lastNames: string;
    companyName: string;
    address: string;
    phone: number;
    city: City;

    constructor({
        id,
        businessTypeName,
        documentType,
        documentNumber,
        businessName,
        names,
        lastNames,
        companyName,
        address,
        phone,
        city,
    }:{
        id?: number;
        businessTypeName?: string;
        documentType?: string;
        documentNumber?: number;
        businessName?: string;
        names?: string;
        lastNames?: string;
        companyName?: string;
        address?: string;
        phone?: number;
        city?: City;
    }){
        this.id= id?? 0;
        this.businessTypeName= businessTypeName?? '';
        this.documentType= documentType?? '';
        this.documentNumber= documentNumber?? 0;
        this.businessName= businessName?? '';
        this.names= names?? '';
        this.lastNames= lastNames?? '';
        this.companyName= companyName?? '';
        this.address= address?? '';
        this.phone= phone?? 0;
        this.city= city?? new City({});
    }
}


class City{
    code: number;
    name: string;

    constructor({
        code,
        name,
    }:{
        code?: number;
        name?: string;
    }){
        this.code= code?? 0;
        this.name= name?? '';
    }
}

const basicDataFromJson = (json: any)=>{
    return new BasicData({
        id: json.id,
        businessTypeName: json.tipo_razon_social,
        documentType: json.tipo_identificacion,
        documentNumber: json.numero_identificacion,
        businessName: json.razon_social,
        names: json.nombres,
        lastNames: json.apellidos,
        companyName: json.nombre_comercial,
        address: json.direccion,
        phone: json.telefono,
        //TODO REVISAR
        city: new City({
            code: json.ciudad_codigo_dian?.codigo_dian, 
            name: json.ciudad_codigo_dian?.nombre,
        }),
    });
}

const basicDataToJson = (basicData: BasicData)=>{
    return {
        id: basicData.id,
        tipo_razon_social: basicData.businessTypeName,
        tipo_identificacion: basicData.documentType,
        numero_identificacion: basicData.documentNumber,
        razon_social: basicData.businessName,
        nombres: basicData.names,
        apellidos: basicData.lastNames,
        nombre_comercial: basicData.companyName,
        direccion: basicData.address,
        telefono: basicData.phone,
        ciudad_codigo_dian: basicData.city.code,
    };
}

export{ BasicData, City, basicDataFromJson, basicDataToJson }