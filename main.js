import { store } from "./state/store.js";
import { dispatcher } from "./state/dispatcher.js";
import { ControlPanel } from "./components/ControlPanel.js";
import { DistributionView } from "./components/DistributionView.js";

d3.csv("data/dnd_character_dataset_cleaned.csv", d3.autoType).then(data => {
  store.setData(data);

  new ControlPanel("#controls", store, dispatcher);
  new DistributionView("#distribution-view", store, dispatcher);
});