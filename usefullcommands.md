# This command will watch your files, automatically recompiling and reloading the server.
npm run start:dev

# Lint and autofix with eslint
npm run lint

# Format with prettier
npm run format

# Para crear rápidamente un controlador CRUD con validación integrada , puede utilizar el generador CRUD de la CLI : 
nest g resource [name]

# To create a controller using the CLI, simply execute the 
nest g controller [name] command.

# Status code is always 200 by default, except for POST requests which use 201. We can easily change this behavior by adding the
@HttpCode(...) decorator at a handler-level 
(see [Status codes](https://docs-nestjs-com.translate.goog/controllers#status-code)).


