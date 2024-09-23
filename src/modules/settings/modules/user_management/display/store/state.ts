import { ClassGroup } from 'src/modules/settings/modules/user_management/data/models/classGroup';

export const useUsersManagementState = () => {
  return {
    classGroups: [] as ClassGroup[]
  };
};
