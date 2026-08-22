import CoolSlideGallery, {
  type CoolSlideGallerySlide,
} from "@/components/lightswind/cool-slide-gallery";

const systems: CoolSlideGallerySlide[] = [
  {
    title: "Sales & CRM Systems",
    subtitle: "Turn new leads into organized, actionable sales opportunities.",
    description: "Capture, qualify, enrich, and route every opportunity into a sales process your team can actually act on.",
    tags: ["Lead Capture", "CRM Pipelines", "Follow-ups"],
    badge: "01",
  },
  {
    title: "Lead Generation & Enrichment",
    subtitle: "Turn raw prospect data into a qualified sales pipeline.",
    description: "Research, enrich, score, and segment prospects before the right next step is routed to your team.",
    tags: ["Research", "Enrichment", "Lead Scoring"],
    badge: "02",
  },
  {
    title: "AI Assistants & Agents",
    subtitle: "Give your business an AI layer that can handle work, not just answer questions.",
    description: "Deploy frontline and internal agents that handle conversations, tasks, escalations, and the work between systems.",
    tags: ["Receptionists", "Support Agents", "AI Workflows"],
    badge: "03",
  },
  {
    title: "Client Onboarding & Operations",
    subtitle: "Move new clients from signed to fully onboarded.",
    description: "Coordinate intake, documents, welcome sequences, scheduling, workspace setup, and internal handoffs.",
    tags: ["Intake", "Documents", "Handoffs"],
    badge: "04",
  },
  {
    title: "Support & Inbox Systems",
    subtitle: "Make every conversation reach the right person with the right next step.",
    description: "Triage incoming requests, assist with replies, escalate when needed, and keep follow-ups moving.",
    tags: ["Triage", "AI Replies", "Routing"],
    badge: "05",
  },
  {
    title: "Appointment Systems",
    subtitle: "Automate the process around every booking.",
    description: "Connect scheduling, reminders, rescheduling, and confirmations so every appointment stays on track.",
    tags: ["Scheduling", "Reminders", "Rescheduling"],
    badge: "06",
  },
  {
    title: "Data, Reporting & Internal Tools",
    subtitle: "Turn scattered business data into clear visibility and useful action.",
    description: "Sync the data your team relies on, surface the metrics that matter, and build tools around the work.",
    tags: ["Data Sync", "Dashboards", "Internal AI"],
    badge: "07",
  },
];

export function WhatIBuild() {
  return (
    <section className="wb2-section wb2-gallery-section" aria-labelledby="build">
      <div className="wb2-head wb2-gallery-head">
        <div>
          <h2 id="build" className="wb2-gallery-title">What I build</h2>
          <p className="wb2-lede">
            I build connected business systems that capture information, move it through the right processes, and use automation + AI to make the next action happen automatically.
          </p>
        </div>
      </div>

      <CoolSlideGallery
        slides={systems}
        cardWidth={390}
        cardHeight={430}
        radius={1}
        tilt={10}
        sideTilt={4}
        gap={7}
        dimOpacity={66}
        autoplay={false}
        animationDuration={0.72}
        easing="smooth"
        showTitle={false}
        showBadge={false}
        showCounter
        showArrows
        showDots
        clickable
        draggable
        keyboardNavigation
        maxVisible={2}
        depth={190}
        scaleStep={0.12}
        perspective={1500}
        className="wb2-gallery"
      />
    </section>
  );
}
