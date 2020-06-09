import { api } from './index';

export const getAllTasksForTask = (task) => {
  try {
    console.log(task);
    return api.get(`/tests?task=${task}`);
  } catch (err) {
    return err;
  }
};
