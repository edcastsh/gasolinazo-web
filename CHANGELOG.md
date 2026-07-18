# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.5.1](https://github.com/edcastsh/gasolinazo-web/compare/v0.5.0...v0.5.1) (2026-07-18)


### Features

* **card:** open Google Maps or Apple Maps directions on station tap ([60d37e6](https://github.com/edcastsh/gasolinazo-web/commit/60d37e62d5edd60ed2e1a051924869eaa80f1f9d))
* **store:** add localStorage persistence for fuel type and radius preferences ([8114f77](https://github.com/edcastsh/gasolinazo-web/commit/8114f7755b078782a3896499631d40ecfb74f990))
* **ui:** add FilterModal bottom sheet for changing fuel type and radius ([1276393](https://github.com/edcastsh/gasolinazo-web/commit/12763936651400137e42b062fbf13d5fac9e2c67))
* **ui:** add VirtualList component for scroll-based virtualization ([048f417](https://github.com/edcastsh/gasolinazo-web/commit/048f417314b05fc3e2d5a2d07f59f6666450ca3c))
* **ui:** limit max search radius to 15km ([2592349](https://github.com/edcastsh/gasolinazo-web/commit/25923496671287915f05f1ce5db35af475e5cdf9))


### Bug Fixes

* **list:** filter out stations without price for selected fuel type ([2f6501f](https://github.com/edcastsh/gasolinazo-web/commit/2f6501fc6b42b7d5041c3607e063e29c86d59aab))
* **list:** virtualize station list with @tanstack/react-virtual and sync with map viewport ([3da1f85](https://github.com/edcastsh/gasolinazo-web/commit/3da1f85abb9b542dabae2c281134cba9373f6918))
* **map:** raise zoom control z-index above header ([6c26438](https://github.com/edcastsh/gasolinazo-web/commit/6c26438752d4c02ac014a4d4b62f8010c24b9795))
* **onboarding:** auto-request location when both fuel and radius are selected ([0d838ce](https://github.com/edcastsh/gasolinazo-web/commit/0d838cececb2ec0583c6154a048ce7f2c9b557b5))
* **onboarding:** only request location after user explicitly selects radius ([6f1eee5](https://github.com/edcastsh/gasolinazo-web/commit/6f1eee572bf1e8bcef74bf395abb5af98936cf75))
* **onboarding:** separate location-requested ref from dashboard-ready effect so auto-advance works ([80aca7c](https://github.com/edcastsh/gasolinazo-web/commit/80aca7cc6efebe1c2e22a22fbd355c91d535a3d4))

## [0.5.0](https://github.com/edcastsh/gasolinazo-web/compare/v0.0.1...v0.5.0) (2026-07-17)


### Features

* add Leaflet CSS, viewport meta, and vite dev server config ([d6efe9b](https://github.com/edcastsh/gasolinazo-web/commit/d6efe9b20375daaec0af3f4c754b70089f7b9061))
* **app:** wire up selection and dashboard flow with QueryClientProvider ([cd325ea](https://github.com/edcastsh/gasolinazo-web/commit/cd325ea32f6dc67fff2daff58bfe71bf02ba4f53))
* **hooks:** add useGeolocation and usePrecios hooks ([4a7d0db](https://github.com/edcastsh/gasolinazo-web/commit/4a7d0db960a9f7eca9ea41f8ca03bee14e988371))
* **store:** add Zustand filters store with fuel type, radius, and coordinates ([499ad87](https://github.com/edcastsh/gasolinazo-web/commit/499ad87983a2aacb720d2f0770900958d9bc7443))
* **types:** add API types, client, and endpoints ([73de2a0](https://github.com/edcastsh/gasolinazo-web/commit/73de2a06287e012a9e499fd9a4e319c6c805bdfb))
* **ui:** add FuelTypeSelector and RadiusSelector components ([2dc269a](https://github.com/edcastsh/gasolinazo-web/commit/2dc269aec25fe329a51da9b20914bde6b7aa33ea))
* **ui:** add Header and Dashboard layout components ([bdc214f](https://github.com/edcastsh/gasolinazo-web/commit/bdc214f533695abab7013dad19520ff23c87b23d))
* **ui:** add SelectionScreen component for fuel type and radius selection ([827c390](https://github.com/edcastsh/gasolinazo-web/commit/827c390c10ff3687a4b83ad080f4becbcdab281b))
* **ui:** add StationMap, StationCard, and StationList bottom sheet ([111de1c](https://github.com/edcastsh/gasolinazo-web/commit/111de1c7bb1487aafa92577b316b83b5c480b729))

## [0.0.1](https://github.com/edcastsh/gasolinazo-web/compare/v0.0.0...v0.0.1) (2026-07-04)

## 0.0.0 (2026-07-04)

## 0.0.0 (2026-07-04)
