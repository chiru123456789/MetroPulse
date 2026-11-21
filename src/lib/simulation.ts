export type SeverityLevel = "normal" | "moderate" | "high" | "critical";

export interface StationZone {
  id: string;
  name: string;
  level: "L1 Concourse" | "L2 Platform";
  capacity: number;
  passengerCount: number;
  density: number;
  flow: string;
  previousSeverity: SeverityLevel;
}

export interface SimulatedAlert {
  id: string;
  type: string;
  zone: string;
  message: string;
  time: string;
  severity: SeverityLevel;
}

export interface TelemetryNode {
  id: string;
  name: string;
  role: string;
  location: string;
  status: "ONLINE" | "STANDBY";
  lastHeartbeat: string;
  protocolPlaceholder: string;
}

export interface SimulationState {
  tick: number;
  lastUpdated: string;
  zones: StationZone[];
  alerts: SimulatedAlert[];
  nodes: TelemetryNode[];
  alertCounter: number;
  trainCountdown: number;
  trainStatus: string;
  isPaused: boolean;
}

export const INITIAL_ZONES: StationZone[] = [
  {
    id: "ZONE A",
    name: "Entrance Turnstiles",
    level: "L1 Concourse",
    capacity: 400,
    passengerCount: 168,
    density: 42,
    flow: "142 pax/min",
    previousSeverity: "normal",
  },
  {
    id: "ZONE B",
    name: "Ticketing & Kiosks",
    level: "L1 Concourse",
    capacity: 250,
    passengerCount: 125,
    density: 50,
    flow: "Queue: 3 min",
    previousSeverity: "normal",
  },
  {
    id: "ZONE C",
    name: "Concourse Escalators",
    level: "L1 Concourse",
    capacity: 220,
    passengerCount: 167,
    density: 76,
    flow: "88 pax/min",
    previousSeverity: "moderate",
  },
  {
    id: "ZONE D",
    name: "Baggage & Security",
    level: "L1 Concourse",
    capacity: 180,
    passengerCount: 112,
    density: 62,
    flow: "74 pax/min",
    previousSeverity: "moderate",
  },
  {
    id: "ZONE E",
    name: "Platform 1 West",
    level: "L2 Platform",
    capacity: 650,
    passengerCount: 390,
    density: 60,
    flow: "Next train: 4 min",
    previousSeverity: "moderate",
  },
  {
    id: "ZONE F",
    name: "Platform 2 East",
    level: "L2 Platform",
    capacity: 650,
    passengerCount: 565,
    density: 87,
    flow: "Train arriving soon",
    previousSeverity: "high",
  },
  {
    id: "ZONE G",
    name: "Stairwell C & Overbridge",
    level: "L2 Platform",
    capacity: 240,
    passengerCount: 173,
    density: 72,
    flow: "52 pax/min",
    previousSeverity: "moderate",
  },
  {
    id: "ZONE H",
    name: "Boarding Queue 02",
    level: "L2 Platform",
    capacity: 350,
    passengerCount: 196,
    density: 56,
    flow: "Dispersing",
    previousSeverity: "normal",
  },
];

export const INITIAL_ALERTS: SimulatedAlert[] = [
  {
    id: "ALT-4019",
    type: "HIGH CONGESTION",
    zone: "Platform 2 East",
    message: "Simulated crowd density has crossed the 80% threshold (87%).",
    time: "14:31:45",
    severity: "high",
  },
  {
    id: "ALT-4020",
    type: "FLOW BOTTLENECK",
    zone: "Concourse Escalators",
    message: "Simulated passenger flow has slowed below expected throughput (76%).",
    time: "14:28:10",
    severity: "moderate",
  },
  {
    id: "ALT-4017",
    type: "FLOW RESTORED",
    zone: "Entrance Turnstiles",
    message: "Passenger flow returned to normal simulated operating range.",
    time: "14:20:00",
    severity: "normal",
  },
];

export const INITIAL_NODES: TelemetryNode[] = [
  {
    id: "EDGE-BLR-01",
    name: "Concourse Entrance Node",
    role: "Camera / People Counter",
    location: "L1 Entrance Turnstiles",
    status: "ONLINE",
    lastHeartbeat: "Just now",
    protocolPlaceholder: "MQTT Ready (Simulated)",
  },
  {
    id: "EDGE-BLR-02",
    name: "Escalator Bank Vision Unit",
    role: "NVIDIA Jetson Edge Unit",
    location: "Concourse Escalators",
    status: "ONLINE",
    lastHeartbeat: "Just now",
    protocolPlaceholder: "MQTT Ready (Simulated)",
  },
  {
    id: "EDGE-BLR-03",
    name: "Platform 2 Safety Node",
    role: "ESP32 Auxiliary Sensor",
    location: "Platform 2 East",
    status: "ONLINE",
    lastHeartbeat: "Just now",
    protocolPlaceholder: "MQTT Ready (Simulated)",
  },
];

export function getSeverity(density: number): SeverityLevel {
  if (density >= 90) return "critical";
  if (density >= 80) return "high";
  if (density >= 60) return "moderate";
  return "normal";
}

function formatCurrentTime(): string {
  const now = new Date();
  return now.toTimeString().split(" ")[0];
}

export function createInitialSimulationState(): SimulationState {
  return {
    tick: 0,
    lastUpdated: "14:32:00",
    zones: INITIAL_ZONES,
    alerts: INITIAL_ALERTS,
    nodes: INITIAL_NODES,
    alertCounter: 4021,
    trainCountdown: 8,
    trainStatus: "En route (arriving in ~20s)",
    isPaused: false,
  };
}

