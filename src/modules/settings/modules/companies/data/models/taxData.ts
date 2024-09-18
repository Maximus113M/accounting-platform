class TaxData{
    icaRate: number;
    hasAIU: boolean;
    hasDoubleTax: boolean;
    isWithholdingAgent: boolean;
    hasAdValoremTax: boolean;
    isForeignCurrency: boolean;
    taxes: Tax[];
    economicActivity: EconomicActivity;
    fiscalResponsibilities: FiscalResponsibilities[];

    constructor({
        icaRate,
        hasAIU,
        hasDoubleTax,
        isWithholdingAgent,
        hasAdValoremTax,
        isForeignCurrency,
        taxes,
        economicActivity,
        fiscalResponsibilities,
    }:{
        icaRate?: number;
        hasAIU?: boolean;
        hasDoubleTax?: boolean;
        isWithholdingAgent?: boolean;
        hasAdValoremTax?: boolean;
        isForeignCurrency?: boolean;
        taxes?: Tax[];
        economicActivity?: EconomicActivity;
        fiscalResponsibilities?: FiscalResponsibilities[];   
    }){
        this.icaRate= icaRate?? 0;
        this.hasAIU= hasAIU?? false;
        this.hasDoubleTax= hasDoubleTax?? false;
        this.isWithholdingAgent= isWithholdingAgent?? false;
        this.hasAdValoremTax= hasAdValoremTax?? false;
        this.isForeignCurrency= isForeignCurrency?? false;
        this.taxes= taxes?? [];
        this.economicActivity= economicActivity?? new EconomicActivity({});
        this.fiscalResponsibilities= fiscalResponsibilities?? [];
    }
}


class Tax {
    code: string;
    description: string;

    constructor({
        code,
        description
    }:{
        code?: string;
        description?: string;
    }){
        this.code= code?? '';
        this.description= description?? '';
    }
}

class FiscalResponsibilities extends Tax {
    constructor({
        code,
        description
    }:{
        code?: string;
        description?: string;
    }){
        super({code, description});
    }
}

class EconomicActivity extends Tax {
    constructor({
        code,
        description
    }:{
        code?: string;
        description?: string;
    }){
        super({code, description});
    }
}

const taxDataFromJson= (json: any)=>{
    return new TaxData({
        icaRate: json.tarifa_ica,
        hasAIU: json.maneja_aiu,
        hasDoubleTax: json.utiliza_dos_impuestos,
        isWithholdingAgent: json.es_agente_retenedor,
        hasAdValoremTax: json.maneja_impuesto_ad_valorem,
        isForeignCurrency: json.moneda_extranjera,
        //TODO VERIFY
        taxes: Object.keys((json.tributos as Record<string, any>)).map((item)=> new Tax({code: item, description: json.tributos[item]})),
        economicActivity: new EconomicActivity({code: json.actividad_economica_codigo_ciiu}),
        fiscalResponsibilities: (json.responsabilidades_fiscales as Array<string>).map((item)=> new FiscalResponsibilities({code: item})),
    });
}

const taxDataToJson= (taxData: TaxData)=>{
    return {
        tarifa_ica: taxData.icaRate,
        maneja_aiu: taxData.hasAIU,
        utiliza_dos_impuestos: taxData.hasDoubleTax,
        es_agente_retenedor: taxData.isWithholdingAgent,
        maneja_impuesto_ad_valorem: taxData.hasAdValoremTax,
        moneda_extranjera: taxData.isForeignCurrency,
        //TODO VERIFY
        tributos: taxData.taxes.map((item)=>item.code),
        actividad_economica_codigo_ciiu: taxData.economicActivity.code,
        responsabilidades_fiscales: taxData.fiscalResponsibilities.map((item)=>item.code),
    };
}

export { TaxData, Tax, FiscalResponsibilities, EconomicActivity, taxDataFromJson }
