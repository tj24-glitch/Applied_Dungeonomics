export class ControlPanel {
  constructor(container, store, dispatcher) {
    this.container = d3.select(container);
    this.store = store;
    this.dispatcher = dispatcher;

    this.indexes = [
      "TBSI",
      "DEPI",
      "DTSR",
      "RADI",
      "SMFI",
      "PLI",
      "DBPI"
    ];

    this.render();
  }

  render() {
    this.container.html("");

    const wrapper = this.container
      .append("div")
      .attr("class", "index-button-group");

    const buttons = wrapper
      .selectAll("button")
      .data(this.indexes)
      .enter()
      .append("button")
      .attr("class", d =>
        d === this.store.selectedIndex
          ? "index-button active"
          : "index-button"
      )
      .text(d => d)
      .on("click", (event, d) => {
        this.store.setIndex(d);
        this.dispatcher.call("indexChange", null, d);
        this.render(); // re-render to update active state
      });
  }
}