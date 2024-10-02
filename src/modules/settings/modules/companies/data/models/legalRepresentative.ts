import { PartnerModel, partnerModelFromJson } from './partnerModel';

class LegalRepresentative{
    names: string;
    lastNames: string;
    documentType: string;
    documentNumber: number;
    hasPartners: boolean;
    partnersList: PartnerModel[];

    constructor({
        names,
        lastNames,
        documentType,
        documentNumber,
        hasPartners,
        partnersList,
    }:{
        names?: string;
        lastNames?: string;
        documentType?: string;
        documentNumber?: number;
        hasPartners?: boolean;
        partnersList?: PartnerModel[];
    }){
        this.names= names?? '';
        this.lastNames= lastNames?? '';
        this.documentType= documentType?? '';
        this.documentNumber= documentNumber?? 0;
        this.hasPartners= hasPartners?? false;
        this.partnersList= partnersList?? [];
    }
}

const legalRepresentativeFromJson= (json: any)=>{
    return new LegalRepresentative({
        names: json.nombres,
        lastNames: json.apellidos,
        documentType: json.tipo_identificacion,
        documentNumber: json.numero_identificacion,
        hasPartners: json.tiene_socios,
        partnersList: json.lista_socios? (JSON.parse(json.lista_socios) as any[]).map((item)=> partnerModelFromJson(item)) : [] 
    });   
}

const legalRepresentativeToJson= (legalRep: LegalRepresentative)=>{
    return {
        nombres: legalRep.names,
        apellidos: legalRep.lastNames,
        tipo_identificacion: legalRep.documentType,
        numero_identificacion: legalRep.documentNumber,
        tiene_socios: legalRep.hasPartners,
        lista_socios: JSON.stringify(legalRep.partnersList)
    };   
}

export { LegalRepresentative, legalRepresentativeFromJson, legalRepresentativeToJson }