export function stepSimulation(state: SimulationState): SimulationState {
  if (state.isPaused) return state;

  const nextTick = state.tick + 1;
  const currentTime = formatCurrentTime();
  let nextCountdown = state.trainCountdown - 1;
  let trainStatus = state.trainStatus;
  let trainArrivedThisTick = false;

  if (nextCountdown <= 0) {
    nextCountdown = 10; // Reset train cycle (~25 seconds)
    trainArrivedThisTick = true;
    trainStatus = "Train docked at Platform 2 East · Boarding / Alighting";
  } else if (nextCountdown <= 2) {
    trainStatus = "Train approaching Platform 2 East";
  } else {
    trainStatus = `Next train in ~${nextCountdown * 2.5 | 0}s (Platform 2)`;
  }

  const newAlerts: SimulatedAlert[] = [...state.alerts];
  let alertCounter = state.alertCounter;

  // Passenger dynamics simulation
  const nextZones: StationZone[] = state.zones.map((zone) => {
    let delta = 0;
    let flowText = zone.flow;

    // Pseudo-random deterministic variation based on tick and zone id
    const seed = (nextTick * 17 + zone.name.length * 31) % 100;
    const flux = (seed % 15) - 7; // -7 to +7 natural fluctuation

    switch (zone.id) {
      case "ZONE A": {
        // Entrance: Arrivals from outside (15-30 pax per step)
        const arrivals = 18 + (seed % 14);
        const exitToStation = 16 + (seed % 12);
        delta = arrivals - exitToStation + flux;
        flowText = `${Math.max(100, Math.round(130 + flux * 4))} pax/min`;
        break;
      }
      case "ZONE B": {
        // Ticketing: queue fluctuation
        const inFlow = 8 + (seed % 8);
        const outFlow = 7 + ((seed * 3) % 9);
        delta = inFlow - outFlow;
        const waitMin = Math.max(1, Math.round(zone.passengerCount / 40));
        flowText = `Queue: ~${waitMin} min`;
        break;
      }
      case "ZONE C": {
        // Escalators: steady transit between concourse and platform
        const moving = 12 + (seed % 10);
        delta = flux;
        flowText = `${Math.round(80 + moving * 2)} pax/min`;
        break;
      }
      case "ZONE D": {
        // Security Screening
        delta = flux;
        flowText = `${Math.round(70 + flux * 3)} pax/min`;
        break;
      }
      case "ZONE E": {
        // Platform 1 West
        delta = 4 + flux;
        flowText = "Normal platform dwell";
        break;
      }
      case "ZONE F": {
        // Platform 2 East: impacted by train arrivals
        if (trainArrivedThisTick) {
          // Train arrives: 90 passengers board (leave station), 70 passengers alight
          delta = -45 + (seed % 15);
          flowText = "Boarding active";
        } else if (nextCountdown <= 2) {
          // Pre-train crowd build-up
          delta = 16 + (seed % 10);
          flowText = "Train arriving soon";
        } else {
          delta = 6 + flux;
          flowText = "Waiting on platform";
        }
        break;
      }
      case "ZONE G": {
        // Stairwell C & Overbridge
        delta = trainArrivedThisTick ? 25 : flux;
        flowText = `${Math.max(40, Math.round(60 + flux * 2))} pax/min`;
        break;
      }
      case "ZONE H": {
        // Boarding Queue / Dispersal
        delta = trainArrivedThisTick ? -20 : flux;
        flowText = trainArrivedThisTick ? "Alighting dispersal" : "Dispersing";
        break;
      }
      default:
        delta = flux;
    }

    const minPax = Math.round(zone.capacity * 0.15);
    const maxPax = Math.round(zone.capacity * 1.05);
    const newPax = Math.max(minPax, Math.min(maxPax, zone.passengerCount + delta));
    const newDensity = Math.min(100, Math.max(0, Math.round((newPax / zone.capacity) * 100)));
    const newSeverity = getSeverity(newDensity);

    // Alert threshold crossing detection
    if (newSeverity !== zone.previousSeverity) {
      if (newSeverity === "critical") {
        newAlerts.unshift({
          id: `ALT-${alertCounter++}`,
          type: "CRITICAL SURGE",
          zone: zone.name,
          message: `Simulated crowd density has crossed critical safety threshold (${newDensity}%). Estimated ${newPax} / ${zone.capacity} pax.`,
          time: currentTime,
          severity: "critical",
        });
      } else if (newSeverity === "high" && zone.previousSeverity !== "critical") {
        newAlerts.unshift({
          id: `ALT-${alertCounter++}`,
          type: "HIGH CONGESTION",
          zone: zone.name,
          message: `Simulated crowd density reached high congestion threshold (${newDensity}%).`,
          time: currentTime,
          severity: "high",
        });
      } else if (newSeverity === "normal") {
        newAlerts.unshift({
          id: `ALT-${alertCounter++}`,
          type: "FLOW RESTORED",
          zone: zone.name,
          message: `Simulated passenger flow restored to normal range (${newDensity}%).`,
          time: currentTime,
          severity: "normal",
        });
      }
    }

    return {
      ...zone,
      passengerCount: newPax,
      density: newDensity,
      flow: flowText,
      previousSeverity: newSeverity,
    };
  });

  // Cap alerts list to prevent memory growth
  const boundedAlerts = newAlerts.slice(0, 15);

  const updatedNodes = state.nodes.map((node) => ({
    ...node,
    lastHeartbeat: currentTime,
  }));

  return {
    ...state,
    tick: nextTick,
    lastUpdated: currentTime,
    zones: nextZones,
    alerts: boundedAlerts,
    nodes: updatedNodes,
    alertCounter,
    trainCountdown: nextCountdown,
    trainStatus,
  };
}
