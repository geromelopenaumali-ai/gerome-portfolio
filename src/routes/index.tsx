import { createFileRoute } from "@tanstack/react-router";
import { Award, Check, Copy, Maximize2 } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

const ContentRepurposingWorkflow = lazy(() =>
  import("../components/ContentRepurposingWorkflow").then((module) => ({ default: module.ContentRepurposingWorkflow })),
);
const AsanaCrmWorkflow = lazy(() =>
  import("../components/AsanaCrmWorkflow").then((module) => ({ default: module.AsanaCrmWorkflow })),
);
const LeadEnrichmentWorkflow = lazy(() =>
  import("../components/LeadEnrichmentWorkflow").then((module) => ({ default: module.LeadEnrichmentWorkflow })),
);
const BookingOnboardingWorkflow = lazy(() =>
  import("../components/BookingOnboardingWorkflow").then((module) => ({ default: module.BookingOnboardingWorkflow })),
);
import { PlatformBadge, type PlatformLogoKey } from "../components/PlatformLogo";
import { ProjectShowcase, type LivePreviewConfig } from "../components/ProjectShowcase";
import { WhatIBuild } from "../components/WhatIBuild";
import { HeroAutomationAnimation } from "../components/HeroAutomationAnimation";
import { WorkflowDeck } from "../components/WorkflowDeck";
import { BlurUpPicture } from "../components/BlurUpPicture";
import resumeFile from "../assets/resume.pdf.asset.json";
import { trackEvent } from "../lib/analytics";
import { img as responsiveImg } from "../lib/responsiveImages";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Lightbox } from "../components/Lightbox";
import { ShinyText } from "../components/lightswind/shiny-text";
import { scrollToTopWithLenis } from "../lib/lenis";

const EMAIL_ADDRESS = "geromelopenaumali@gmail.com";
const CALENDLY_URL = "https://calendly.com/geromelopenaumali/new-meeting";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gerome Umali — AI Automation Specialist" },
      {
        name: "description",
        content:
          "Automation vault of Gerome Umali: Zapier, Make, n8n and GoHighLevel systems that replace repetitive work with AI powered pipelines.",
      },
      { property: "og:title", content: "Gerome Umali — AI Automation Specialist" },
      {
        property: "og:description",
        content:
          "Automation vault of Gerome Umali: Zapier, Make, n8n and GoHighLevel systems that replace repetitive work with AI powered pipelines.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gerome Umali — AI Automation Specialist" },
      {
        name: "twitter:description",
        content:
          "Automation vault of Gerome Umali: Zapier, Make, n8n and GoHighLevel systems that replace repetitive work with AI powered pipelines.",
      },
    ],
    links: [],
  }),
  component: Index,
});

type WorkflowKey =
  | "content-repurposing"
  | "asana-crm"
  | "lead-enrichment"
  | "booking-onboarding"
  | "gmail-attachment"
  | "asana-xero"
  | "n8n-rag"
  | "n8n-support"
  | "n8n-lead"
  | "n8n-messenger";

type ToolProject = {
  index: string;
  title: string;
  description: string;
  stack: string[];
  steps?: string[];
  challenge?: string;
  solution?: string;
  value?: string;
  interactive?: WorkflowKey;
  ragPreview?: LivePreviewConfig;
  n8nPreview?: LivePreviewConfig;
  node?: string;
  direct?: {
    whatItDoes: string;
    howItWorks: string[];
    problemSolved: string;
    tools: string[];
  };
};


type ToolBlock = {
  key: PlatformLogoKey;
  name: string;
  tagline: string;
  accent: string;
  comingSoon?: boolean;
  projects: ToolProject[];
};

