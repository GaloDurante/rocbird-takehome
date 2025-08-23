## Requisitos Previos

- **_Docker_**: Para gestionar los contenedores de la base de datos.
- **_Node.js_**: Versión 18 o superior.
- **_Gestor de paquetes_**: Puedes usar npm, pnpm, yarn o bun para instalar las dependencias del proyecto.

## Instrucciones de Instalación

**1. Clonar el repositorio**

**2. Instalar dependencias**

```bash
npm install
# or
pnpm install
# or
yarn install
```

**3. Configurar variables de entorno**

Copia el archivo de ejemplo `.env.example`, renómbralo a `.env`, y completa los valores con la información de tu base de datos.

```bash
DATABASE_URL="postgresql://[user]:[password]@localhost:5432/[db_name]?schema=publi
c"

### POSTGRES_USER=

### POSTGRES_PASSWORD=

### POSTGRES_DB=
```

**Nota:** Las variables `POSTGRES_USER`, `POSTGRES_PASSWORD` y `POSTGRES_DB` son utilizadas por el archivo _docker-compose.yml_.

## Levantar la Base de Datos

Utiliza Docker Compose para crear y levantar la base de datos en un contenedor.

**1. Crear y levantar el contenedor**

> docker compose up -d

**2. Generar el cliente de Prisma**

> npm run db:generate

**3. Crear las tablas**

> npm run db:push

**4. Poblar la base de datos**

> npm run db:seed

**5. Visualizar la base de datos (opcional)**

> npm run db:studio

## Ejecutar el Proyecto

Una vez que la base de datos esté lista, puedes iniciar el servidor de desarrollo.

> npm run dev

Abre tu navegador y visita la siguiente dirección para ver el proyecto en acción:

[http://localhost:3000.](http://localhost:3000.)

## Estructura y Funcionalidades

**Backend**

El backend está construido con una **API RESTful** que maneja las operaciones CRUD para la entidad **Talento**.

- **_Rutas_**: Se encuentran en la carpeta `app/api/talentos`.
- **_Validación_**: Manejo de errores y validación estricta con códigos HTTP apropiados.
- **_Eficiencia_**: Uso de _select/include_ en Prisma para optimizar las consultas a la base de datos.

**Frontend**

El frontend ofrece una interfaz de usuario completa para interactuar con la **_API_**.

- **_Rutas_**: Las rutas se encuentran en la ubicación `src/app/talentos`
- **_Componentes_**: Los archivos se ubican en `src/components`.
- **_Diseño_**: La UI está basada en shadcn/ui y TailwindCSS

## Funcionalidades Extras

Se han añadido funcionalidades adicionales para mejorar la calidad del proyecto.

- **_Tests unitarios_**: Cobertura de **_tests_** para todas las rutas de la API.
- **_Documentación de la API_**: Se incluyó una documentación completa de cada ruta de la API en `Postman`
- **_Alternar tema_**: Incluye un botón para cambiar entre `Dark mode` y `Light mode` usando la biblioteca _next-themes_.

## Test unitarios

Se crearon **tests unitarios** de todas las rutas de la API y se encuentran en `src/__tests__/api/talents`. Para verificar que los tests se encuentran funcionando, correr el siguiente comando en consola:

> npm run test

## Documentación en Postman

- Archivo **_JSON_** disponible en la carpeta `docs` en la raiz del proyecto.
- Importar este archivo en la app `Postman`.
- Visualizar la carpeta con todos los endpoints y cada uno con su documentación.
