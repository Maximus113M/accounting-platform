class LegalRepresentative{
    id: number;
    names: string;
    lastNames: string;
    documentType: string;
    documentNumber: string;
    hasPartners: boolean;

    constructor({
        id,
        names,
        lastNames,
        documentType,
        documentNumber,
        hasPartners,
    }:{
        id?: number;
        names?: string;
        lastNames?: string;
        documentType?: string;
        documentNumber?: string;
        hasPartners?: boolean;
    }){
        this.id= id?? 0,
        this.names= names?? '',
        this.lastNames= lastNames?? '',
        this.documentType= documentType?? '',
        this.documentNumber= documentNumber?? '',
        this.hasPartners= hasPartners?? false
    }
}

const legalRepresentativeFromJson= (json: any)=>{
    return new LegalRepresentative({
        id: json.id_representante_legal,
        names: json.nombres,
        lastNames: json.apellidos,
        documentType: json.tipo_identificacion,
        documentNumber: json.identificacion,
        hasPartners: json.tiene_socios
    });   
}

const legalRepresentativeToJson= (legalRep: LegalRepresentative)=>{
    return {
        id_representante_legal: legalRep.id,
        nombres: legalRep.names,
        apellidos: legalRep.lastNames,
        tipo_identificacion: legalRep.documentType,
        identificacion: legalRep.documentNumber,
        tiene_socios: legalRep.hasPartners
    };   
}

export { LegalRepresentative, legalRepresentativeFromJson, legalRepresentativeToJson }