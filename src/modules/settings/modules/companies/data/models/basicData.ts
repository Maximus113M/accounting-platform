class BasicData{
    businessTypeName: string;
    documentType: string;
    documentNumber: number;
    businessName: string;
    companyName: string;
    address: string;
    phone: number;
    city: City;

    constructor({
        businessTypeName,
        documentType,
        documentNumber,
        businessName,
        companyName,
        address,
        phone,
        city,
    }:{
        businessTypeName?: string;
        documentType?: string;
        documentNumber?: number;
        businessName?: string;
        companyName?: string;
        address?: string;
        phone?: number;
        city?: City;
    }){
        this.businessTypeName= businessTypeName?? '';
        this.documentType= documentType?? '';
        this.documentNumber= documentNumber?? 0;
        this.businessName= businessName?? '';
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
        businessTypeName: json.tipo_razon_social,
        documentType: json.tipo_identificacion,
        documentNumber: json.numero_identificacion,
        businessName: json.razon_social,
        companyName: json.nombre_comercial,
        address: json.direccion,
        phone: json.telefono,
        //TODO REVISAR
        city: new City({
            code: json.ciudad_codigo_dian?.ciudad_codigo_dian, 
        }),
    });
}

const basicDataToJson = (basicData: BasicData)=>{
    return {
        tipo_razon_social: basicData.businessTypeName,
        tipo_identificacion: basicData.documentType,
        numero_identificacion: basicData.documentNumber,
        razon_social: basicData.businessName,
        nombre_comercial: basicData.companyName,
        direccion: basicData.address,
        telefono: basicData.phone,
        ciudad_codigo_dian: basicData.city.code,
    };
}

export{ BasicData, City, basicDataFromJson, basicDataToJson }