import { useCompaniesStore } from '.';
import { statusMessages } from 'src/core/helpers/generalHelpers';
import { CompaniesDatasourceImpl } from '../../data/datasources/companiesDatasource';
import { CompaniesRepositoryImpl } from '../../data/respositories/companiesRepositoryImpl';
import { CompaniesUseCases } from '../../domain/use-cases/companiesUseCases';
import { exceptiosResponseHandler } from 'src/core/helpers/exceptions';
import { CompanyModel, companyModelToJson } from '../../data/models/companyModel';

const companiesRepositoryImp = new CompaniesRepositoryImpl(new CompaniesDatasourceImpl());
const companiesUseCases = new CompaniesUseCases(companiesRepositoryImp);

export const getCompanies = async (accessToken: string) => {
  try {
    const companiesStore= useCompaniesStore();
    const resp = await companiesUseCases.getAllCompanies(accessToken);
    companiesStore.companiesList= [];
    companiesStore.companiesList= [...resp];
    return { status: statusMessages.success, message: 'Empresas obtenidas!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const getCompany = async (serial: number, accessToken: string) => {
  try {
    const resp = await companiesUseCases.getCompany(serial, accessToken);
    return { status: statusMessages.success, message: 'Empresa obtenida!', data: resp };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const createCompany = async (company: CompanyModel, accessToken: string) => {
  try {
   
    await companiesUseCases.createCompany(companyModelToJson(company) ,accessToken);
    
    return { status: statusMessages.success, message: 'Empresa creada!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const deleteCompany = async (companyId: number, accessToken: string) => {
  try {
    //const companiesStore= useCompaniesStore();
   
    await companiesUseCases.deleteCompany(companyId ,accessToken);
    
    return { status: statusMessages.success, message: 'Empresa eliminada' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};

export const getEconomicActivities = async (accessToken: string) => {
  try {
    const companiesStore= useCompaniesStore();
    const resp = await companiesUseCases.getEconomicActivities(accessToken);
    companiesStore.economicActivities= [];
    companiesStore.economicActivities= [...resp];
    return { status: statusMessages.success, message: 'Actividades economicas obtenidas!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const getFiscalResponsabilities = async (accessToken: string) => {
  try {
    const companiesStore= useCompaniesStore();
    const resp = await companiesUseCases.getFiscalResponsabilities(accessToken);
    companiesStore.fiscalResponsalities= [];
    companiesStore.fiscalResponsalities= [...resp];
    return { status: statusMessages.success, message: 'Responsabilidades Fiscales obtenidas!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
export const getTaxes = async (accessToken: string) => {
  try {
    const companiesStore= useCompaniesStore();
    const resp = await companiesUseCases.getTaxes(accessToken);
    companiesStore.taxes= [];
    companiesStore.taxes= [...resp];
    return { status: statusMessages.success, message: 'Tributos obtenidos!' };
  } catch (error: any) {
    console.log(error);
    return { status: statusMessages.fail, message: exceptiosResponseHandler({error: error}) };
  }
};
