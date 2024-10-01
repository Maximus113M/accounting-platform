import { useCompaniesStore } from '.';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { CompaniesDatasourceImpl } from '../../data/datasources/companiesDatasource';
import { CompaniesRepositoryImpl } from '../../data/respositories/companiesRepositoryImpl';
import { CompaniesUseCases } from '../../domain/use-cases/companiesUseCases';
import { exceptiosResponseHandler } from 'src/core/helpers/exceptions';

const companiesRepositoryImp = new CompaniesRepositoryImpl(new CompaniesDatasourceImpl());
const companiesUseCases = new CompaniesUseCases(companiesRepositoryImp);

export const getCompanies = async (accessToken: string) => {
  try {
    const settingsStore= useCompaniesStore();
    const resp = await companiesUseCases.getAllCompanies(accessToken);
    settingsStore.companiesList= [];
    settingsStore.companiesList= [...resp];
    return { status: statusMessages.success, message: 'Empresas obtenidas!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const getEconomicActivities = async (accessToken: string) => {
  try {
    const settingsStore= useCompaniesStore();
    const resp = await companiesUseCases.getEconomicActivities(accessToken);
    settingsStore.economicActivities= [];
    settingsStore.economicActivities= [...resp];
    return { status: statusMessages.success, message: 'Actividades economicas obtenidas!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const getFiscalResponsabilities = async (accessToken: string) => {
  try {
    const settingsStore= useCompaniesStore();
    const resp = await companiesUseCases.getFiscalResponsabilities(accessToken);
    settingsStore.fiscalResponsalities= [];
    settingsStore.fiscalResponsalities= [...resp];
    return { status: statusMessages.success, message: 'Responsabilidades Fiscales obtenidas!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const getTaxes = async (accessToken: string) => {
  try {
    const settingsStore= useCompaniesStore();
    const resp = await companiesUseCases.getTaxes(accessToken);
    settingsStore.taxes= [];
    settingsStore.taxes= [...resp];
    return { status: statusMessages.success, message: 'Tributos obtenidos!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
