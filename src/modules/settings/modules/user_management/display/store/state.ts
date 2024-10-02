import { ClassGroup } from 'src/modules/settings/modules/user_management/data/models/classGroup';
import { UserModel } from 'src/models/userModel';

export const useUsersManagementState = () => {
  return {
    classGroups: [] as ClassGroup[],
    studentsByClassGroup: [] as UserModel[],
    instructors: [] as UserModel[],
  };
};
