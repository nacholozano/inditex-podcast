# Inditex Podcast

## Setup

Node: `v20.13.1`

`npm i`

## Dev

`npm run dev`

## Unit test

`npm run test`

## E2E test

`npx playwright install`

`npm run test:e2e`

## Serve prod build

`npm run build`

`npm run preview`

## Others

- Hecho con arquitectura hexagonal, react, hooks, react-router-dom, módules de CSS.
- He configurado el proyecto por encima con prettier, eslint, husky y lintstaged.
- He añadido test con jest y playwright, aunque la prueba no lo exigía. Solo la página del listado de podcast tienen test unitarios y E2E.
- Me falta el campo descripción en el widget de información del podcast para la página de detalle de un podcast. No he visto ese campo en la petición del detalle. Si que está en la petición que trae todos los podcasts. Si vuestra intención era usar ese campo de esa petición, simplemente se podría añadir en el caso de uso del detalle de un podcast.
- Me falta el campo sponsors del widget de episodio de un podcast. Tampoco lo he visto en la petición. No sé si la API habrá cambiado desde que se creo el documento. De todas formas he dejado el código comentado.
