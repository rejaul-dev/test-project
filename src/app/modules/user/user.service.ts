import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

// Create student into DB
const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  // if password not given -> use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // set manually generated id
  userData.id = '2030100001';

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id. _id as user
    studentData.id = newUser.id; // embadded id
    studentData.user = newUser._id; // reference _id
  }

  const newStudent = await Student.create(studentData);
  return newStudent;
};

export const UserServices = {
  createStudentIntoDb,
};
