import { UserModel } from 'src/models/userModel';
import { LegalRepresentative } from './legalRepresentative';

class CompanyModel{
    serial: number;
    regimeType: string;
    email: string;
    pageUrl: string;
    isConsortium: boolean;
    logo: string;
    relatedUser: UserModel;
    legalRepresentative: LegalRepresentative;

    constructor({
        serial,
        regimeType,
        email,
        pageUrl,
        isConsortium,
        logo,
        relatedUser,
        legalRepresentative
    }:{
        serial: number;
        regimeType?: string;
        email?: string;
        pageUrl?: string;
        isConsortium?: boolean;
        logo?: string;
        relatedUser?: UserModel;
        legalRepresentative?: LegalRepresentative;
    }){
        this.serial= serial;
        this.regimeType= regimeType?? '';
        this.email= email?? '';
        this.pageUrl= pageUrl?? '';
        this.isConsortium= isConsortium?? false;
        this.logo= logo?? '';
        this.relatedUser= relatedUser?? new UserModel({id:1, rol:1});
        this.legalRepresentative= legalRepresentative?? new LegalRepresentative({id:1});
    }
}






export{ CompanyModel }