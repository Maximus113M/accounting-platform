import { BasicData, basicDataFromJson, basicDataToJson } from '../basicData';
import { ThirdData } from './thirdData';
import { BillingData } from './billingData';
import { ContactModel } from './contactData';

export class ThirdModel{
    companySerial: number;
    thirdData: ThirdData;
    basicData: BasicData;
    billingData: BillingData;
    contacts: ContactModel[];
    constructor({
        companySerial,
        thirdData,
        basicData,
        billingData,
        contacts,
    }:{
        companySerial?: number;
        thirdData?: ThirdData;
        basicData?: BasicData;
        billingData?: BillingData;
        contacts?: ContactModel[];
    }){
        this.companySerial= companySerial?? 0;
        this.thirdData= thirdData ?? new ThirdData({}) 
        this.basicData= basicData?? new BasicData({});
        this.billingData = billingData ?? new BillingData({});
        this.contacts = contacts ?? [];
    }

    static thirdModelFromJson= (json: any)=>{
       //debugger
       return new ThirdModel({
            companySerial: json.empresa_serial,
            thirdData: ThirdData.fromJson(json.datos_terceros),
            basicData: basicDataFromJson(json.datos_basicos),
            billingData: BillingData.fromJson(json.datos_facturacion),
            //REVIEW IS AN ARRAY
            contacts: json.datos_contactos,
       });
    }

    static thirdModelToJson(thirdModel: ThirdModel){
        return{
            empresa_serial: thirdModel.companySerial,
            datos_terceros: ThirdData.toJson(thirdModel.thirdData) ,
            datos_basicos: basicDataToJson(thirdModel.basicData),
            datos_facturacion: BillingData.toJson(thirdModel.billingData),
            datos_contactos: thirdModel.contacts.length > 0? thirdModel.contacts.map((contact)=> ContactModel.toJson(contact)) : null
        }
    }
}
