import axios from 'axios';
import {
  updateStudentTasks,
  updateStudentTests,
  getStudentById,
} from './student';
import { getAllTasksForTask } from './task';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('key-jwt-pwr'),
  },
});

const apis = {
  getStudentById,
  updateStudentTasks,
  updateStudentTests,
  getAllTasksForTask,
};

export default apis;