const toolBlocks: ToolBlock[] = [
  {
    key: "n8n",
    name: "n8n",
    tagline:
      "Automation systems that turn scattered information into searchable answers, reliable decisions, and clear next actions.",
    accent: "var(--accent-n8n)",
    projects: [
      {
        index: "01",
        title: "RAG AI Agent",
        description:
          "Turns new Google Drive documents into searchable knowledge and answers questions from the retrieved context.",
        stack: [
          "n8n — watches the folder and coordinates the workflow",
          "Google Drive — stores the knowledge-base documents",
          "OpenAI Embeddings — turns document and question text into searchable vectors",
          "Pinecone — stores and retrieves indexed context",
          "Google Gemini — generates the grounded response",
          "AI Agent Memory — keeps conversation context",
        ],
        steps: [
          "Watch the Google Drive knowledge-base folder and identify new files",
          "Download and parse each new source document",
          "Create document embeddings with OpenAI",
          "Store the indexed content in Pinecone",
          "Receive a user question through chat",
          "Embed the question and retrieve relevant context from Pinecone",
          "Use Gemini and conversation memory to generate a grounded response",
        ],
        challenge:
          "Teams waste time opening multiple documents to find one reliable answer.",
        solution:
          "An n8n workflow indexes new Google Drive files in Pinecone and gives the AI agent relevant context before it responds.",
        value:
          "People can ask the knowledge base directly and receive answers grounded in the latest indexed documents.",
        interactive: "n8n-rag",
          ragPreview: {
            heading: "RAG AI AGENT / LIVE PREVIEW",
            inputLabel: "Ask the knowledge base",
            defaultQuestion: "What is the latest knowledge-base update?",
            answer: "The workflow retrieves relevant context from the indexed knowledge base before preparing a grounded answer.",
            source: "Google Drive → Pinecone → Gemini",
            traceTitle: "RETRIEVAL TRACE",
            answerTitle: "GROUNDED RESPONSE",
            trace: [
              ["SEARCH", "Scanning the indexed knowledge base"],
              ["RETRIEVE", "Selecting relevant document context"],
              ["RESPOND", "Preparing a grounded answer"],
            ],
          },
        direct: {
          whatItDoes:
            "Turns new Google Drive documents into searchable knowledge and answers questions from the retrieved context.",
          howItWorks: [
            "Detects new documents in Google Drive.",
            "Downloads and parses the document content.",
            "Creates searchable embeddings with OpenAI.",
            "Stores the indexed content in Pinecone.",
            "Receives a user question.",
            "Retrieves relevant context from the knowledge base.",
            "Uses Gemini and conversation memory to generate the answer.",
          ],
          problemSolved:
            "People can ask one question instead of opening multiple files. The answer comes from the indexed knowledge base.",
          tools: [
            "n8n",
            "Google Drive",
            "OpenAI Embeddings",
            "Pinecone",
            "Google Gemini",
            "AI Agent Memory",
          ],
        },
        node: "ai",
      },
      {
        index: "02",
        title: "AI Customer Support Agent with Human Approval",
        description:
          "Drafts policy-based support replies and sends them only after manager approval.",
        stack: [
          "n8n — coordinates the support workflow",
          "Gmail — receives customer emails and sends approved replies",
          "Google Docs — stores store policies and FAQs",
          "Google Gemini — drafts the support response",
          "Telegram — provides the manager approval checkpoint",
          "AI Agent — uses the approved support content to prepare a reply",
          "Structured Output Parser — formats the subject and email body",
        ],
        steps: [
          "Watch Gmail for a new customer email and extract its context",
          "Load the store policies and FAQs from Google Docs",
          "Use Gemini to draft a structured customer-support reply",
          "Format the draft into an email subject and body",
          "Send the draft to a manager in Telegram for approval",
          "Check the approval result",
          "Send the approved reply to the customer through Gmail",
        ],
        challenge:
          "Support replies must be fast, accurate, and consistent with store policy.",
        solution:
          "n8n loads approved FAQs, drafts the reply with Gemini, and sends it to Telegram for review before Gmail delivery.",
        value:
          "The team gets faster drafts without giving up human approval.",
        interactive: "n8n-support",
        n8nPreview: {
          heading: "SUPPORT AGENT / LIVE PREVIEW",
          inputLabel: "Test a support request",
          defaultQuestion: "Draft a reply to a refund request.",
          answer: "The reply is drafted from approved policy content and held for manager approval before Gmail delivery.",
          source: "Gmail → Google Docs → Gemini → Telegram → Gmail",
          traceTitle: "WORKFLOW TRACE",
          answerTitle: "DRAFT READY",
          trace: [
            ["CLASSIFY", "Reading the incoming support request"],
            ["DRAFT", "Applying approved policy context"],
            ["APPROVE", "Waiting for manager sign-off"],
          ],
        },
      },
      {
        index: "03",
        title: "Lead Qualification, Enrichment & Sales Routing",
        description:
          "Validates, enriches, scores, and routes new leads to the right sales follow-up.",
        stack: [
          "n8n — coordinates validation, enrichment, scoring, and routing",
          "Webhooks — receives new lead submissions",
          "HTTP API — retrieves company context from the enrichment service",
          "JavaScript — normalizes data and applies scoring logic",
          "Google Sheets — logs qualified lead records",
          "Slack — alerts the sales team",
          "Gmail — sends priority-based email notifications",
        ],
        steps: [
          "Receive a new lead through a webhook, then validate required fields and normalize the data",
          "Retrieve company context from an enrichment service",
          "Score the lead using company size, revenue, and target-industry signals",
          "Assign high, medium, or low priority",
          "Log the qualified lead in Google Sheets",
          "Send urgent Slack and Gmail alerts for high-priority leads",
          "Send standard Slack and Gmail notifications for other priority levels",
        ],
        challenge:
          "Sales teams need a consistent way to prioritize new leads without reviewing every submission by hand.",
        solution:
          "One webhook starts validation, company enrichment, scoring, spreadsheet logging, and priority-based alerts.",
        value:
          "The sales team sees which opportunities need attention first and why.",
        interactive: "n8n-lead",
        n8nPreview: {
          heading: "LEAD ROUTER / LIVE PREVIEW",
          inputLabel: "Test a new lead",
          defaultQuestion: "Score a new SaaS lead from Acme.",
          answer: "The lead is enriched, scored, logged in Sheets, and routed to the appropriate Slack and Gmail alert path.",
          source: "Webhook → Enrichment API → Sheets → Slack / Gmail",
          traceTitle: "ROUTING TRACE",
          answerTitle: "ROUTE READY",
          trace: [
            ["VALIDATE", "Checking required lead fields"],
            ["ENRICH", "Adding company and firmographic context"],
            ["ROUTE", "Sending the priority-based alerts"],
          ],
        },
      },
      {
        index: "04",
        title: "Facebook Messenger AI Support Agent",
        description:
          "Answers Facebook Messenger questions from approved support content while keeping each customer’s conversation separate.",
        stack: [
          "n8n — coordinates webhook handling and support responses",
          "Meta Messenger API — receives and sends Messenger messages",
          "Webhooks — delivers incoming Messenger events",
          "Google Docs — stores the approved support knowledge base",
          "Google Gemini — generates the concise response",
          "AI Agent Memory — keeps separate context for each user",
          "HTTP API — supports the connected Messenger requests",
        ],
        steps: [
          "Receive Facebook Messenger webhook events",
          "Verify the Meta request, return the challenge value, and keep text messages for processing",
          "Load the approved support knowledge base from Google Docs",
          "Send the customer question and knowledge-base content to the AI agent",
          "Use Gemini to generate a concise, knowledge-grounded response",
          "Maintain separate conversation memory for each Messenger user",
          "Send the response back through the Meta Messenger API",
        ],
        challenge:
          "Messenger customers need fast answers that still follow approved support content.",
        solution:
          "n8n verifies the Messenger event, gives the AI agent the approved Google Docs content, and returns the response through Meta.",
        value:
          "Customers get quicker, more consistent replies without mixing conversation context.",
        interactive: "n8n-messenger",
        n8nPreview: {
          heading: "MESSENGER AGENT / LIVE PREVIEW",
          inputLabel: "Ask the support agent",
          defaultQuestion: "Where can I update my shipping address?",
          answer: "The agent uses approved support content and the customer thread context before sending a Messenger reply.",
          source: "Meta Webhook → Google Docs → Gemini → Messenger API",
          traceTitle: "MESSAGE TRACE",
          answerTitle: "REPLY READY",
          trace: [
            ["VERIFY", "Validating the Messenger event"],
            ["ANSWER", "Grounding the response in support content"],
            ["SEND", "Returning the reply through Meta"],
          ],
        },
      },
    ],
  },
  {
    key: "ghl",
    name: "GoHighLevel",
    tagline: "",
    accent: "var(--accent-ghl)",
    comingSoon: true,
    projects: [],
  },
  {
    key: "make",
    name: "Make",
    tagline: "Visual scenario builder for branching, high fanout automations.",
    accent: "var(--accent-make)",
    projects: [
      {
        index: "01",
        title: "Gmail Attachment Intelligence & Filing",
        description:
          "Analyzes Gmail attachments, gives them clear names, stores them in Google Drive, and logs the result.",
        stack: [
          "Gmail — receives messages and attachments",
          "Google Gemini — analyzes files and suggests clear filenames",
          "Google Drive — stores the processed attachments",
          "Google Sheets — records the saved files",
        ],
        steps: [
          "Watch incoming Gmail emails and identify attached media",
          "Send the file to Gemini for analysis and clear filename generation",
          "Upload the renamed attachment to Google Drive",
          "Log the saved attachment in Google Sheets",
          "Send an email notification with the processing result",
        ],
        challenge:
          "Email attachments can be hard to name, find, and track manually.",
        solution:
          "Make connects Gmail intake, Gemini analysis, Drive storage, Sheets logging, and notification steps.",
        value:
          "Files become easier to find and the inbox-to-storage process needs less manual handling.",
        interactive: "gmail-attachment",
        n8nPreview: {
          heading: "ATTACHMENT ROUTER / LIVE PREVIEW",
          inputLabel: "Test an incoming attachment",
          defaultQuestion: "Process a new Gmail attachment.",
          answer: "The attachment is analyzed with Gemini, stored in Google Drive, logged in Sheets, and followed by an email notification.",
          source: "Gmail → Gemini → Google Drive → Sheets",
          traceTitle: "FILE TRACE",
          answerTitle: "FILE READY",
          trace: [
            ["WATCH", "Checking the incoming Gmail attachment"],
            ["ANALYZE", "Generating a clear filename with Gemini"],
            ["FILE", "Saving the file and logging the result"],
          ],
        },
      },
      {
        index: "02",
        title: "Asana Completed Task → Xero & Google Sheets Processing Workflow",
        description:
          "Moves completed Asana task data through Xero and Google Sheets, then returns the compiled result to Asana.",
        stack: [
          "Asana — triggers the workflow and receives the compiled attachment",
          "Xero — runs the accounting API action",
          "Google Sheets — stores, retrieves, and stages processing data",
          "Make Tools — routes, waits, iterates, and aggregates workflow data",
        ],
        steps: [
          "Watch for a completed task in Asana",
          "Run the Xero API action",
          "Route the workflow into two Google Sheets processing paths",
          "Iterate through the data and add records to Google Sheets",
          "Wait, retrieve the required range, and aggregate the relevant text or data",
          "Upload the compiled attachment to the relevant Asana task",
          "Clear the processed Google Sheets range",
        ],
        challenge:
          "Completed tasks can require manual handoffs between task management, accounting, and spreadsheets.",
        solution:
          "Make sends the completed task through Xero, two Sheets processing paths, and a final Asana update.",
        value:
          "The task keeps its supporting data, receives the compiled attachment, and clears the staging range when the work is complete.",
        interactive: "asana-xero",
        n8nPreview: {
          heading: "TASK PROCESSOR / LIVE PREVIEW",
          inputLabel: "Test a completed task",
          defaultQuestion: "Process a completed Asana task.",
          answer: "The task is routed through Xero and Google Sheets, aggregated, and returned to Asana with the compiled attachment.",
          source: "Asana → Xero → Sheets → Asana",
          traceTitle: "TASK TRACE",
          answerTitle: "TASK READY",
          trace: [
            ["WATCH", "Checking for a completed Asana task"],
            ["PROCESS", "Running the Xero and Sheets paths"],
            ["RETURN", "Uploading the compiled result to Asana"],
          ],
        },
      },
    ],
  },
  {
    key: "zapier",
    name: "Zapier",
    tagline: "Cross-app triggers and no-code glue for lean ops teams.",
    accent: "var(--accent-zapier)",
    projects: [
      {
        index: "01",
        title: "Content Repurposing",
        description:
          "Turns one MP4 in Google Drive into a transcription and reusable content for Facebook and LinkedIn.",
        stack: [
          "Google Drive — receives the source MP4 file",
          "OpenAI — generates the transcription and content",
          "Facebook — receives one publishing path",
          "LinkedIn — receives the other publishing path",
        ],
        steps: [
          "Watch a Google Drive folder for new files",
          "Continue only when the uploaded file matches the MP4 filter",
          "Use AI to generate a transcription and blog-post content",
          "Loop through the generated content items",
          "Publish the content through separate Facebook and LinkedIn paths",
        ],
        challenge:
          "Repurposing one video for several channels requires repetitive transcription, formatting, and publishing.",
        solution:
          "Zapier filters the Drive upload, generates the content with AI, loops through the results, and sends them to Facebook and LinkedIn.",
        value:
          "One long-form video can move into reusable social content without repeating the same production steps by hand.",
        interactive: "content-repurposing",
        node: "content",
        n8nPreview: {
          heading: "CONTENT ROUTER / LIVE PREVIEW",
          inputLabel: "Test a new video",
          defaultQuestion: "Repurpose a new MP4 from Google Drive.",
          answer: "The MP4 is filtered, transcribed and turned into content with AI, then routed to Facebook and LinkedIn publishing paths.",
          source: "Google Drive → OpenAI → Facebook / LinkedIn",
          traceTitle: "CONTENT TRACE",
          answerTitle: "CONTENT READY",
          trace: [
            ["WATCH", "Checking the new Google Drive file"],
            ["CREATE", "Generating transcription and reusable content"],
            ["PUBLISH", "Sending content to the social paths"],
          ],
        },
      },
      {
        index: "02",
        title: "Asana CRM Automation",
        description:
          "Uses each Asana task stage to trigger the right follow-up, folder, onboarding, or nurture action.",
        stack: [
          "Asana — stores the lead or customer stage",
          "Gmail — sends follow-up, onboarding, and nurture emails",
          "Google Drive — creates a lead folder for Ready to Start tasks",
          "OpenAI — generates personalized communication for Approved tasks",
        ],
        steps: [
          "Trigger when an Asana task is updated",
          "Route the task based on its status or condition",
          "Create a Google Drive lead folder for the Ready to Start path",
          "Send staged follow-up emails for No Response and Quoted paths",
          "Generate and send personalized communication for Approved tasks",
          "Send a recommendation or nurture email for Paid and Closed tasks",
        ],
        challenge:
          "Manual lead and customer updates can delay follow-ups and make communication inconsistent.",
        solution:
          "Zapier Paths read the Asana stage and trigger its matching file, email, onboarding, or nurture action.",
        value:
          "Every stage has a defined next action, from the first follow-up through onboarding and post-sale communication.",
        interactive: "asana-crm",
        node: "asana",
        n8nPreview: {
          heading: "CRM ROUTER / LIVE PREVIEW",
          inputLabel: "Test an updated task",
          defaultQuestion: "Run the next action for an Approved lead.",
          answer: "The Approved stage routes to personalized communication generated with OpenAI and sent through Gmail.",
          source: "Asana → Paths → OpenAI → Gmail",
          traceTitle: "STAGE TRACE",
          answerTitle: "NEXT ACTION READY",
          trace: [
            ["READ", "Checking the current Asana stage"],
            ["ROUTE", "Selecting the matching CRM path"],
            ["SEND", "Delivering the follow-up or onboarding action"],
          ],
        },
      },
      {
        index: "03",
        title: "Lead Enrichment",
        description:
          "Enriches Youform leads, routes them by priority, alerts the sales team, and sends the right Gmail follow-up.",
        stack: [
          "Youform — captures the lead submission",
          "Apollo — enriches the lead through its webhook",
          "Google Sheets — records high-priority leads",
          "Slack — alerts the sales team",
          "OpenAI — drafts the high-priority email",
          "Gmail — sends the sales email or internal notification",
        ],
        steps: [
          "Receive a lead from Youform and format the company URL",
          "Send the lead to an Apollo enrichment webhook",
          "Route the lead into High Priority or Low Priority paths",
          "Save high-priority leads to Google Sheets and notify the sales team in Slack",
          "Create an AI email draft and send it through Gmail for high-priority leads",
          "Send a Gmail notification for low-priority leads",
        ],
        challenge:
          "New leads may lack the company context needed for prioritization and relevant follow-up.",
        solution:
          "Zapier sends each submission through Apollo enrichment, priority routing, Sheets or Slack logging, and the correct Gmail path.",
        value:
          "The sales team gets more context and each lead follows the right next step.",
        interactive: "lead-enrichment",
        node: "lead",
        n8nPreview: {
          heading: "LEAD ENRICHER / LIVE PREVIEW",
          inputLabel: "Test a new lead",
          defaultQuestion: "Enrich and route a new Youform lead.",
          answer: "The lead is enriched through Apollo, routed by priority, logged or alerted, and sent through the correct Gmail path.",
          source: "Youform → Apollo → Sheets / Slack → Gmail",
          traceTitle: "LEAD TRACE",
          answerTitle: "LEAD READY",
          trace: [
            ["CAPTURE", "Receiving the Youform submission"],
            ["ENRICH", "Adding company context through Apollo"],
            ["ROUTE", "Selecting the priority-based follow-up path"],
          ],
        },
      },
    ],
  },
];


