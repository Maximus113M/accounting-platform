class LegalRepresentative{
    names: string;
    lastNames: string;
    documentType: string;
    documentNumber: number;
    hasPartners: boolean;

    constructor({
        names,
        lastNames,
        documentType,
        documentNumber,
        hasPartners,
    }:{
        names?: string;
        lastNames?: string;
        documentType?: string;
        documentNumber?: number;
        hasPartners?: boolean;
    }){
        this.names= names?? '',
        this.lastNames= lastNames?? '',
        this.documentType= documentType?? '',
        this.documentNumber= documentNumber?? 0,
        this.hasPartners= hasPartners?? false
    }
}

const legalRepresentativeFromJson= (json: any)=>{
    return new LegalRepresentative({
        names: json.nombres,
        lastNames: json.apellidos,
        documentType: json.tipo_identificacion,
        documentNumber: json.numero_identificacion,
        hasPartners: json.tiene_socios
    });   
}

const legalRepresentativeToJson= (legalRep: LegalRepresentative)=>{
    return {
        nombres: legalRep.names,
        apellidos: legalRep.lastNames,
        tipo_identificacion: legalRep.documentType,
        numero_identificacion: legalRep.documentNumber,
        tiene_socios: legalRep.hasPartners
    };   
}

export { LegalRepresentative, legalRepresentativeFromJson, legalRepresentativeToJson }