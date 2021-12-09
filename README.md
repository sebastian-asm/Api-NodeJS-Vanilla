# API Rest con NodeJS sin framework

Ids generados automaticamente con la librería **nanoid** y para persistencia de datos el paquete **lowdb** para guardar de forma local en formato JSON.

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