type ExperienceItem = {
  range: string;
  company: string;
  role: string;
  bullets: string[];
  award?: { label: string };
};

const experience: ExperienceItem[] = [
  {
    range: "Dec 2023 — May 2026",
    company: "GoDaddy: Technical & Sales Support",
    role: "Website Builder & Sales Consultant",
      bullets: [
        "Built and launched small-business websites end to end across domains, hosting, email, DNS, and on-page SEO.",
        "Diagnosed complex website, hosting, and email issues to protect uptime, deliverability, and customer trust.",
        "Paired hands-on web build expertise with consultative selling, tailored marketing strategies, and relevant hosting, security, and marketing tools.",
      ],
  },
  {
    range: "Dec 2022 — Dec 2023",
    company: "Walmart / Shopify: E-Commerce Account",
    role: "Retention & Sales Specialist",
        bullets: [
          "Helped launch a retention and sales program, owning save-the-customer conversations and sales conversion from day one.",
          "Engaged at-risk customers, uncovered objections, and closed with tailored offers.",
          "Sold membership benefits and value-added services while consistently hitting retention and sales quotas.",
          "Recognized as Top 1 Sales Agent, Q1 2023 (WMR Chat). Click the certificate to view.",
        ],
    award: { label: "View Certificate: Top 1 Sales Agent, Q1 2023" },
  },
  {
    range: "Sep 2022 — Dec 2022",
    company: "Walmart / Shopify: E-Commerce Account",
    role: "Subject Matter Expert (SME)",
      bullets: [
        "Promoted to SME in under 3 months for top-tier performance and product mastery.",
        "Coached and supported agents in real time, lifting QA scores and first-contact resolution.",
        "Owned complex escalations and resolved sensitive e-commerce issues quickly and cleanly.",
      ],
  },
  {
    range: "Jun 2022 — Sep 2022",
    company: "Walmart / Shopify: E-Commerce Account",
    role: "Customer Care Agent",
      bullets: [
        "Handled high-volume calls, email, and chat for a major e-commerce account with accuracy and speed.",
        "Delivered calm, empathetic support under pressure.",
      ],
  },
];

