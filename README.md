## Setup Para Desarrollo Local
Crear un entorno virtual.
```
python3 -m venv nombre-aquí
```
Activar el entorno virtual.
```
source nombre-aquí/bin/activate
```
Esquema de Base De Datos.
```
python3 manage.py migrate
```
Correr el servidor local.
```
python3 manage.py runserver 0.0.0.0:8000
```
