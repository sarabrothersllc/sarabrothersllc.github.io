(function renderAnnouncementsFromJson() {
  const band = document.querySelector("#announcementBand");
  const list = document.querySelector("#announcementList");
  if (!band || !list) return;

  try {
    const request = new XMLHttpRequest();
    request.open("GET", `announcements.json?v=${Date.now()}`, false);
    request.send(null);
    if (request.status < 200 || request.status >= 300) {
      throw new Error("announcements.json unavailable");
    }

    const payload = JSON.parse(request.responseText);
    const source = Array.isArray(payload) ? payload : payload.announcements;
    const announcements = Array.isArray(source)
      ? source
          .filter((item) => typeof item === "string" && item.trim())
          .map((item) => item.trim())
          .slice(0, 6)
      : [];

    list.innerHTML = "";
    announcements.forEach((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      list.appendChild(item);
    });

    band.hidden = announcements.length === 0;
  } catch (error) {
    console.warn(error);
    band.hidden = true;
    list.innerHTML = "";
  }
})();
