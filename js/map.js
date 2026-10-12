/**
 * Карта офиса: зум кнопками и скрытие карточки адреса.
 * Зум реализован пересборкой bbox для встроенной карты OpenStreetMap.
 */
(() => {
  const BASE_LAT = 48.537778;
  const BASE_LON = 135.047443;
  const BASE_LAT_SPAN = 0.0076;
  const BASE_LON_SPAN = 0.017;
  const ZOOM_STEP = 0.18;
  const MIN_LEVEL = -3;
  const MAX_LEVEL = 4;

  const mapIframe = document.querySelector('.map-iframe');
  const addressCard = document.querySelector('.map-address-card');
  const closeButton = document.querySelector('.map-close-btn');
  const zoomButtons = document.querySelectorAll('.map-zoom-btn');

  if (!mapIframe) return;

  let zoomLevel = 0;

  const buildMapSrc = () => {
    const scale = 1 + zoomLevel * ZOOM_STEP;
    const latSpan = BASE_LAT_SPAN / scale;
    const lonSpan = BASE_LON_SPAN / scale;

    const minLat = (BASE_LAT - latSpan / 2).toFixed(4);
    const maxLat = (BASE_LAT + latSpan / 2).toFixed(4);
    const minLon = (BASE_LON - lonSpan / 2).toFixed(4);
    const maxLon = (BASE_LON + lonSpan / 2).toFixed(4);

    const marker = `${BASE_LAT.toFixed(4)},${BASE_LON.toFixed(4)}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${minLon},${minLat},${maxLon},${maxLat}&layer=mapnik&marker=${marker}`;
  };

  mapIframe.src = buildMapSrc();

  zoomButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.mapAction;

      if (action === 'zoom-in') zoomLevel = Math.min(zoomLevel + 1, MAX_LEVEL);
      if (action === 'zoom-out') zoomLevel = Math.max(zoomLevel - 1, MIN_LEVEL);

      mapIframe.src = buildMapSrc();
    });
  });

  if (closeButton && addressCard) {
    closeButton.addEventListener('click', () => {
      addressCard.hidden = true;
    });
  }
})();