import type { LightboxShot } from "../components/Lightbox";

const pageImageMap: Record<string, string> = {
  aicontentrepurposing: "content-repurposing",
  asanacrmautomation: "asana-crm",
  leadenrichment: "lead-enrichment",
  gmailintegration: "gmail-attachment",
  Asanacompletedtask: "asana-xero",
  RAGagentport: "n8n-rag",
  customersupportAIagentrename: "n8n-support",
  leadqualifenrich: "n8n-lead",
  facebookmessagengeraisuppport: "n8n-messenger",
  featuredprojectAIreceptionist: "hazel-1",
  featuredprojectAIreceptionist2: "hazel-2",
};

const pageImage = (name: string) => {
  const responsive = responsiveImg(pageImageMap[name] ?? name);
  const previewClassName =
    name === "aicontentrepurposing" || name === "leadenrichment"
      ? "ab-shot-card--compact"
      : undefined;
  return {
    src: `/${name}.png`,
    webp: `/opt/page/${name}.webp`,
    avif: `/opt/page/${name}.avif`,
    placeholderWebp: responsive.placeholderWebp,
    placeholderAvif: responsive.placeholderAvif,
    width: responsive.width,
    height: responsive.height,
    previewClassName,
  };
};

const hazelShots: {
  url: string;
  webp: string;
  avif: string;
  placeholderWebp: string;
  placeholderAvif: string;
  width: number;
  height: number;
  alt: string;
}[] = [
  {
    ...pageImage("featuredprojectAIreceptionist"),
    url: "/featuredprojectAIreceptionist.png",
    alt: "n8n workflow canvas showing Flow 1 (check availability) and Flow 2 (book appointment) for the AI Receptionist Hazel",
  },
  {
    ...pageImage("featuredprojectAIreceptionist2"),
    url: "/featuredprojectAIreceptionist2.png",
    alt: "n8n workflow canvas showing Flow 3 (reschedule), Flow 4 (cancel) and Flow 5 (log call summary) for the AI Receptionist Hazel",
  },
];

const shots: Record<string, LightboxShot> = {
  "content-repurposing": {
    ...pageImage("aicontentrepurposing"),
    alt: "Zapier workflow: Google Drive file triggers a filter, AI transcription and blog post generation, then loops and splits into two paths posting to Facebook Pages and LinkedIn",
  },
  "asana-crm": {
    ...pageImage("asanacrmautomation"),
    alt: "Zapier workflow: Asana task stages fan out through Paths into lead intake, follow-ups, onboarding and nurture pipelines",
  },
  "lead-enrichment": {
    ...pageImage("leadenrichment"),
    alt: "Zapier workflow: form submission is parsed, enriched via Apollo, split by priority, then routed to Sheets, Slack, AI draft and Gmail",
  },
  "gmail-attachment": {
    ...pageImage("gmailintegration"),
    alt: "Make scenario: a Gmail trigger watches emails, lists attachments, uploads the file to Gemini for analysis and filename generation, stores it in Google Drive, logs it in Google Sheets and sends an email notification",
  },
  "asana-xero": {
    ...pageImage("Asanacompletedtask"),
    alt: "Make scenario: completed Asana tasks trigger a Xero API call, then a router splits into an iterator that adds Google Sheets rows and a path that waits, reads a sheet range, aggregates text, uploads the attachment to Asana and clears the range",
  },
  "n8n-rag": {
    ...pageImage("RAGagentport"),
    alt: "n8n workflow canvas: a knowledge ingestion group watches a Google Drive folder, downloads and parses new files, generates OpenAI embeddings and stores them in Pinecone, while a retrieval-augmented chat group sends user questions to an AI agent that uses Gemini, memory and a Pinecone retrieval tool",
  },
  "n8n-support": {
    ...pageImage("customersupportAIagentrename"),
    alt: "n8n workflow canvas: a Gmail trigger feeds an AI agent that drafts a support reply using Gemini, Google Docs policies and a structured output parser, then a Telegram approval step decides whether the reply is sent back through Gmail",
  },
  "n8n-lead": {
    ...pageImage("leadqualifenrich"),
    alt: "n8n workflow canvas: a webhook receives a new lead, validation and enrichment nodes normalize and expand the data, a scoring node sets priority, the lead is logged in Google Sheets and a router sends high or standard priority Slack and Gmail alerts",
  },
  "n8n-messenger": {
    ...pageImage("facebookmessagengeraisuppport"),
    alt: "n8n workflow canvas: a Meta webhook verification group returns the challenge value, while a support group filters text messages, loads the Google Docs knowledge base, answers with a Gemini AI agent using per-customer memory and sends the reply through the Messenger API",
  },
  "hazel-workflow-1": {
    ...pageImage("featuredprojectAIreceptionist"),
    alt: "n8n workflow canvas showing the AI Receptionist Hazel availability and appointment-booking flows",
  },
  "hazel-workflow-2": {
    ...pageImage("featuredprojectAIreceptionist2"),
    alt: "n8n workflow canvas showing the AI Receptionist Hazel rescheduling, cancellation, and call-summary logging flows",
  },
};


