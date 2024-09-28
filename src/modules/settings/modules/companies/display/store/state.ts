import { CompanyModel } from '../../data/models/companyModel';
import { EconomicActivity, FiscalResponsibilities } from '../../data/models/taxData';

export const useCompaniesState = () => {
  return {
    companiesList: [] as CompanyModel[],
    fiscalResponsalities: [] as FiscalResponsibilities[],
    economicActivities: [] as EconomicActivity[]
  };
};
