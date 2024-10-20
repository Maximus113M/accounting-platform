import { FiscalResponsibilities } from "../taxData";

export class BillingData{
    names: string;
    lastNames: string;
    email: string;
    regimeType: string;
    phone: number | null;
    postalCode: number | null;
    fiscalResponsibilities: FiscalResponsibilities[];

    constructor({
        names,
        lastNames,
        email,
        regimeType,
        phone,
        postalCode,
        fiscalResponsibilities,
    }:{
        names?: string;
        lastNames?: string;
        email?: string;
        regimeType?: string;
        phone?: number | null;
        postalCode?: number | null;
        fiscalResponsibilities?: FiscalResponsibilities[];    
    }){
        this.names= names ?? '';
        this.lastNames= lastNames ?? '';
        this.email= email ?? '';
        this.regimeType= regimeType ?? '';
        this.phone= phone ?? null;
        this.postalCode= postalCode ?? null;
        this.fiscalResponsibilities= fiscalResponsibilities ?? [];
    }

    static toJson(billingData: BillingData){
        return{
            nombres_contacto: billingData.names,
            apellidos_contacto: billingData.lastNames,
            correo_electronico: billingData.email,
            tipo_regimen_iva: billingData.regimeType,
            telefono: billingData.phone,
            codigo_postal: billingData.postalCode,
            responsabilidades_fiscales: billingData.fiscalResponsibilities.map((fiscResp)=> fiscResp.key),
        }
    }

    static fromJson(json: any){
        return new BillingData({
            names: json.nombres_contacto,
            lastNames: json.apellidos_contacto,
            email: json.correo_electronico,
            regimeType: json.tipo_regimen_iva,
            phone: json.telefono,
            postalCode: json.codigo_postal,
            fiscalResponsibilities: (json.responsabilidades_fiscales as string[]).map((fiscRespKey)=> new FiscalResponsibilities({key: fiscRespKey})),
        })
    }
}