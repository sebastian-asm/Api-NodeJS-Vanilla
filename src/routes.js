import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  welcome,
} from './controllers.js';

export default function routes(req, res) {
  const { url, method } = req;

  // logger
  console.log(`url: ${url} - method: ${method}`);

  switch (method) {
    case 'GET':
      if (url === '/') welcome(res);
      if (url === '/tasks') getTasks(res);
      break;

    case 'POST':
      if (url === '/tasks') createTask(req, res);
      break;

    case 'PUT':
      updateTask(req, res);
      break;

    case 'DELETE':
      deleteTask(req, res);
      break;

    default:
      break;
  }
}
