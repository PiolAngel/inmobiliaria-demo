# AGENCIA WEB | POLÍTICA DE DESARROLLO Y PUBLICACIÓN

Estas instrucciones aplican a cualquier agente que trabaje en este repositorio. Se reutilizan en las BETA y en futuros proyectos de clientes.

## Desarrollo autónomo
- Nunca desarrollar ni hacer commits de prueba directamente en `main`.
- Crear una rama de trabajo (`feat/*`, `fix/*`, `audit/*` o `ci/*`).
- Agrupar cambios por objetivo. Evitar pushes repetitivos y despliegues de prueba innecesarios.
- Ejecutar las pruebas disponibles y corregir fallos antes de integrar.
- Crear un pull request hacia `main` y comprobar GitHub Actions. Si falla o no se ejecuta, **no integrar**.
- No afirmar que algo fue probado si solo se revisó el código o se escribió la prueba.

## Publicación
- `main` representa la versión candidata a producción, no un entorno de pruebas.
- Integrar solo cambios comprobados y autorizados para esa publicación por Dirección General.
- No forzar pushes ni crear despliegues manuales en Vercel sin orden expresa.
- No intentar repetidamente un despliegue cuando se alcanza la cuota.
- Después de publicar, comprobar la URL real y las funciones principales antes de declarar el cierre.

## Seguridad de demostraciones y clientes
- Las BETA no deben enviar mensajes reales, procesar cobros ni usar contactos personales.
- No exponer tokens, claves ni datos de clientes en código, logs, comentarios o artifacts.
- No cambiar producción, dominios, permisos ni configuraciones sensibles sin autorización.
- Los proyectos reales usan sus propias variables, repositorios y datos.

## Reporte de cierre
Informar rama, commits, pruebas realmente ejecutadas (resultado y enlace), errores, pendientes y versión desplegada.

**Nota:** este archivo establece instrucciones de trabajo; no sustituye una regla de protección técnica de GitHub ni los Deployment Checks de Vercel. Es necesario habilitar esos controles de forma independiente para impedir un bypass.
