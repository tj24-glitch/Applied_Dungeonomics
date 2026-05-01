export const INDEX_DEFINITIONS = {
  TBSI: {
    key: "TBSI",
    name: "Tavern Brawl Survival Index",
    scenario: "No initiative. No armor. Someone already threw a chair.",
    meaning: "Odds of walking away instead of becoming lore.",
    bands: [
      { min: 0, max: 19, label: "Thought It Was Performance Art" },
      { min: 20, max: 34, label: "Wrong Bar" },
      { min: 35, max: 49, label: "Leaves Early" },
      { min: 50, max: 64, label: "Finishes the Fight" },
      { min: 65, max: 74, label: "Banned From Three Taverns" },
      { min: 75, max: 85, label: "Started the Bar Fight" },
      { min: 86, max: 100, label: "Legendary Yelp Review" }
    ],
    colors: {
      bars: "#1f2937",
      bands: [
        "#fee2e2",
        "#fed7aa",
        "#fef3c7",
        "#dcfce7",
        "#bfdbfe",
        "#ddd6fe",
        "#f5d0fe"
      ]
    }
  },

  DEPI: {
    key: "DEPI",
    name: "Dragon Encounter Panic Index",
    scenario: "The plan was talking. The dragon disagreed.",
    meaning: "Assesses the odds against scales, fire, and very bad life choices.",
    bands: [
      { min: 0, max: 19, label: "What’s a Dragon?" },
      { min: 20, max: 34, label: "Bold Plan, Bad Math" },
      { min: 35, max: 49, label: "Maybe This’ll Work?" },
      { min: 50, max: 64, label: "Retreat With Dignity" },
      { min: 65, max: 74, label: "Didn’t Pack Light" },
      { min: 75, max: 85, label: "Never Seen Again" },
      { min: 86, max: 100, label: "Dragon Checks for You" }
    ],
    colors: {
      bars: "#111827",
      bands: [
        "#fecaca",
        "#fde68a",
        "#fef3c7",
        "#cffafe",
        "#bae6fd",
        "#c7d2fe",
        "#e0e7ff"
      ]
    }
  },

  DTSR: {
    key: "DTSR",
    name: "Dungeon Trap Survival Rating",
    scenario: "You hear a click.",
    meaning: "Measure of awareness for when the floor is lying.",
    bands: [
      { min: 0, max: 19, label: "It Was the Floor" },
      { min: 20, max: 34, label: "Learns the Hard Way" },
      { min: 35, max: 49, label: "Cautiously Optimistic" },
      { min: 50, max: 64, label: "Checks Sometimes" },
      { min: 65, max: 74, label: "Paranoid for a Reason" },
      { min: 75, max: 85, label: "Has a 10‑Foot Pole" },
      { min: 86, max: 100, label: "Retired Rogue Trainer" }
    ],
    colors: {
      bars: "#1f2937",
      bands: [
        "#fef9c3",
        "#fde68a",
        "#d9f99d",
        "#bbf7d0",
        "#86efac",
        "#5eead4",
        "#99f6e4"
      ]
    }
  },

  RADI: {
    key: "RADI",
    name: "Royal Audience Disaster Index",
    scenario: "You stand before the king. The barbarian speaks.",
    meaning: "Higher score means fewer executions.",
    bands: [
      { min: 0, max: 19, label: "Arrested Mid‑Sentence" },
      { min: 20, max: 34, label: "Diplomatic Incident" },
      { min: 35, max: 49, label: "The King Is Tired" },
      { min: 50, max: 64, label: "Saved the Meeting" },
      { min: 65, max: 74, label: "Invited Back" },
      { min: 75, max: 85, label: "Turned It Around" },
      { min: 86, max: 100, label: "Married into Nobility" }
    ],
    colors: {
      bars: "#1f2937",
      bands: [
        "#ffe4e6",
        "#fed7aa",
        "#fde68a",
        "#d1fae5",
        "#93c5fd",
        "#a5b4fc",
        "#e9d5ff"
      ]
    }
  },

  SMFI: {
    key: "SMFI",
    name: "Stealth Mission Failure Index",
    scenario: "Everyone roll stealth.",
    meaning: "A measure of respect for the concept of silence.",
    bands: [
      { min: 0, max: 19, label: "Roll Initiative" },
      { min: 20, max: 34, label: "Someone Sneezed" },
      { min: 35, max: 49, label: "Armor Makes Noise" },
      { min: 50, max: 64, label: "Actually Sneaky" },
      { min: 65, max: 74, label: "Wasn’t There" },
      { min: 75, max: 85, label: "DM Forgot You" },
      { min: 86, max: 100, label: "Invisible to Math" }
    ],
    colors: {
      bars: "#020617",
      bands: [
        "#e5e7eb",
        "#d1d5db",
        "#9ca3af",
        "#86efac",
        "#67e8f9",
        "#7dd3fc",
        "#bae6fd"
      ]
    }
  },

  PLI: {
    key: "PLI",
    name: "Party Liability Index",
    scenario: "The DM pauses and looks directly at you.",
    meaning: "Likelihood of turning a plan into a story.",
    bands: [
      { min: 0, max: 49, label: "Manageable" },
      { min: 50, max: 64, label: "Noticeable Danger" },
      { min: 65, max: 74, label: "Please Stop Them" },
      { min: 75, max: 100, label: "Campaign‑Defining Menace" }
    ],
    colors: {
      bars: "#1f2937",
      bands: ["#dcfce7", "#fde68a", "#fdba74", "#f87171"]
    }
  },

  DBPI: {
    key: "DBPI",
    name: "DM Blood Pressure Index",
    scenario: "The rules conversation starts before your turn.",
    meaning: "Predicts table stress response.",
    bands: [
      { min: 0, max: 49, label: "Calm Table" },
      { min: 50, max: 64, label: "DM Bracing" },
      { min: 65, max: 74, label: "Rules‑Lawyer Aura" },
      { min: 75, max: 100, label: "Entire Arc Revolves Around You" }
    ],
    colors: {
      bars: "#020617",
      bands: ["#e0f2fe", "#bae6fd", "#fca5a5", "#ef4444"]
    }
  }
};