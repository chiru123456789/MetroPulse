
"use client";

import { useState } from "react";
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
  Radio,
  TrainFront,
  Users,
  Wifi,
} from "lucide-react";

const initialAlerts = [
  {
    id: "ALT-4019",
    type: "CRITICAL SURGE",
    zone: "Platform 2 East",
    message: "Simulated crowd density has crossed the critical threshold.",
    time: "14:31:45",
    severity: "critical",
  },
  {
    id: "ALT-4020",
    type: "FLOW BOTTLENECK",
    zone: "Stairwell C",
    message: "Simulated passenger flow has slowed below the expected rate.",
    time: "14:28:10",
    severity: "warning",
  },
  {
    id: "ALT-4017",
    type: "FLOW RESTORED",
    zone: "Turnstile Bank 04",
    message: "Passenger flow returned to its normal simulated range.",
    time: "14:20:00",
    severity: "normal",
  },
];

const zones = [
  { name: "Entrance Turnstiles", id: "ZONE A", density: 24, flow: "142 pax/min" },
  { name: "Ticketing & Kiosks", id: "ZONE B", density: 48, flow: "Queue: 3 min" },
  { name: "Concourse Escalators", id: "ZONE C", density: 76, flow: "88 pax/min" },
  { name: "Platform 2 East", id: "ZONE D", density: 89, flow: "Train arriving soon" },
];

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
  icon: typeof Users;
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
  const [activeLevel, setActiveLevel] = useState("L1 Concourse");
  const [alerts, setAlerts] = useState(initialAlerts);

  const acknowledgeAlert = (id: string) => {
    setAlerts((current) => current.filter((alert) => alert.id !== id));
  };

  const navigation = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Station Zones", icon: Map },
    { label: "Coach Telemetry", icon: TrainFront },
    { label: "IoT Hardware", icon: Cpu },
    { label: "Alerts", icon: Bell },
  ];

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
              Majestic Station
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
            <p className="eyebrow mb-2">CONTROL CENTRE / BENGALURU</p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Station Overview
            </h2>
            <p className="mt-2 text-sm text-[#8297ac]">
              Monitor passenger movement, crowd density and system telemetry.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8297ac]">
            <Wifi size={15} className="text-emerald-400" />
            Software prototype · Simulated data
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
              {label === "Alerts" && alerts.length > 0 && (
                <span className="ml-1 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] text-red-300">
                  {alerts.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {activeTab === "Overview" || activeTab === "Station Zones" ? (
          <>
            <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Estimated passengers"
                value="1,428"
                detail="Illustrative station count"
                icon={Users}
                color="text-[#4cd7f6]"
              />
              <MetricCard
                label="Average crowd density"
                value="68.4%"
                detail="Simulated occupancy estimate"
                icon={Gauge}
                color="text-amber-400"
              />
              <MetricCard
                label="Connected demo nodes"
                value="03"
                detail="Simulated device telemetry"
                icon={Radio}
                color="text-emerald-400"
              />
              <MetricCard
                label="Active alerts"
                value={String(alerts.length).padStart(2, "0")}
                detail="Unacknowledged demo alerts"
                icon={Bell}
                color="text-red-400"
              />
            </section>

            <section className="panel mb-6">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="section-title">Station Crowd Distribution</h3>
                  <p className="section-subtitle">
                    Illustrative passenger density across station zones
                  </p>
                </div>
                <div className="flex rounded-lg bg-[#091827] p-1">
                  {["L1 Concourse", "L2 Platform"].map((level) => (
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

              <div className="grid gap-3 md:grid-cols-2">
                {zones.map((zone) => {
                  const critical = zone.density >= 80;
                  const warning = zone.density >= 70 && !critical;

                  return (
                    <div className="zone-card" key={zone.id}>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div>
                          <p className="eyebrow">{zone.id}</p>
                          <h4 className="mt-1 text-sm font-semibold">{zone.name}</h4>
                        </div>
                        <span
                          className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase ${
                            critical
                              ? "bg-red-500/15 text-red-300"
                              : warning
                                ? "bg-amber-500/15 text-amber-300"
                                : "bg-emerald-500/15 text-emerald-300"
                          }`}
                        >
                          {critical ? "Critical" : warning ? "Moderate" : "Normal"}
                        </span>
                      </div>

                      <div className="mb-2 flex items-end justify-between">
                        <span className="text-2xl font-bold tracking-tight">
                          {zone.density}%
                        </span>
                        <span className="text-xs text-[#8297ac]">{zone.flow}</span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-[#091827]">
                        <div
                          className={`h-full rounded-full ${
                            critical
                              ? "bg-red-400"
                              : warning
                                ? "bg-amber-400"
                                : "bg-emerald-400"
                          }`}
                          style={{ width: `${zone.density}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap gap-4 border-t border-[#26394b] pt-4 text-[11px] text-[#8297ac]">
                <span>Density scale:</span>
                <span className="flex items-center gap-2">
                  <i className="h-2 w-2 rounded-full bg-emerald-400" /> Normal
                </span>
                <span className="flex items-center gap-2">
                  <i className="h-2 w-2 rounded-full bg-amber-400" /> Moderate
                </span>
                <span className="flex items-center gap-2">
                  <i className="h-2 w-2 rounded-full bg-red-400" /> Critical
                </span>
              </div>
            </section>
          </>
        ) : null}

        {(activeTab === "Overview" || activeTab === "Alerts") && (
          <section className="panel mb-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="section-title">Event & Alert Stream</h3>
                <p className="section-subtitle">
                  Simulated operational events
                </p>
              </div>
              <span className="rounded-md bg-[#1c2b3c] px-2 py-1 text-[10px] text-[#a8bbcd]">
                {alerts.length} OPEN
              </span>
            </div>

            <div className="space-y-3">
              {alerts.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[#34495c] p-8 text-center">
                  <CheckCircle2 className="mx-auto mb-2 text-emerald-400" />
                  <p className="text-sm font-semibold">All alerts acknowledged</p>
                  <p className="mt-1 text-xs text-[#8297ac]">
                    No unacknowledged demo alerts remain.
                  </p>
                </div>
              ) : (
                alerts.map((alert) => (
                  <div className="alert-row" key={alert.id}>
                    <div
                      className={`mt-1 rounded-lg p-2 ${
                        alert.severity === "critical"
                          ? "bg-red-500/10 text-red-400"
                          : alert.severity === "warning"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-emerald-500/10 text-emerald-400"
                      }`}
                    >
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
                ))
              )}
            </div>
          </section>
        )}

        {activeTab === "Coach Telemetry" && (
          <section className="panel">
            <h3 className="section-title">Coach Telemetry</h3>
            <p className="section-subtitle">
              Coach occupancy is not physically instrumented in this prototype.
            </p>
            <div className="mt-5 rounded-lg border border-dashed border-[#34495c] p-8 text-center">
              <TrainFront className="mx-auto mb-3 text-[#4cd7f6]" size={30} />
              <p className="font-semibold">Coach data integration planned</p>
              <p className="mt-2 text-xs text-[#8297ac]">
                Future occupancy estimates may use authorized onboard cameras
                or validated boarding and alighting sensors.
              </p>
            </div>
          </section>
        )}

        {activeTab === "IoT Hardware" && (
          <section className="panel">
            <div className="mb-5">
              <h3 className="section-title">Edge & IoT Architecture</h3>
              <p className="section-subtitle">
                Proposed hardware roles — not connected physical devices
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="zone-card">
                <Camera className="mb-3 text-[#4cd7f6]" />
                <h4 className="font-semibold">Camera input</h4>
                <p className="mt-2 text-xs text-[#8297ac]">
                  Supplies video for local people detection, tracking and
                  crowd-density estimation.
                </p>
                <span className="mt-4 inline-block text-[10px] font-bold text-amber-300">
                  PROPOSED INPUT
                </span>
              </div>
              <div className="zone-card">
                <Cpu className="mb-3 text-[#4cd7f6]" />
                <h4 className="font-semibold">NVIDIA Jetson</h4>
                <p className="mt-2 text-xs text-[#8297ac]">
                  Proposed edge computer for video analytics and AI inference.
                </p>
                <span className="mt-4 inline-block text-[10px] font-bold text-amber-300">
                  PROPOSED EDGE UNIT
                </span>
              </div>
              <div className="zone-card">
                <Radio className="mb-3 text-emerald-400" />
                <h4 className="font-semibold">ESP32 / STM32</h4>
                <p className="mt-2 text-xs text-[#8297ac]">
                  Optional microcontroller nodes for auxiliary sensor
                  acquisition and telemetry.
                </p>
                <span className="mt-4 inline-block text-[10px] font-bold text-amber-300">
                  PROPOSED SENSOR NODES
                </span>
              </div>
              <div className="zone-card">
                <Activity className="mb-3 text-emerald-400" />
                <h4 className="font-semibold">Software telemetry</h4>
                <p className="mt-2 text-xs text-[#8297ac]">
                  Currently simulated data used to demonstrate the dashboard
                  workflow.
                </p>
                <span className="mt-4 inline-block text-[10px] font-bold text-emerald-300">
                  PROTOTYPE ACTIVE
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
