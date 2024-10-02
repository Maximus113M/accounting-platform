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
    key: string;
    value: string;

    constructor({
        key,
        value
    }:{
        key?: string;
        value?: string;
    }){
        this.key= key?? '';
        this.value= value?? '';
    }
}

class FiscalResponsibilities extends Tax {
    constructor({
        key,
        value
    }:{
        key?: string;
        value?: string;
    }){
        super({key, value});
    }
}

class EconomicActivity extends Tax {
    constructor({
        key,
        value
    }:{
        key?: string;
        value?: string;
    }){
        super({key, value});
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
        taxes: (json.tributos as any[]).map((tax)=> new Tax({key: tax})),
        economicActivity: new EconomicActivity({key: json.actividad_economica_codigo_ciiu}),
        fiscalResponsibilities: (json.responsabilidades_fiscales as string[]).map(
            (key)=> new FiscalResponsibilities({key: key})
        ),
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
        tributos: taxData.taxes.map((tax)=> Number(tax)),
        actividad_economica_codigo_ciiu: taxData.economicActivity.key !== '' ?  Number(taxData.economicActivity.key) : 123,
        responsabilidades_fiscales: taxData.fiscalResponsibilities.map((item)=>item.key),
    };
}

export { TaxData, Tax, FiscalResponsibilities, EconomicActivity, taxDataFromJson, taxDataToJson }