type ProjectImpact = {
  timeSaved: string;
  manualWork: string;
  errorReduction: string;
  clientBenefit: string;
  purpose?: string[];
};

// Placeholder value metrics — easy to swap for real client numbers.
const projectImpact: Record<string, ProjectImpact> = {
      "Content Repurposing": {
        timeSaved: "",
        manualWork: "",
        errorReduction: "",
        clientBenefit:
          "One video becomes reusable Facebook and LinkedIn content without repeating the same production steps by hand.",
  },
      "Asana CRM Automation": {
        timeSaved: "",
        manualWork: "",
        errorReduction: "",
        clientBenefit: "Every Asana stage has a defined follow-up, onboarding, or nurture action instead of relying on manual updates.",
  },
      "Lead Enrichment": {
        timeSaved: "",
        manualWork: "",
        errorReduction: "",
        clientBenefit: "Sales gets enriched lead context and a clear priority-based next step for every form submission.",
  },
      "Gmail Attachment Intelligence & Filing": {
        timeSaved: "",
        manualWork: "",
        errorReduction: "",
        clientBenefit:
          "Attachments move from inbox to named Drive files and logged records with less manual handling.",
  },
      "Asana Completed Task → Xero & Google Sheets Processing Workflow": {
        timeSaved: "",
        manualWork: "",
        errorReduction: "",
        clientBenefit:
          "Completed tasks carry their accounting and spreadsheet output back to Asana without manual handoffs.",
  },
      "RAG AI Agent": {
        timeSaved: "",
        manualWork: "",
        errorReduction: "",
        clientBenefit:
          "People ask one question instead of searching multiple files, with responses grounded in indexed knowledge.",
  },
      "AI Customer Support Agent with Human Approval": {
        timeSaved: "",
        manualWork: "",
        errorReduction: "",
        clientBenefit:
          "The team gets consistent support drafts faster while keeping a human approval checkpoint before delivery.",
  },
      "Lead Qualification, Enrichment & Sales Routing": {
        timeSaved: "",
        manualWork: "",
        errorReduction: "",
        clientBenefit:
          "Sales sees which opportunities need attention first and why, with context attached to each lead.",
  },
      "Facebook Messenger AI Support Agent": {
        timeSaved: "",
        manualWork: "",
        errorReduction: "",
        clientBenefit:
          "Customers get quicker, more consistent Messenger replies without mixing conversation context.",
  },
      "Booking to Onboarding": {
        timeSaved: "",
        manualWork: "",
        errorReduction: "",
        clientBenefit:
          "Move a booked call through payment, contract, and onboarding in one connected flow.",
  },
};

const defaultImpact: ProjectImpact = {
  timeSaved: "",
  manualWork: "",
  errorReduction: "",
  clientBenefit: "Connected steps that remove repetitive manual handoffs.",
};

const navSections = [
  {
    group: "Overview",
    links: [
      { id: "top", label: "About" },
      { id: "build", label: "What I Build" },
      { id: "projects", label: "Projects" },
    ],
  },
  {
    group: "Systems",
    links: [
      { id: "platform-n8n", label: "n8n" },
      { id: "platform-zapier", label: "Zapier" },
      { id: "platform-make", label: "Make" },
      { id: "platform-ghl", label: "GoHighLevel" },
    ],
  },
  {
    group: "Profile",
    links: [
      { id: "experience", label: "Experience" },
      { id: "contact", label: "Contact" },
    ],
  },
];

