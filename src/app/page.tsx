"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  Camera,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Gauge,
  LayoutDashboard,
  Map,
  Pause,
  Play,
  Radio,
  TrainFront,
  Users,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import {
  createInitialSimulationState,
  stepSimulation,
  type StationZone,
  type SimulatedAlert,
  type TelemetryNode,
} from "@/lib/simulation";

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  color: string;
}) {
  return (
    <div className="metric-card">
      <div className="flex items-center justify-between">
        <span className="eyebrow">{label}</span>
        <Icon size={18} className={color} />
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-detail">{detail}</div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeLevel, setActiveLevel] = useState<"L1 Concourse" | "L2 Platform">("L1 Concourse");
  const [simState, setSimState] = useState(createInitialSimulationState);

  // Real-time deterministic simulation loop updating every 2.5 seconds
  useEffect(() => {
    if (simState.isPaused) return;

    const interval = setInterval(() => {
      setSimState((prev) => stepSimulation(prev));
    }, 2500);

    return () => clearInterval(interval);
  }, [simState.isPaused]);

  const acknowledgeAlert = useCallback((id: string) => {
    setSimState((current) => ({
      ...current,
      alerts: current.alerts.filter((alert) => alert.id !== id),
    }));
  }, []);

  const togglePause = useCallback(() => {
    setSimState((current) => ({
      ...current,
      isPaused: !current.isPaused,
    }));
  }, []);

  const navigation = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Station Zones", icon: Map },
    { label: "Coach Telemetry", icon: TrainFront },
    { label: "IoT Hardware", icon: Cpu },
    { label: "Alerts", icon: Bell },
  ];

  // Aggregate simulated metrics
  const totalPassengers = simState.zones.reduce((acc, z) => acc + z.passengerCount, 0);
  const totalCapacity = simState.zones.reduce((acc, z) => acc + z.capacity, 0);
  const avgDensity = Math.round((totalPassengers / totalCapacity) * 100);

  // Overall station crowd status
  const hasCritical = simState.zones.some((z) => z.density >= 90);
  const hasHigh = simState.zones.some((z) => z.density >= 80 && z.density < 90);
  const hasModerate = simState.zones.some((z) => z.density >= 60 && z.density < 80);
  const overallStatusText = hasCritical
    ? "CRITICAL SURGE"
    : hasHigh
      ? "HIGH DENSITY"
      : hasModerate
        ? "MODERATE FLOW"
        : "OPTIMAL FLOW";

  const overallStatusColor = hasCritical
    ? "text-red-400 bg-red-500/10 border-red-500/25"
    : hasHigh
      ? "text-orange-400 bg-orange-500/10 border-orange-500/25"
      : hasModerate
        ? "text-amber-400 bg-amber-500/10 border-amber-500/25"
        : "text-emerald-400 bg-emerald-500/10 border-emerald-500/25";

  // Filtered zones for selected floor level
  const displayedZones = simState.zones.filter((z) => z.level === activeLevel);

  return (
    <main className="min-h-screen bg-[#051424] text-[#d4e4fa]">
      <header className="topbar">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="brand-mark">
              <Activity size={23} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#4cd7f6]">
                MetroPulse
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8297ac]">
                Transit intelligence platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="demo-pill">
              <span className="status-dot" />
              SIMULATION
            </span>
            <div className="hidden items-center gap-2 rounded-lg bg-[#122131] px-3 py-2 text-xs text-[#a8bbcd] sm:flex">
              <TrainFront size={15} className="text-[#4cd7f6]" />
              Majestic Station (BLR)
              <ChevronDown size={14} />
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16495b] text-sm font-bold text-[#4cd7f6]">
              OP
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-7 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="eyebrow">CONTROL CENTRE / BENGALURU</span>
              <span className={`rounded border px-2 py-0.5 text-[9px] font-bold ${overallStatusColor}`}>
                {overallStatusText}
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Station Overview
            </h2>
            <p className="mt-2 text-sm text-[#8297ac]">
              Live simulated passenger movement, zone density thresholds, and automated alert monitoring.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div className="flex items-center gap-2 text-xs text-[#8297ac]">
              <Wifi size={15} className="text-emerald-400" />
              <span>
                Software prototype · Live simulated tick:{" "}
                <span className="font-mono text-cyan-300">#{simState.tick}</span> ({simState.lastUpdated})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={togglePause}
                className="flex items-center gap-1.5 rounded bg-[#122131] px-2.5 py-1 text-[11px] font-medium text-[#8297ac] transition hover:bg-[#1a2e43] hover:text-[#d4e4fa]"
                title={simState.isPaused ? "Resume simulation updates" : "Pause simulation updates"}
              >
                {simState.isPaused ? (
                  <>
                    <Play size={12} className="text-emerald-400" /> Resume Sim
                  </>
                ) : (
                  <>
                    <Pause size={12} className="text-amber-400" /> Pause Sim
                  </>
                )}
              </button>
              <span className="rounded bg-[#0d1c2d] px-2 py-1 text-[10px] text-[#657b90]">
                Loop: 2.5s
              </span>
            </div>
          </div>
        </div>

        <nav className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`nav-tab ${activeTab === label ? "nav-tab-active" : ""}`}
            >
              <Icon size={16} />
              {label}
              {label === "Alerts" && simState.alerts.length > 0 && (
                <span className="ml-1 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] text-red-300">
                  {simState.alerts.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {activeTab === "Overview" || activeTab === "Station Zones" ? (
          <>
            <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Simulated station census"
                value={totalPassengers.toLocaleString()}
                detail={`Simulated capacity: ${totalCapacity.toLocaleString()} pax`}
                icon={Users}
                color="text-[#4cd7f6]"
              />
              <MetricCard
                label="Average crowd density"
                value={`${avgDensity}%`}
                detail={`Station condition: ${overallStatusText}`}
                icon={Gauge}
                color={
                  hasCritical
                    ? "text-red-400"
                    : hasHigh
                      ? "text-orange-400"
                      : hasModerate
                        ? "text-amber-400"
                        : "text-emerald-400"
                }
              />
              <MetricCard
                label="Connected demo nodes"
                value={`0${simState.nodes.length} / 0${simState.nodes.length}`}
                detail="Simulated vision & sensor nodes online"
                icon={Radio}
                color="text-emerald-400"
              />
              <MetricCard
                label="Active alerts"
                value={String(simState.alerts.length).padStart(2, "0")}
                detail={
                  simState.alerts.length === 0
                    ? "All thresholds nominal"
                    : "Unacknowledged simulated alerts"
                }
                icon={Bell}
                color={simState.alerts.length > 0 ? "text-red-400" : "text-emerald-400"}
              />
            </section>

            <section className="panel mb-6">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="section-title">Station Crowd Distribution</h3>
                  <p className="section-subtitle">
                    Real-time passenger density &amp; flow rate across {activeLevel}
                  </p>
                </div>
                <div className="flex rounded-lg bg-[#091827] p-1">
                  {(["L1 Concourse", "L2 Platform"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setActiveLevel(level)}
                      className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
                        activeLevel === level
                          ? "bg-[#4cd7f6] text-[#051424]"
                          : "text-[#8297ac] hover:text-white"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Train Status Banner for Platform Level */}
              {activeLevel === "L2 Platform" && (
                <div className="mb-4 flex items-center justify-between rounded-lg border border-[#23384c] bg-[#0d1c2d] px-4 py-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <TrainFront size={16} className="text-[#4cd7f6]" />
                    <span className="text-[#8297ac]">Simulated Platform Schedule:</span>
                    <span className="font-semibold text-[#d4e4fa]">
                      {simState.trainStatus}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#4cd7f6]">
                    Next cycle: ~{simState.trainCountdown * 2.5 | 0}s
                  </span>
                </div>
              )}

              <div className="grid gap-3 md:grid-cols-2">
                {displayedZones.map((zone: StationZone) => {
                  const isCritical = zone.density >= 90;
                  const isHigh = zone.density >= 80 && zone.density < 90;
                  const isModerate = zone.density >= 60 && zone.density < 80;

                  const badgeClass = isCritical
                    ? "bg-red-500/15 text-red-300 border border-red-500/30"
                    : isHigh
                      ? "bg-orange-500/15 text-orange-300 border border-orange-500/30"
                      : isModerate
                        ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30";

                  const barColor = isCritical
                    ? "bg-red-400"
                    : isHigh
                      ? "bg-orange-400"
                      : isModerate
                        ? "bg-amber-400"
                        : "bg-emerald-400";

                  const statusLabel = isCritical
                    ? "Critical (≥90%)"
                    : isHigh
                      ? "High (80-89%)"
                      : isModerate
                        ? "Moderate (60-79%)"
                        : "Normal (<60%)";

                  return (
                    <div className="zone-card" key={zone.id}>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div>
                          <p className="eyebrow">{zone.id} · {zone.level}</p>
                          <h4 className="mt-1 text-sm font-semibold">{zone.name}</h4>
                        </div>
                        <span className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase ${badgeClass}`}>
                          {statusLabel}
                        </span>
                      </div>

                      <div className="mb-2 flex items-end justify-between">
                        <div>
                          <span className="text-2xl font-bold tracking-tight">
                            {zone.density}%
                          </span>
                          <span className="ml-2 font-mono text-xs text-[#8297ac]">
                            ({zone.passengerCount} / {zone.capacity} pax)
                          </span>
                        </div>
                        <span className="text-xs font-medium text-[#4cd7f6]">{zone.flow}</span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-[#091827]">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                          style={{ width: `${Math.min(100, zone.density)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap gap-4 border-t border-[#26394b] pt-4 text-[11px] text-[#8297ac]">
                <span>Density thresholds:</span>
                <span className="flex items-center gap-1.5">
                  <i className="h-2 w-2 rounded-full bg-emerald-400" /> Normal (&lt;60%)
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="h-2 w-2 rounded-full bg-amber-400" /> Moderate (60–79%)
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="h-2 w-2 rounded-full bg-orange-400" /> High (80–89%)
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="h-2 w-2 rounded-full bg-red-400" /> Critical (≥90%)
                </span>
              </div>
            </section>
          </>
        ) : null}

        {(activeTab === "Overview" || activeTab === "Alerts") && (
          <section className="panel mb-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="section-title">Event &amp; Alert Stream</h3>
                <p className="section-subtitle">
                  Automated threshold breach and recovery alerts (Simulated)
                </p>
              </div>
              <span className="rounded-md bg-[#1c2b3c] px-2.5 py-1 font-mono text-[10px] text-[#a8bbcd]">
                {simState.alerts.length} ACTIVE
              </span>
            </div>

            <div className="space-y-3">
              {simState.alerts.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[#34495c] p-8 text-center">
                  <CheckCircle2 className="mx-auto mb-2 text-emerald-400" />
                  <p className="text-sm font-semibold">All alerts acknowledged</p>
                  <p className="mt-1 text-xs text-[#8297ac]">
                    No unacknowledged simulated threshold alerts at this time.
                  </p>
                </div>
              ) : (
                simState.alerts.map((alert: SimulatedAlert) => {
                  const isCrit = alert.severity === "critical";
                  const isHi = alert.severity === "high";
                  const isMod = alert.severity === "moderate";

                  const badgeColor = isCrit
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : isHi
                      ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                      : isMod
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";

                  return (
                    <div className="alert-row" key={alert.id}>
                      <div className={`mt-1 rounded-lg p-2 ${badgeColor}`}>
                        {alert.severity === "normal" ? (
                          <CheckCircle2 size={18} />
                        ) : (
                          <AlertTriangle size={18} />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-xs font-bold tracking-wide">
                            {alert.type}
                          </p>
                          <span className="font-mono text-[10px] text-[#8297ac]">
                            {alert.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-medium">{alert.zone}</p>
                        <p className="mt-1 text-xs leading-relaxed text-[#8297ac]">
                          {alert.message}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="font-mono text-[10px] text-[#657b90]">
                            ID: {alert.id}
                          </span>
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="text-xs font-semibold text-[#4cd7f6] hover:text-white"
                          >
                            Acknowledge
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        )}

        {activeTab === "Coach Telemetry" && (
          <section className="panel">
            <div className="mb-5">
              <h3 className="section-title">Coach Telemetry (Architecture Specification)</h3>
              <p className="section-subtitle">
                Coach occupancy is not physically instrumented in this prototype.
              </p>
            </div>
            <div className="rounded-lg border border-dashed border-[#34495c] p-8 text-center">
              <TrainFront className="mx-auto mb-3 text-[#4cd7f6]" size={32} />
              <p className="text-base font-semibold">Coach telemetry integration planned</p>
              <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-[#8297ac]">
                Real Metro coach occupancy measurements require certified rolling-stock sensor
                interfaces, weight-bridge telemetry, or authorized onboard optical sensors.
                Currently, MetroPulse estimates platform-level boarding and alighting cycles via
                the station software simulation.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#0d1c2d] px-3 py-1.5 text-xs text-[#8297ac]">
                <Activity size={14} className="text-[#4cd7f6]" />
                Simulated platform schedule: <span className="font-mono text-cyan-300">{simState.trainStatus}</span>
              </div>
            </div>
          </section>
        )}

        {activeTab === "IoT Hardware" && (
          <section className="panel">
            <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h3 className="section-title">Edge &amp; IoT Architecture</h3>
                <p className="section-subtitle">
                  Proposed hardware roles — software simulation active (not physically connected)
                </p>
              </div>
              <span className="rounded bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 border border-emerald-500/20">
                3 Simulated Nodes Active
              </span>
            </div>

            <div className="mb-6 grid gap-3 md:grid-cols-3">
              {simState.nodes.map((node: TelemetryNode) => (
                <div key={node.id} className="rounded-lg border border-[#203447] bg-[#0d1c2d] p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#4cd7f6]">{node.id}</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {node.status}
                    </span>
                  </div>
                  <h4 className="mt-2 text-sm font-semibold">{node.name}</h4>
                  <p className="mt-1 text-xs text-[#8297ac]">{node.location}</p>
                  <div className="mt-3 border-t border-[#1e2f40] pt-2 text-[10px] text-[#657b90]">
                    <div>Interface: {node.protocolPlaceholder}</div>
                    <div>Last Heartbeat: {node.lastHeartbeat}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="zone-card">
                <Camera className="mb-3 text-[#4cd7f6]" />
                <h4 className="font-semibold">Camera input</h4>
                <p className="mt-2 text-xs text-[#8297ac]">
                  Supplies video for local people detection, tracking, and crowd-density estimation.
                </p>
                <span className="mt-4 inline-block text-[10px] font-bold text-amber-300">
                  PROPOSED INPUT INTERFACE
                </span>
              </div>
              <div className="zone-card">
                <Cpu className="mb-3 text-[#4cd7f6]" />
                <h4 className="font-semibold">NVIDIA Jetson</h4>
                <p className="mt-2 text-xs text-[#8297ac]">
                  Proposed edge unit for local video analytics and AI inference.
                </p>
                <span className="mt-4 inline-block text-[10px] font-bold text-amber-300">
                  PROPOSED EDGE UNIT
                </span>
              </div>
              <div className="zone-card">
                <Radio className="mb-3 text-emerald-400" />
                <h4 className="font-semibold">ESP32 / STM32</h4>
                <p className="mt-2 text-xs text-[#8297ac]">
                  Optional microcontroller nodes for auxiliary environmental and barrier sensors.
                </p>
                <span className="mt-4 inline-block text-[10px] font-bold text-amber-300">
                  PROPOSED SENSOR NODES
                </span>
              </div>
              <div className="zone-card">
                <Activity className="mb-3 text-emerald-400" />
                <h4 className="font-semibold">Software Telemetry Engine</h4>
                <p className="mt-2 text-xs text-[#8297ac]">
                  Continuously simulating realistic passenger arrivals, platform surges, and density variations.
                </p>
                <span className="mt-4 inline-block text-[10px] font-bold text-emerald-300">
                  SIMULATION ACTIVE
                </span>
              </div>
            </div>
          </section>
        )}

        <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-[#26394b] pt-5 text-[10px] text-[#657b90] sm:flex-row">
          <span>METROPULSE · CROWD INTELLIGENCE PROTOTYPE</span>
          <span>SIMULATED TELEMETRY · NOT LIVE METRO DATA</span>
        </footer>
      </div>
    </main>
  );
}
