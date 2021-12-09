// import { join, dirname } from 'path';
// import { fileURLToPath } from 'url';
// import { Low, JSONFile } from 'lowdb';

import { bodyParser, getQueryId } from './utils.js';

let db = [];

// const __dirname = dirname(fileURLToPath(import.meta.url));

// const file = join(__dirname, 'db.json');
// const adapter = new JSONFile(file);
// const db = new Low(adapter);

export function welcome(res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('API Rest con NodeJS sin framework');
}

export async function getTasks(res) {
  // const data = await db.read();
  // console.log(data);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      ok: true,
      msg: 'Listado de todas las tareas',
      data: db,
    })
  );
}

export async function createTask(req, res) {
  try {
    const body = await bodyParser(req);
    db.push(body);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        ok: true,
        msg: 'Tarea creada',
        data: body,
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

  try {
    const id = getQueryId(url);
    const body = await bodyParser(req);

    if (id.key === 'id') {
      let taskExists = db.find((task) => task.id === +id.value);
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

export async function deleteTask(req, res) {
  const { url } = req;

  try {
    const id = getQueryId(url);

    if (id.key === 'id') {
      const taskExists = db.findIndex((task) => task.id === +id.value);

      if (taskExists !== -1) {
        db.splice(taskExists, 1);
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
