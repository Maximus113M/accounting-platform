import { BasicData, basicDataFromJson, basicDataToJson } from '../basicData';
import { BillingData } from './billingData';
import { ContactModel } from './contactData';
import { ThirdType } from './thirdTypes';

export class ThirdModel{
    id: number;
    companySerial: number;
    warehouseCode: number | null;
    basicData: BasicData;
    billingData: BillingData;
    contacts: ContactModel[];
    thirdType: ThirdType[];
    constructor({
        id,
        companySerial,
        warehouseCode,
        basicData,
        billingData,
        contacts,
        thirdType,
    }:{
        id?: number;
        companySerial?: number;
        warehouseCode?: number | null;
        basicData?: BasicData;
        billingData?: BillingData;
        contacts?: ContactModel[];
        thirdType?: ThirdType[];
    }){
        this.id = id ?? 0;
        this.companySerial= companySerial?? 0;
        this.warehouseCode= warehouseCode?? 0;
        this.basicData= basicData?? new BasicData({});
        this.billingData = billingData ?? new BillingData({});
        this.contacts = contacts ?? [];
        this.thirdType= thirdType ?? [];
    }

    static thirdModelFromJson= (json: any)=>{
       //debugger
       return new ThirdModel({
            id: json.id,
            companySerial: json.empresa_serial,
            warehouseCode: json.codigo_sucursal,
            basicData: basicDataFromJson(json.datos_basicos),
            billingData: BillingData.fromJson(json.datos_facturacion),
            contacts: (json.contactos as any[])?.map((item)=> ContactModel.fromJson(item)),
            thirdType: (json.tipo_terceros as any[])?.map((item)=> ThirdType.fromJson(item)),                 
       });
    }

    static thirdModelToJson(thirdModel: ThirdModel){
        return{
            id: thirdModel.id,
            datos_terceros:{
                codigo_sucursal: thirdModel.warehouseCode,
                tipo_tercero: thirdModel.thirdType.map((thirdType)=> thirdType.id)
            },
            empresa_serial: thirdModel.companySerial,
            datos_basicos: basicDataToJson(thirdModel.basicData),
            datos_facturacion: BillingData.toJson(thirdModel.billingData),
            datos_contactos: thirdModel.contacts.length > 0? thirdModel.contacts.map((contact)=> ContactModel.toJson(contact)) : null,
        }
    }
}
