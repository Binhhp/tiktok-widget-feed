(function () {
  const domain = window.location.hostname;
  fetch(`https://tiktok.orichi.info/odata/shops('${domain}')/shopConfiguration`)
    .then((response) => response.json())
    .then((data) => {
      const divContainer = document.createElement("a");
      divContainer.id = "orichi-button";
      divContainer.classList.add(data.buttonPosition.toLowerCase());
      const html = `<img src="${data.image}" alt="TikTok Widget Feed"/>`;
      divContainer.innerHTML = html;
      divContainer.href = `${window.location.origin}/admin/themes/current/editor`;
      const style = document.createElement("style");
      style.textContent = ` #orichi-button img { width: 100%; height: 100%; object-fit: cover; } #orichi-button { position: fixed; z-index: 9999999999; width: 60px; height: 60px; cursor: pointer; background-color: transparent; text-decoration: none; } #orichi-button.topright { top: 12px; right: 0px; } #orichi-button.topleft { top: 12px; left: 0px; } #orichi-button.bottomright { bottom: 12px; right: 12px; } #orichi-button.bottomleft { bottom: 12px; left: 12px; }`;
      document.head.appendChild(style);
      document.body.appendChild(divContainer);
    })
    .catch((err) => {});
})();