function Index() {
  const [openWorkflow, setOpenWorkflow] = useState<WorkflowKey | null>(null);
  const [lightbox, setLightbox] = useState<{
    shots: LightboxShot[];
    index: number;
  } | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [navCompact, setNavCompact] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const openLightbox = (shot: LightboxShot) => setLightbox({ shots: [shot], index: 0 });

  const stepLightbox = (delta: number) =>
    setLightbox((prev) =>
      prev
        ? { ...prev, index: (prev.index + delta + prev.shots.length) % prev.shots.length }
        : prev,
    );

  const [certOpen, setCertOpen] = useState(false);
  const [diagramZoomed, setDiagramZoomed] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const lockRef = useRef<{ id: string; until: number } | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLElement>(null);


  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  useEffect(() => {
    if (!mobileNavOpen) return;

    const previousOverflow = document.body.style.overflow;
    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileNavOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        mobileDrawerRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.requestAnimationFrame(() => {
      mobileDrawerRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      mobileMenuButtonRef.current?.focus();
    };
  }, [mobileNavOpen]);


  useEffect(() => {
    const ids = navSections.flatMap((g) => g.links.map((l) => l.id));

    // Resolve the *region* a nav id represents so an active state only lights up
    // while that section is really on screen (anchors alone have zero height).
    const regionFor = (id: string, el: HTMLElement): HTMLElement => {
      if (id === "top") {
        return (document.querySelector(".v-hero") as HTMLElement | null) ?? el;
      }
      return (
        (el.closest(".ab-platform, .wb2-section, section") as HTMLElement | null) ?? el
      );
    };

    // Sections (project platforms) mount after a short skeleton, so resolve the
    // elements on every pass instead of once on mount.
    const collect = () =>
      ids
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, el: regionFor(id, el) } : null;
        })
        .filter((v): v is { id: string; el: HTMLElement } => Boolean(v))
        .sort((a, b) =>
          a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
        );

    let raf = 0;
    let observed: HTMLElement[] = [];
    const io = new IntersectionObserver(() => schedule(), {
      threshold: [0, 0.15, 0.4, 0.75, 1],
    });

    const pick = () => {
      raf = 0;
      if (lockRef.current && Date.now() < lockRef.current.until) return;
      const els = collect();
      if (!els.length) return;

      if (
        els.length !== observed.length ||
        els.some((entry, i) => entry.el !== observed[i])
      ) {
        io.disconnect();
        els.forEach((entry) => io.observe(entry.el));
        observed = els.map((entry) => entry.el);
      }

      // The reading line sits just under the sticky header.
      const offset = 180;
      const viewport = window.innerHeight;

      let current = "";
      // 1. Section that straddles the reading line wins.
      for (const { id, el } of els) {
        const r = el.getBoundingClientRect();
        if (r.top - offset <= 0 && r.bottom - offset > 0) current = id;
      }

      // 2. Otherwise use the section with the largest visible area, so content
      //    between two nav sections never keeps the previous one lit.
      if (!current) {
        let best = 0;
        for (const { id, el } of els) {
          const r = el.getBoundingClientRect();
          const visible = Math.min(r.bottom, viewport) - Math.max(r.top, offset);
          if (visible > best) {
            best = visible;
            current = id;
          }
        }
      }

      // Top and bottom of the page snap to the first / last section.
      if (window.scrollY < 40) current = els[0].id;
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = els[els.length - 1].id;
      }
      if (current) setActiveSection(current);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(pick);
    };

    pick();
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setShowScrollTop(window.scrollY > window.innerHeight * 0.65);
      setNavCompact(window.scrollY > 44);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Hold the clicked item active while the smooth scroll passes other sections.
    lockRef.current = { id, until: Date.now() + (reduce ? 120 : 900) };
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setActiveSection(id);
    setMobileNavOpen(false);
  };




  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && scrollToTopWithLenis()) return;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const handleCopyEmail = async () => {
    const fallbackCopy = () => {
      const textarea = document.createElement("textarea");
      textarea.value = EMAIL_ADDRESS;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    };

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
      } else {
        fallbackCopy();
      }
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      fallbackCopy();
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1800);
    }
  };

  return (
    <div className="v-app" id="top">
      <button
        ref={mobileMenuButtonRef}
        className={`v-mobile-menu${mobileNavOpen ? " is-open" : ""}`}
        type="button"
        aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileNavOpen}
        aria-controls="mobile-site-navigation"
        onClick={() => setMobileNavOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <button
        type="button"
        className={`v-mobile-nav-backdrop${mobileNavOpen ? " is-open" : ""}`}
        aria-label="Close navigation"
        tabIndex={mobileNavOpen ? 0 : -1}
        onClick={() => setMobileNavOpen(false)}
      />
      <aside
        ref={mobileDrawerRef}
        id="mobile-site-navigation"
        className={`v-mobile-nav${mobileNavOpen ? " is-open" : ""}`}
        aria-label="Portfolio navigation"
        aria-hidden={!mobileNavOpen}
      >
        <div className="v-mobile-nav-head">
          <span>Navigation</span>
          <button type="button" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}>×</button>
        </div>
        <nav className="v-mobile-nav-tree" data-lenis-prevent>
          {navSections.map((group) => (
            <div className="v-mobile-nav-group" key={group.group}>
              <span>{group.group}</span>
              {group.links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={activeSection === link.id ? "true" : undefined}
                  className={activeSection === link.id ? "active" : ""}
                  onClick={(event) => {
                    event.preventDefault();
                    goToSection(link.id);
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
        <p className="v-mobile-nav-foot">Zapier · Make · n8n · GoHighLevel<br />status <b>available for work</b></p>
      </aside>

      {/* MAIN */}
      <main className="v-main">
        <header className={`v-top-nav${navCompact ? " is-compact" : ""}`}>
          <div className="v-top-nav-inner">
            <nav className="v-top-nav-links" aria-label="Primary navigation">
              {navSections
                .flatMap((group) => group.links)
                .filter((link) => ["top", "build", "projects", "experience", "contact"].includes(link.id))
                .map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    aria-current={activeSection === link.id ? "page" : undefined}
                    className={activeSection === link.id ? "is-active" : ""}
                    onClick={(event) => { event.preventDefault(); goToSection(link.id); }}
                  >
                    {link.label}
                  </a>
                ))}
            </nav>
          </div>
        </header>

        <article className="v-note">
          <div className="v-hero">
            <div>
              <h1 className="v-hero-headline" aria-label="Gerome Umali">
                <span
                  className="v-name-glow v-hero-word"
                  data-sweep="in"
                >
                  Gerome
                </span>{" "}
                <span
                  className="v-name-glow v-hero-word v-hero-word-last"
                  data-sweep="in"
                >
                  Umali
                </span>
              </h1>


                            <p className="v-hero-eyebrow v-hero-copy-line">
                AI AUTOMATION SPECIALIST
              </p>
              <p className="v-quote v-quote-highlight v-hero-subheadline v-hero-copy-line">
                I’m Gerome Umali, an AI Automation Specialist. I build practical AI-powered systems
                that reduce repetitive work, connect everyday tools, and help businesses operate more
                efficiently.
              </p>
              <p className="v-positioning v-hero-copy-line">
                My goal is simple: make complex processes feel effortless.
              </p>
              <div className="v-hero-platforms v-hero-copy-line" aria-label="Platforms and capabilities">
                automation · AI systems · connected tools · intelligent workflows
              </div>
              <div className="v-hero-actions" aria-label="Primary actions">
                <a className="v-link v-link-btn v-cta-primary magnetic-target" href="#contact">book a call <span aria-hidden="true">↗</span></a>
                <a className="v-link v-link-btn" href="#build">view systems <span aria-hidden="true">↓</span></a>
                <a
                  className="v-link v-link-btn"
                  href={resumeFile.url}
                  download="Gerome-Umali-Resume.pdf"
                >
                  résumé <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
            <HeroAutomationAnimation />
          </div>


          {/* WHAT I BUILD */}
          <WhatIBuild />

          <section className="v-how-work v-section" id="how-i-work" aria-labelledby="how-i-work-heading">
            <div className="v-how-work-heading">
              <p className="v-eyebrow">Working method</p>
              <h2 id="how-i-work-heading">How I work</h2>
              <p>I start with the repetitive handoff, then design the smallest useful system around it.</p>
            </div>
            <div className="v-how-work-grid">
              <article>
                <span>01</span>
                <h3>Map the friction</h3>
                <p>Find the repeated inputs, decisions, approvals, and handoffs that slow the work down.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Design the system</h3>
                <p>Connect the right tools, define the decision path, and keep human approval where it matters.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Make the next action clear</h3>
                <p>Build the workflow, test the edge cases, and document how the system should be operated.</p>
              </article>
            </div>
          </section>

          {/* FEATURED PROJECTS */}
          <section
            className="v-featured"
            id="featured-case-study"
            aria-labelledby="featured-projects"
            tabIndex={-1}
          >
            <div className="v-featured-grid">
              <div className="v-featured-col v-featured-col-copy">
                <p className="v-featured-section-kicker" id="featured-projects">Featured Project</p>
                <h2 className="v-featured-case-title">
                  <span className="v-featured-title-line">AI Receptionist</span>
                  <span className="v-featured-title-line">(<ShinyText text="Hazel" speed={2.8} />)</span>
                </h2>
                <p className="v-featured-intro">
                  Hazel answers appointment calls, checks availability, completes the next action, and records the outcome.
                </p>
                <p className="v-featured-label">Voice AI · Workflow Automation</p>
                <div className="v-featured-case-steps" aria-label="Case study summary">
                  <article className="v-featured-case-step">
                    <span className="v-featured-step-index">01</span>
                    <div>
                      <p className="v-featured-label">Problem</p>
                      <h3 className="v-featured-step-title">Missed calls create dead ends.</h3>
                      <p className="v-featured-step-copy">
                        When staff are busy, callers can be left waiting for an answer or a confirmed next step.
                      </p>
                    </div>
                  </article>
                  <article className="v-featured-case-step">
                    <span className="v-featured-step-index">02</span>
                    <div>
                      <p className="v-featured-label">System</p>
                      <h3 className="v-featured-step-title">AI handles the handoff.</h3>
                      <p className="v-featured-step-copy">
                        Hazel understands the request, checks the live schedule, completes the right action, and records what happened.
                      </p>
                    </div>
                  </article>
                  <article className="v-featured-case-step">
                    <span className="v-featured-step-index">03</span>
                    <div>
                      <p className="v-featured-label">Flow</p>
                      <h3 className="v-featured-step-title">Intent becomes an action.</h3>
                      <p className="v-featured-step-copy">
                        Hazel understands the caller, checks the live calendar, routes booking or reschedule actions, and logs the call outcome.
                      </p>
                    </div>
                  </article>
                  <article className="v-featured-case-step">
                    <span className="v-featured-step-index">04</span>
                    <div>
                      <p className="v-featured-label">Result</p>
                      <h3 className="v-featured-step-title">Every call reaches a next step.</h3>
                      <p className="v-featured-step-copy">
                        Appointments, reschedules, cancellations, and call outcomes move through one connected flow.
                      </p>
                    </div>
                  </article>
                </div>
              </div>

              <div className="v-featured-col v-featured-col-visual">
                <WorkflowDeck
                  title="n8n — AI Receptionist (Hazel)"
                  caption="Original n8n workflow build · AI Receptionist (Hazel)"
                  shots={hazelShots}
                  onOpen={(_shot, i) => {
                    trackEvent("featured_workflow_lightbox_open", {
                      section: "featured_projects",
                      project: "AI Receptionist (Hazel)",
                      image: `hazel-workflow-${i + 1}`,
                    });
                    setLightbox({
                      shots: hazelShots.map((s) => ({
                        src: s.url,
                        webp: s.webp,
                        avif: s.avif,
                        placeholderWebp: s.placeholderWebp,
                        placeholderAvif: s.placeholderAvif,
                        width: s.width,
                        height: s.height,
                        alt: s.alt,
                      })),
                      index: i,
                    });
                  }}
                />

                <div className="v-featured-rail">
                  <div className="v-featured-rail-block">
                    <p className="v-featured-label">Tools &amp; Technologies</p>
                    <div className="v-featured-tags">
                      {["Vapi", "n8n", "Google Calendar", "Airtable", "Deepgram"].map((t) => (
                        <span className="v-featured-tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                    <p className="v-featured-value">
                    <span className="v-featured-value-label">What changed</span>
                    One connected flow now carries caller intent to a confirmed appointment, reschedule, cancellation, or logged outcome.
                  </p>
                  <p className="v-featured-note">
                    Dedicated webhook paths handle availability, booking, rescheduling, cancellation, and call-result logging.
                  </p>
                </div>
              </div>
            </div>

          </section>

          {/* PROJECTS */}
          <ProjectShowcase
            blocks={toolBlocks}
            impacts={projectImpact}
            defaultImpact={defaultImpact}
            shots={shots}
            onOpenShot={openLightbox}
          />

          {/* EXPERIENCE */}
          <section className="v-section" id="experience" aria-labelledby="experience-h">
            <h2 id="experience-h">Experience</h2>
            <p className="v-experience-intro">
              Before building automation systems, I worked close to the problems they are meant to solve: support friction, unclear processes, technical handoffs, retention, and customer operations.
            </p>
            <div className="v-experience">
              {experience.map((e, index) => {
                const sharedAccount = e.company === "Walmart / Shopify: E-Commerce Account";
                const firstSharedRole = sharedAccount && index === 1;
                return (
                  <div className={`v-role${sharedAccount ? " v-role-shared-account" : ""}`} key={e.company + e.range}>
                    {firstSharedRole && (
                      <div className="v-role-group-label">
                        <span>ACCOUNT PROGRESSION</span>
                        <strong>{e.company}</strong>
                      </div>
                    )}
                    <div className="v-role-date">{e.range}</div>
                    <div className="v-role-title">{e.role}</div>
                    {!sharedAccount && <div className="v-role-sub">{e.company}</div>}
                    <ul>
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    {e.award && (
                      <button type="button" className="v-award" onClick={() => setCertOpen(true)}>
                        <Award className="h-3 w-3" />
                        {e.award.label}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>


          {/* CONTACT */}
          <section className="v-contact v-contact-terminal" id="contact" aria-labelledby="contact-heading">
            <div className="v-contact-grid">
              <div className="v-contact-copy">
                <div className="v-eyebrow">Next system</div>
                <h3 id="contact-heading" className="v-contact-heading">Bring me the work that repeats. I’ll turn it into a system.</h3>
                <p className="v-contact-bridge">
                  Bring me one repetitive process. I’ll map the handoffs, define the useful automation,
                  and document the system clearly so the next action is easier to run.
                </p>
                <div className="v-email-row">
                  <a className="v-contact-email" href={`mailto:${EMAIL_ADDRESS}`}>
                    {EMAIL_ADDRESS}
                  </a>
                  {emailCopied && <span className="v-copy-tooltip" role="status">Copied!</span>}
                  <button
                    type="button"
                    className="v-link v-link-btn v-copy-email magnetic-target"
                    onClick={handleCopyEmail}
                    aria-label={emailCopied ? "Email copied" : "Copy email address"}
                  >
                    <span className={`v-copy-icon${emailCopied ? " is-copied" : ""}`} aria-hidden="true">
                      {emailCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                </div>
                <div className="v-links v-contact-links">
                  <a
                    className="v-link v-link-btn"
                    href={resumeFile.url}
                    download="Gerome-Umali-Resume.pdf"
                  >
                    résumé <span aria-hidden="true">↓</span>
                  </a>
                  <a
                    className="v-link v-link-btn"
                    href="https://www.linkedin.com/in/gerome-umali/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Gerome Umali on LinkedIn"
                  >
                    linkedin <span aria-hidden="true">↗</span>
                  </a>
                </div>

              </div>
              <div className="v-calendly-shell">
                <div className="v-calendly-intro">
                  <span className="v-calendly-kicker">Book a time</span>
                  <p>Choose a time that works for you and let’s identify the next useful automation.</p>
                </div>
                <a
                  className="v-link v-link-btn v-calendly-link"
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Book a call with Gerome Umali on Calendly"
                >
                  Open Calendly <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </section>

          <footer className="v-note-footer">
            <a className="magnetic-target" href="#top">Back to top ↑</a>
          </footer>
        </article>
      </main>

      <button
        type="button"
        className={`v-scroll-top${showScrollTop ? " is-visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        aria-hidden={!showScrollTop}
        tabIndex={showScrollTop ? 0 : -1}
      >
        <span aria-hidden="true">↑</span>
      </button>

      {/* CERTIFICATE */}
      <Dialog open={certOpen} onOpenChange={setCertOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Top 1 Sales Agent — Q1 2023 (WMR Chat)</DialogTitle>
            <DialogDescription>
              Circle of Excellence award from the Walmart / Shopify E-Commerce Account for
              leading sales performance in Q1 2023.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-hidden border border-border bg-background/60">
            <img
              src="/certificate-top-agent.jpg"
              alt="Circle of Excellence certificate recognizing Gerome Umali as Top 1 Agent for Quarter 1 of 2023"
              className="block h-auto max-h-[70vh] w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* WORKFLOW */}
      <Dialog open={openWorkflow !== null} onOpenChange={(o) => !o && setOpenWorkflow(null)}>
        {(() => {
          const isGhl = openWorkflow === "booking-onboarding";
          const accentVar = isGhl ? "var(--accent-ghl)" : "var(--accent-zapier)";
          const dialogPlatform: PlatformLogoKey = isGhl ? "ghl" : "zapier";
          const toolLabel = isGhl ? "/ GoHighLevel Workflow" : "/ Zapier Workflow";
          const title =
            openWorkflow === "asana-crm"
              ? "Asana CRM Automation"
              : openWorkflow === "lead-enrichment"
                ? "Lead Enrichment"
                : openWorkflow === "booking-onboarding"
                  ? "Booking to Onboarding"
                  : "Content Repurposing";
          const description =
            openWorkflow === "asana-crm"
              ? "Asana stages trigger the matching Zapier Path for lead intake, follow-up, onboarding, or customer nurture."
              : openWorkflow === "lead-enrichment"
                ? "Form submissions are enriched through Apollo, split by priority, and routed to Sheets, Slack, or the correct Gmail path."
                : openWorkflow === "booking-onboarding"
                  ? "A booking triggers confirmation, payment, contract signing, onboarding, workspace creation, and a Slack handoff after payment."
                  : "A Drive video is filtered, transcribed, expanded into content, and published through Facebook and LinkedIn paths.";
          return (
            <DialogContent
              className={`border-border bg-card p-0 ${openWorkflow === "asana-crm" ? "max-w-[95vw] data-[state=open]:max-w-[95vw]" : "max-w-3xl data-[state=open]:max-w-5xl"}`}
              style={{ ["--tool-accent" as string]: accentVar }}
            >
              <div
                className="border-b border-border p-6"
                style={{ borderColor: `color-mix(in oklab, ${accentVar} 30%, transparent)` }}
              >
                <DialogHeader>
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                    <PlatformBadge platform={dialogPlatform} size="sm" accentVar={accentVar} />
                    <div className="min-w-0">
                      <p
                        className="font-mono text-[11px] uppercase tracking-[0.25em]"
                        style={{ color: accentVar }}
                      >
                        {toolLabel}
                      </p>
                      <DialogTitle
                        className="mt-1 text-2xl font-bold tracking-tight text-foreground"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {title}
                      </DialogTitle>
                    </div>
                  </div>
                  <DialogDescription className="mt-3 max-w-[70ch] text-pretty text-sm leading-[1.7] tracking-[0.005em] text-muted-foreground">
                    {description}
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="scrollbar-themed max-h-[70vh] overflow-y-auto bg-[#05060a] p-4 md:p-6" data-lenis-prevent>
                <Suspense
                  fallback={
                    <div className="flex min-h-[220px] items-center justify-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      Loading flow diagram…
                    </div>
                  }
                >
                  {(() => {
                  const shot = openWorkflow ? shots[openWorkflow] : undefined;
                  const Diagram =
                    openWorkflow === "content-repurposing"
                      ? ContentRepurposingWorkflow
                      : openWorkflow === "asana-crm"
                        ? AsanaCrmWorkflow
                        : openWorkflow === "lead-enrichment"
                          ? LeadEnrichmentWorkflow
                          : BookingOnboardingWorkflow;

                  if (!shot) {
                    return (
                      <div className="mx-auto w-full max-w-[560px]">
                        <Diagram />
                      </div>
                    );
                  }

                  const isWide = openWorkflow === "asana-crm";

                  return (
                    <div
                      className={`mx-auto flex w-full flex-col gap-5 ${isWide ? "max-w-[1500px]" : "max-w-[1100px] lg:flex-row lg:items-start"}`}
                    >
                      <button
                        type="button"
                        onClick={() => openLightbox(shot)}
                        aria-label="Open full size screenshot"
                        className="min-w-0 flex-1 cursor-zoom-in overflow-hidden rounded-xl border border-border/60 bg-white"
                      >
                        <BlurUpPicture
                          src={shot.src}
                          avif={shot.avif}
                          webp={shot.webp}
                          placeholderAvif={shot.placeholderAvif}
                          placeholderWebp={shot.placeholderWebp}
                          width={shot.width ?? 1280}
                          height={shot.height ?? 720}
                          alt={shot.alt}
                          className="w-full"
                        />
                      </button>

                      <aside
                        className={`w-full shrink-0 ${isWide ? "mx-auto max-w-[420px]" : "lg:w-[260px]"}`}
                      >
                        <button
                          type="button"
                          onClick={() => setDiagramZoomed(true)}
                          aria-label="View the flow diagram in a bigger scale"
                          className="group relative block w-full cursor-zoom-in rounded-xl border border-border/60 bg-[#0a0c12] p-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--tool-accent)] hover:shadow-[0_0_24px_-6px_var(--tool-accent)]"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <p
                              className="font-mono text-[10px] uppercase tracking-[0.25em]"
                              style={{ color: accentVar }}
                            >
                              / Flow Diagram
                            </p>
                            <span
                              className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                              style={{ color: accentVar }}
                            >
                              <Maximize2 className="h-3 w-3" /> Expand
                            </span>
                          </div>
                          <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                            <Diagram />
                          </div>
                        </button>
                      </aside>
                    </div>
                  );
                  })()}
                </Suspense>
              </div>
            </DialogContent>
          );
        })()}
      </Dialog>

      <Dialog open={diagramZoomed} onOpenChange={setDiagramZoomed}>
        <DialogContent
          className="max-w-3xl border-border bg-card p-0"
          style={{ ["--tool-accent" as string]: "var(--accent-zapier)" }}
        >
          <div className="border-b border-border p-5">
            <DialogHeader>
              <DialogTitle
                className="text-xl font-bold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {openWorkflow === "asana-crm"
                  ? "Asana CRM Automation — Flow Diagram"
                  : openWorkflow === "lead-enrichment"
                    ? "Lead Enrichment — Flow Diagram"
                    : "Content Repurposing — Flow Diagram"}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {openWorkflow === "asana-crm"
                  ? "The full animated flow, from Asana task stage to follow-ups, onboarding and nurture."
                  : openWorkflow === "lead-enrichment"
                    ? "The full animated flow, from form submission to enrichment and priority routing."
                    : "The full animated flow, from Drive trigger to Facebook and LinkedIn publishing."}
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="scrollbar-themed max-h-[75vh] overflow-y-auto bg-[#05060a] p-4 md:p-6" data-lenis-prevent>
            <div
              className={
                openWorkflow === "asana-crm"
                  ? "mx-auto w-full max-w-[1000px]"
                  : "mx-auto w-full max-w-[620px]"
              }
            >
              <Suspense
                fallback={
                  <div className="flex min-h-[220px] items-center justify-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Loading flow diagram…
                  </div>
                }
              >
                {openWorkflow === "asana-crm" ? (
                  <AsanaCrmWorkflow />
                ) : openWorkflow === "lead-enrichment" ? (
                  <LeadEnrichmentWorkflow />
                ) : (
                  <ContentRepurposingWorkflow />
                )}
              </Suspense>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      

      {/* IMAGE LIGHTBOX */}
      {lightbox && (
        <Lightbox
          shots={lightbox.shots}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onSelect={(i: number) => setLightbox((prev) => (prev ? { ...prev, index: i } : prev))}
        />
      )}

    </div>

  );
}
