# API Rest con NodeJS sin framework

Ids generados automaticamente con la librería **uuid**.

Rutas disponibles:

```
GET
/ - Inicio
/tasks - Obtener la lista de tareas

POST
/task - Crear nueva tarea
{
  "name": "tarea 1"
}

PUT
/task?id=1 - Actualizar tarea por id

DELETE
/task?id=1 - Eliminar tarea por id
```
