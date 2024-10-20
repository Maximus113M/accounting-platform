export class ThirdData{
    warehouseCode: number | null;
    thirdType: ThirdType[];

    constructor({
        warehouseCode,
        thirdType,
    }:{
        companySerial?: number;
        warehouseCode?: number | null;
        thirdType?: ThirdType[];
    }){
        this.warehouseCode= warehouseCode ?? null;
        this.thirdType= thirdType ?? [];        
    }

    static toJson(thirdData: ThirdData){
        return{
            codigo_sucursal: thirdData.warehouseCode,
            tipo_tercero: thirdData.thirdType.map((type)=>type.id),
        }
    }

    static fromJson(json: any){
        return new ThirdData({
            warehouseCode: json.codigo_sucursal,
            thirdType: json.tipo_tercero,
        })
    }
}