export const INTERPRETATION_BANDS = [
  { min: 0,  max: 19,  tier: "Why Are You Here?" },
  { min: 20, max: 34,  tier: "Learning Experience" },
  { min: 35, max: 49,  tier: "Functioning Adventurer" },
  { min: 50, max: 64,  tier: "Competent Professional" },
  { min: 65, max: 74,  tier: "Built Different" },
  { min: 75, max: 85,  tier: "Statistical Anomaly" },
  { min: 86, max: 100, tier: "NPC Rumor / DM Lies" }
];

class Store {
  constructor() {
    this.data = [];

    this.selectedIndex = "TBSI";
    this.selectedBand = INTERPRETATION_BANDS[3]; // 50–64
  }

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  setIndex(index) {
    this.selectedIndex = index;
  }

  setBand(band) {
    this.selectedBand = band;
  }
}

export const store = new Store();