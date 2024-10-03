class PartnerModel{
    names: string;
    lastNames: string;
    documentType: string;
    documentNumber: number;
    isPublicPerson: boolean;

    constructor({
        names,
        lastNames,
        documentType,
        documentNumber,
        isPublicPerson
    }:{
        names?: string;
        lastNames?: string;
        documentType?: string;
        documentNumber?: number;
        isPublicPerson?: boolean;
    }){
        this.names= names?? '';
        this.lastNames= lastNames?? '';
        this.documentType= documentType?? '';
        this.documentNumber= documentNumber?? 0;
        this.isPublicPerson= isPublicPerson?? false;
    }
}

const partnerModelFromJson = (json: any) =>{
    return new PartnerModel({
        names: json.names,
        lastNames: json.lastNames,
        documentType: json.documentType,
        documentNumber: json.documentNumber,
        isPublicPerson: json.isPublicPerson
    });
}
//TO FIX, IS NOT USE
// const partnerModelToJson = (partner: PartnerModel) =>{
//     return {
//         names: partner.names,
//         last_names: partner.lastNames,
//         document_type: partner.documentType,
//         document_number: partner.documentNumber,
//         is_public_person: partner.isPublicPerson
//     };
// }

export { PartnerModel, partnerModelFromJson, /*partnerModelToJson*/ }