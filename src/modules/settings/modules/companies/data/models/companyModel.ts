import { UserModel } from 'src/models/userModel';
import { LegalRepresentative } from './legalRepresentative';
import { TaxData } from './taxData';
import { BasicData } from './basicData';

class CompanyModel{
    serial: number;
    regimeType: string;
    emailContact: string;
    nameContact: string;
    pageUrl: string;
    isConsortium: boolean;
    debtCollector: number;
    logo: string;
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
        logo?: string;
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
        this.logo= logo?? '';
        this.relatedUser= relatedUser?? new UserModel({});
        this.taxData= taxData?? new TaxData({});
        this.legalRepresentative= legalRepresentative?? new LegalRepresentative({});
        this.basicData= basicData?? new BasicData({});
    }
}

const companyModelFromJson= (json: any)=>{
    return new CompanyModel({
        serial: json.serial,
        regimeType: json.tipo_regimen,
        emailContact: json.correo_contacto,
        nameContact: json.nombre_contacto,
        pageUrl: json.pagina_web,
        isConsortium: json.es_consorcio,
        debtCollector: json.cobrador_id,
        logo: json.logo,
        //TODO REVIEW
        relatedUser: new UserModel({}),
        //TODO REVIEW
        taxData: new TaxData({}),
        //TODO REVIEW
        legalRepresentative: new LegalRepresentative({}),
        //TODO REVIEW
        basicData: new BasicData({}),
    });
}


export{ CompanyModel, companyModelFromJson }