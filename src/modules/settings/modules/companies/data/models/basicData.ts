import { CityModel } from 'src/models/cityModel';

class BasicData{
    businessTypeName: string;
    documentType: string;
    documentNumber: number;
    names: string | null;
    lastnames: string | null;
    businessName: string | null;
    companyName: string;
    address: string;
    phone: number;
    city: CityModel;

    constructor({
        businessTypeName,
        names,
        lastnames,
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
        names?: string | null;
        lastnames?: string | null;
        businessName?: string | null;
        companyName?: string;
        address?: string;
        phone?: number;
        city?: CityModel;
    }){
        this.businessTypeName= businessTypeName?? '';
        this.documentType= documentType?? '';
        this.documentNumber= documentNumber?? 0;
        this.names= names?? null;
        this.lastnames= lastnames?? null;
        this.businessName= businessName?? null;
        this.companyName= companyName?? '';
        this.address= address?? '';
        this.phone= phone?? 0;
        this.city= city?? new CityModel({});
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
        city: new CityModel({dianCode: json.ciudad_codigo_dian}),
    });
}

const basicDataToJson = (basicData: BasicData)=>{
    return {
        tipo_razon_social: basicData.businessTypeName,
        tipo_identificacion: basicData.documentType,
        numero_identificacion: basicData.documentNumber,
        razon_social: basicData.businessName,
        nombres: basicData.names,
        apellidos: basicData.lastnames,
        nombre_comercial: basicData.companyName,
        direccion: basicData.address,
        telefono: basicData.phone,
        ciudad_codigo_dian: basicData.city.dianCode,
    };
}

export{ BasicData, basicDataFromJson, basicDataToJson }