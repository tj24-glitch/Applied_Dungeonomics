import { INDEX_DEFINITIONS } from "../state/indexDefinitions.js";

export class DistributionView {
  constructor(container, store, dispatcher) {
    this.container = d3.select(container);
    this.store = store;
    this.activeBand = null;

    this.width = 620;
    this.height = 380;
    this.margin = { top: 30, right: 30, bottom: 45, left: 60 };

    dispatcher.on("indexChange.distribution", index => {
      this.store.setIndex(index);
      this.activeBand = null;
      this.render();
    });

    this.render();
  }

  /* ─────────────────────────────
     UNKNOWN + TOOLTIP TEXT (ALL INDEXES)
  ───────────────────────────── */

  getUnknownText(indexKey) {
    return {
      TBSI: {
        race: "Unidentifiable Species (Witness Statements Incoherent)",
        class: "Occupation Unknown (Bar Was On Fire)",
        reason:
          "Subject could not be reliably identified due to alcohol, fire, overturned furniture, and conflicting eyewitness accounts. Multiple witnesses insist the subject was a chair."
      },
      DEPI: {
        race: "Species Lost to Fire",
        class: "Former Profession (Presumed Dead)",
        reason:
          "Records destroyed by dragonfire. Identification attempted post‑incident. Ashes were not cooperative."
      },
      DTSR: {
        race: "Unrecorded Species (Triggered Trap)",
        class: "Role Erased by Ceiling",
        reason:
          "Subject triggered a mechanism that removed both personal details and the surrounding hallway."
      },
      RADI: {
        race: "Lineage Classified",
        class: "Position Redacted by Crown",
        reason:
          "Identification sealed by royal decree. Court transcript ends abruptly."
      },
      SMFI: {
        race: "Never Seen",
        class: "Function Unknown (Too Quiet)",
        reason:
          "No visual confirmation exists. Subject may still be present."
      },
      PLI: {
        race: "Sealed by Tribunal",
        class: "Profession Under Investigation",
        reason:
          "Details confiscated during disciplinary proceedings."
      },
      DBPI: {
        race: "Witness Protection Program",
        class: "Rules Lawyer (Alias Pending)",
        reason:
          "Subject relocated after unresolved rules disputes. DM requested anonymity."
      }
    }[indexKey];
  }

  formatRaceClass(d) {
    const u = this.getUnknownText(this.store.selectedIndex);
    const race = d.processedRace?.trim() || u.race;
    const cls  = d.justClass?.trim()     || u.class;
    return `${race} — ${cls}`;
  }

  hasUnknown(d) {
    return !d.processedRace?.trim() || !d.justClass?.trim();
  }

  /* ───────────────────────────── */

  render() {
    this.container.html("");

    const data = this.store.getData();
    const indexKey = this.store.selectedIndex;
    const def = INDEX_DEFINITIONS[indexKey];
    if (!def) return;

    this.container.append("h2")
      .text(`${indexKey}: ${def.name}`);

    this.container.append("p")
      .html(`<strong>Scenario:</strong> ${def.scenario}`);

    this.container.append("p")
      .html(`<strong>What it measures:</strong> ${def.meaning}`);

    if (this.activeBand) {
      this.container.append("p")
        .attr("class", "analysis-status")
        .html(
          `<strong>Currently Analyzing:</strong><br/>
           ${this.activeBand.min}–${this.activeBand.max} — ${this.activeBand.label}`
        );
    }

    const layout = this.container.append("div").attr("class", "viz-layout");

    /* ─── Tooltip ─── */
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "missing-data-tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("pointer-events", "none");

    /* ─── SVG ─── */
    const svg = layout.append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    const g = svg.append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

    const iw = this.width - this.margin.left - this.margin.right;
    const ih = this.height - this.margin.top - this.margin.bottom;

    const x = d3.scaleLinear().domain([0, 100]).range([0, iw]);

    const values = data.map(d => d[indexKey]);
    const bins = d3.bin().domain(x.domain()).thresholds(20)(values);

    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .nice()
      .range([ih, 0]);

    /* ─── Bands ─── */
    g.selectAll(".band")
      .data(def.bands)
      .enter()
      .append("rect")
      .attr("x", d => x(d.min))
      .attr("y", 0)
      .attr("width", d => x(d.max) - x(d.min))
      .attr("height", ih)
      .attr("fill", (d, i) => def.colors.bands[i])
      .attr("opacity", d =>
        !this.activeBand ? 0.55 :
        d === this.activeBand ? 0.75 : 0.25
      )
      .style("cursor", "pointer")
      .on("click", (_, band) => {
        this.activeBand = band;
        this.render();
      });

    /* ─── Bars ─── */
    g.selectAll(".bar")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", d => x(d.x0))
      .attr("y", d => y(d.length))
      .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
      .attr("height", d => ih - y(d.length))
      .attr("fill", def.colors.bars);

    g.append("g").attr("transform", `translate(0,${ih})`).call(d3.axisBottom(x));
    g.append("g").call(d3.axisLeft(y));

    /* ─── Side Panel ─── */
    const side = layout.append("div").attr("class", "legend-vertical");
    side.append("h4").text("Interpretation");

    def.bands.forEach((band, i) => {
      side.append("div")
        .attr("class", "legend-row")
        .style("opacity", !this.activeBand || band === this.activeBand ? 1 : 0.5)
        .style("cursor", "pointer")
        .on("click", () => {
          this.activeBand = band;
          this.render();
        })
        .call(row => {
          row.append("span")
            .attr("class", "legend-swatch")
            .style("background-color", def.colors.bands[i]);
          row.append("span")
            .text(`${band.min}–${band.max}: ${band.label}`);
        });
    });

    /* ─── ✅ TOP‑3 RESULTS (FIXED) ─── */
    if (this.activeBand) {
      const panel = side.append("div").attr("class", "results-panel");
      panel.append("h4").text("Most Common Race + Class");

      const filtered = data.filter(d =>
        d[indexKey] >= this.activeBand.min &&
        d[indexKey] <= this.activeBand.max
      );

      const grouped = d3.rollups(
        filtered,
        v => v.length,
        d => this.formatRaceClass(d)        // ✅ correct grouping
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

      if (grouped.length === 0) {
        panel.append("p")
          .html(`<em>No viable specimens recorded. Capture alive if encountered.</em>`);
      } else {
        grouped.forEach(([key, count], i) => {
          const rawRow = filtered.find(d => this.formatRaceClass(d) === key);

          const p = panel.append("p")
            .html(`<strong>#${i + 1}</strong> ${key} (${count})`);

          if (this.hasUnknown(rawRow)) {
            p.style("cursor", "help")
              .on("mouseenter", e => {
                tooltip.html(
                  `<strong>Field Report</strong><br/>
                   ${this.getUnknownText(indexKey).reason}`
                )
                .style("left", e.pageX + 12 + "px")
                .style("top", e.pageY + 12 + "px")
                .transition().duration(100).style("opacity", 0.95);
              })
              .on("mouseleave", () =>
                tooltip.transition().duration(100).style("opacity", 0)
              );
          }
        });

        if (grouped.length < 3) {
          panel.append("p")
            .html(`<em>Insufficient population for full classification. Further study required.</em>`);
        }
      }
    }
  }
}