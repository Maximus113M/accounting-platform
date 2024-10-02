import { UserModel } from 'src/models/userModel';
import { LegalRepresentative, legalRepresentativeFromJson, legalRepresentativeToJson } from './legalRepresentative';
import { TaxData, taxDataFromJson, taxDataToJson } from './taxData';
import { BasicData, basicDataFromJson, basicDataToJson } from './basicData';

class CompanyModel{
    serial: number;
    regimeType: string;
    emailContact: string;
    nameContact: string;
    pageUrl: string;
    isConsortium: boolean;
    debtCollector: number;
    logo: File | string | null;
    relatedUser: UserModel;
    taxData: TaxData;
    legalRepresentative: LegalRepresentative;
    basicData: BasicData;

    constructor({
        serial,
        regimeType,
        emailContact,
        nameContact,
        pageUrl,
        isConsortium,
        debtCollector,
        logo,
        relatedUser,
        taxData,
        legalRepresentative,
        basicData
    }:{
        serial?: number;
        regimeType?: string;
        emailContact?: string;
        nameContact?: string;
        pageUrl?: string;
        isConsortium?: boolean;
        debtCollector?: number;
        logo?: File | string | null;
        relatedUser?: UserModel;
        taxData?: TaxData;
        legalRepresentative?: LegalRepresentative;
        basicData?: BasicData;
    }){
        this.serial= serial?? 0;
        this.regimeType= regimeType?? '003 No responsable de IVA';
        this.emailContact= emailContact?? '-';
        this.nameContact= nameContact?? '-';
        this.pageUrl= pageUrl?? '-';
        this.isConsortium= isConsortium?? false;
        this.debtCollector= debtCollector?? 2;
        this.logo= logo?? null;
        this.relatedUser= relatedUser?? new UserModel({});
        this.taxData= taxData?? new TaxData({});
        this.legalRepresentative= legalRepresentative?? new LegalRepresentative({});
        this.basicData= basicData?? new BasicData({});
    }
}

const companyModelFromJson= (json: any)=>{
    /*const x={
        "serial": 1591273261261,
        "tipo_regimen_iva": "003 No responsable de IVA",
        "correo_contacto": "-",
        "nombre_contacto": "-",
        "pagina_web": "-",
        "es_consorcio": 0,
        "cobrador_id": 2,
        "logo": "/storage/logos/1591273261261",
        "user_id": 1,
        "created_at": "2024-10-02T20:14:20.000000Z",
        "updated_at": "2024-10-02T20:14:20.000000Z",
        "datos_basicos": {
            "id": 21,
            "tipo_razon_social": "\"Empresa\"",
            "tipo_identificacion": "\"-\"",
            "numero_identificacion": 0,
            "razon_social": "\"-\"",
            "nombres": "null",
            "apellidos": "null",
            "nombre_comercial": "\"-\"",
            "direccion": "\"-\"",
            "telefono": 0,
            "ciudad_codigo_dian": 68276,
            "empresa_serial": 1591273261261,
            "tercero_id": null,
            "created_at": "2024-10-02T20:14:20.000000Z",
            "updated_at": "2024-10-02T20:14:20.000000Z"
        }
    }*/
    return new CompanyModel({
        serial: json.serial,
        regimeType: json.tipo_regimen_iva,
        emailContact: json.correo_contacto,
        nameContact: json.nombre_contacto,
        pageUrl: json.pagina_web,
        isConsortium: json.es_consorcio,
        debtCollector: json.cobrador_id,
        logo: json.datos_empresa?.logo,
        relatedUser: new UserModel({id: json.user_id}),
        //TODO REVIEW
        basicData: basicDataFromJson(json.datos_basicos),
        //TODO REVIEW
        taxData: taxDataFromJson(json.datos_tributarios),
        //TODO REVIEW
        legalRepresentative: legalRepresentativeFromJson(json.representante_legal),
    });
}

const companyModelToJson= (company: CompanyModel)=>{
    const formData = new FormData();

    const basicData: Record<string, any>= basicDataToJson(company.basicData);
    for(const key in basicData){
        formData.append(`datos_basicos[${key}]`, JSON.stringify(basicData[key]));
    }
    const companyData: Record<string, any>={
        tipo_regimen_iva: company.regimeType,
        correo_contacto: company.emailContact,
        nombre_contacto: company.nameContact,
        pagina_web: company.pageUrl,
        es_consorcio: company.isConsortium,
        cobrador_id: company.debtCollector,
        logo: company.logo,
        user_id: company.relatedUser.id === 0? null : company.relatedUser.id,
    } 
    for(const key in companyData){
        if(key === 'logo' && !companyData[key]){
            continue;
        }
        if(key === 'logo' && companyData[key]){
            formData.append(`datos_empresa[${key}]`, companyData[key]); 
            continue;
        }
        if(key === 'pagina_web' && companyData[key] === ''){
            continue;
        }
        if(key === 'user_id' && !companyData[key]){
            continue;
        }
         if(validateFormField({field: 'datos_empresa', key: key, value: companyData[key], formData: formData})) continue;
    }

    const taxData: Record<string, any>= taxDataToJson(company.taxData)
    for(const key in taxData){

        if(validateFormField({field: 'datos_tributarios', key: key, value: taxData[key], formData: formData})) continue;

        if(Array.isArray(taxData[key])){
            if(taxData[key].length === 0){
                if(key === 'responsabilidades_fiscales'){
                    taxData[key].push('R-99-PN');
                }else{
                    taxData[key].push(1);
                }
            }

            (taxData[key] as any[]).forEach((value)=>{
                formData.append(`datos_tributarios[${key}][]`, typeof value == 'number'? value.toString() : value );
            })
            
            continue;
        }

    }

    const legalRepresentative: Record<string, any>= legalRepresentativeToJson(company.legalRepresentative);
    for(const key in legalRepresentative){
        if(validateFormField({field: 'representante_legal', key: key, value: legalRepresentative[key], formData: formData})) continue;

        // if(typeof legalRepresentative[key] === 'boolean'){
        //     formData.append(`representante_legal[${key}]`, legalRepresentative[key]? '1':'0');
        //     continue;
        // }
        // if(typeof companyData[key] === 'number'){
        //     formData.append(`representante_legal[${key}]`, companyData[key].toString());
        //     continue;
        // }
    }
    
    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

    return formData;
}

const validateFormField= ({field, key, value, formData}:{field: string, key: string, value: any, formData: FormData})=>{
    if(typeof value === 'boolean'){
        formData.append(`${field}[${key}]`, value? '1':'0');
        return true;
    }
    if(typeof value === 'number'){
        formData.append(`${field}[${key}]`, value.toString());
        return true;
    }
    if(typeof value === 'string'){
        formData.append(`${field}[${key}]`, value);
        return true;
    }
    return false;
}


export{ CompanyModel, companyModelFromJson, companyModelToJson }