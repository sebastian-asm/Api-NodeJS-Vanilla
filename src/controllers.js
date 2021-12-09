import { nanoid } from 'nanoid';

import { bodyParser, getQueryId } from './utils.js';
import dbConnection from './dbConnection.js';

const db = await dbConnection();

export function welcome(res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('API Rest con NodeJS sin framework');
}

export function getTasks(res) {
  const { tasks } = db.data;

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      ok: true,
      msg: 'Listado de todas las tareas',
      data: tasks,
    })
  );
}

export async function createTask(req, res) {
  try {
    const body = await bodyParser(req);
    const { tasks } = db.data;

    const addTask = {
      id: nanoid(5),
      ...body,
    };

    tasks.push(addTask);
    db.write();

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        ok: true,
        msg: 'Tarea creada',
        data: addTask,
      })
    );
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        ok: false,
        error: error.message,
      })
    );
  }
}

export async function updateTask(req, res) {
  const { url } = req;
  const { tasks } = db.data;

  try {
    const id = getQueryId(url);
    const body = await bodyParser(req);

    if (id.key === 'id') {
      let taskExists = tasks.find((task) => task.id === id.value);
      taskExists.name = body.name;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          ok: true,
          msg: 'Tarea actualizada',
          data: taskExists,
        })
      );
    }
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        ok: false,
        error: error.message,
      })
    );
  }
}

export function deleteTask(req, res) {
  const { url } = req;
  const { tasks } = db.data;

  try {
    const id = getQueryId(url);

    if (id.key === 'id') {
      const taskExists = tasks.findIndex((task) => task.id === id.value);

      if (taskExists !== -1) {
        tasks.splice(taskExists, 1);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            ok: true,
            msg: 'Tarea eliminada',
          })
        );
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            ok: false,
            msg: 'La tarea no existe',
          })
        );
      }
    }
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        ok: false,
        error: error.message,
      })
    );
  }
}
