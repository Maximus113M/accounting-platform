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
    logo: File | null;
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
        logo?: File | null;
        relatedUser?: UserModel;
        taxData?: TaxData;
        legalRepresentative?: LegalRepresentative;
        basicData?: BasicData;
    }){
        this.serial= serial?? 0;
        this.regimeType= regimeType?? '';
        this.emailContact= emailContact?? '';
        this.nameContact= nameContact?? '';
        this.pageUrl= pageUrl?? '';
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
    return new CompanyModel({
        serial: json.datos_empresa?.serial,
        regimeType: json.datos_empresa?.tipo_regimen_iva,
        emailContact: json.datos_empresa?.correo_contacto,
        nameContact: json.datos_empresa?.nombre_contacto,
        pageUrl: json.datos_empresa?.pagina_web,
        isConsortium: json.datos_empresa?.es_consorcio,
        debtCollector: json.datos_empresa?.cobrador_id,
        logo: json.datos_empresa?.logo,
        relatedUser: new UserModel({}),
        //TODO REVIEW
        taxData: taxDataFromJson(json.datos_tributarios),
        //TODO REVIEW
        legalRepresentative: legalRepresentativeFromJson(json.representante_legal),
        //TODO REVIEW
        basicData: basicDataFromJson(json.datos_basicos),
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
        if(typeof companyData[key] === 'boolean'){
            formData.append(`datos_empresa[${key}]`, companyData[key]? '1':'0');
            continue;
        }
        if(key === 'pagina_web' && companyData[key] === ''){
            continue;
        }
        if(key === 'user_id' && !companyData[key]){
            continue;
        }
        
        formData.append(`datos_empresa[${key}]`, JSON.stringify(companyData[key]));
        
    }

    const taxData: Record<string, any>= taxDataToJson(company.taxData)
    for(const key in taxData){
        if(typeof taxData[key] === 'boolean'){
            formData.append(`datos_tributarios[${key}]`, taxData[key]? '1':'0');
            continue;
        }
        if(Array.isArray(taxData[key])){
            if(taxData[key].length === 0){
                formData.append(`datos_tributarios[${key}][]`, '[]');
            }else{
                (taxData[key] as any[]).forEach((value)=>{
                    formData.append(`datos_tributarios[${key}][]`, typeof value == 'number'? value.toString() : value );
                })
            }
            continue;
        }
        formData.append(`datos_tributarios[${key}]`, JSON.stringify(taxData[key]));
    }

    const legalRepresentative: Record<string, any>= legalRepresentativeToJson(company.legalRepresentative);
    for(const key in legalRepresentative){
        if(typeof legalRepresentative[key] === 'boolean'){
            formData.append(`representante_legal[${key}]`, legalRepresentative[key]? '1':'0');
            continue;
        }
        formData.append(`representante_legal[${key}]`, JSON.stringify(legalRepresentative[key]));
    }
    
    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

    return formData;
}


export{ CompanyModel, companyModelFromJson, companyModelToJson }