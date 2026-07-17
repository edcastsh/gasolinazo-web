# Gasolinazo

Encuentra la gasolinera más barata cerca de ti.

## Qué es

Gasolinazo es una aplicación web móvil que te muestra en un mapa las gasolineras de tu zona ordenadas por precio. Selecciona el tipo de gasolina que necesitas, ajusta el radio de búsqueda y obtén al instante la opción más económica junto a tu ubicación.

## Para quién es

Para cualquier conductor en México que quiera ahorrar en cada carga de gasolina. Sin registros, sin complicaciones: abres la app, permites tu ubicación y listo.

## Cómo funciona

1. Elige tu tipo de gasolina (regular, premium o diésel).
2. Selecciona el radio de búsqueda (desde 2.5 km hasta 20 km).
3. Comparte tu ubicación y el mapa te muestra las gasolineras cercanas ordenadas de más barata a más cara.

## Stack

- React + TypeScript + Vite
- React-Leaflet para el mapa
- TanStack Query para datos
- Zustand para estado
- Lucide para iconos

## Desarrollo

```bash
pnpm install
pnpm dev
```

La API debe estar corriendo en `localhost:3001`. Ver [gasolinazo-api](https://github.com/edcastsh/gasolinazo-api) para más detalles.
