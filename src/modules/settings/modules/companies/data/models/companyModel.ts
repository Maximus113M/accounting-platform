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
        this.debtCollector= debtCollector?? 0;
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
        //TODO REVIEW
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
    return {
        tipo_regimen_iva: company.regimeType,
        correo_contacto: company.emailContact,
        nombre_contacto: company.nameContact,
        pagina_web: company.pageUrl,
        es_consorcio: company.isConsortium,
        cobrador_id: company.debtCollector,
        logo: company.logo,
        user_id: company.relatedUser.id,
        //TODO REVIEW
        taxData: taxDataToJson(company.taxData),
        //TODO REVIEW
        legalRepresentative: legalRepresentativeToJson(company.legalRepresentative),
        //TODO REVIEW
        basicData: basicDataToJson(company.basicData),
    };
}


export{ CompanyModel, companyModelFromJson, companyModelToJson }