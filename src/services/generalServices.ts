import { api } from 'src/boot/axios';
import { exceptiosResponseHandler } from 'src/core/helpers/exceptions';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { cityFromJson, CityModel } from 'src/models/cityModel';

export class GeneralServices{

    async getCities (accessToken: string){
        try {
            const apiResp= await api(accessToken).get('/cities');
            const cities: CityModel[]= (apiResp.data as any[]).map((item)=> cityFromJson(item));

            return { status: statusMessages.success, message: 'Ciudades obtenidas!', data: cities };
        } catch (error) {
            console.log(error);
            return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
        }
    }
}