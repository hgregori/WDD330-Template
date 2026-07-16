export default class Alert {
  constructor() {
    this.alerts = [];
  }

  async init() {
    const alerts = await this.loadAlerts();
    if (alerts.length > 0) {
      this.alerts = alerts;
      this.renderAlerts();
    }
  }

  async loadAlerts() {
    const res = await fetch("/json/alerts.json");
    const data = await res.json();
    return data;
  }

  renderAlerts() {
    const section = document.createElement("section");
    section.className = "alert-list";

    this.alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    const main = document.querySelector("main");
    main.prepend(section);
  }
}
