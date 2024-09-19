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
    const taxes= JSON.parse(json.tributos);

    return new TaxData({
        icaRate: json.tarifa_ica,
        hasAIU: json.maneja_aiu,
        hasDoubleTax: json.utiliza_dos_impuestos,
        isWithholdingAgent: json.es_agente_retenedor,
        hasAdValoremTax: json.maneja_impuesto_ad_valorem,
        isForeignCurrency: json.moneda_extranjera,
        //TODO VERIFY
        taxes: Object.keys(taxes).map((key)=> new Tax({key: key, value: taxes[key]})),
        economicActivity: new EconomicActivity({key: json.actividad_economica_codigo_ciiu}),
        fiscalResponsibilities: (json.responsabilidades_fiscales as Array<string>).map(
            (key)=> new FiscalResponsibilities({key: key})
        ),
    });
}

const taxDataToJson= (taxData: TaxData)=>{
    const taxes: Record<string, any>= {};
    taxData.taxes.forEach((item)=>{
        taxes[item.key]= item.value;
    });
    return {
        tarifa_ica: taxData.icaRate,
        maneja_aiu: taxData.hasAIU,
        utiliza_dos_impuestos: taxData.hasDoubleTax,
        es_agente_retenedor: taxData.isWithholdingAgent,
        maneja_impuesto_ad_valorem: taxData.hasAdValoremTax,
        moneda_extranjera: taxData.isForeignCurrency,
        //TODO VERIFY
        tributos: JSON.stringify(taxes),
        actividad_economica_codigo_ciiu: taxData.economicActivity.key,
        responsabilidades_fiscales: taxData.fiscalResponsibilities.map((item)=>item.key),
    };
}

export { TaxData, Tax, FiscalResponsibilities, EconomicActivity, taxDataFromJson, taxDataToJson }
