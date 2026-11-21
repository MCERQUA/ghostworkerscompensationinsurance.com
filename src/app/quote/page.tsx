"use client";

import { useState } from "react";
import { OwnersFieldset } from "@/components/forms/OwnersFieldset";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle,
  AlertCircle,
  Phone,
  Lock,
  Clock,
  Send,
  Star,
  FileText,
  Globe,
} from "lucide-react";
import { submitLead } from "@/lib/submit-lead";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

const COVERAGE_OPTIONS = [
  "Ghost Workers Comp Policy",
  "Audit Protection",
  "Employer Liability",
  "Payroll Fraud Coverage",
  "Independent Contractor Coverage",
  "Multi-State Coverage",
  "Not Sure / Need Advice",
];

const PAYROLL_RANGES = [
  "Under $50K",
  "$50K-$200K",
  "$200K-$500K",
  "$500K-$1M",
  "Over $1M",
];

const CURRENT_SITUATION_OPTIONS = [
  "Need ghost policy for contract",
  "Facing WC audit",
  "Employee misclassification concern",
  "Unreported payroll situation",
  "Just exploring coverage options",
];

interface FormData extends Record<string, string> {
  "bot-field": string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  state: string;
  coverageNeeded: string;
  numberOfEmployees: string;
  annualPayroll: string;
  currentSituation: string;
  message: string;
}

type AcordKind = "text" | "number" | "date" | "textarea" | "select" | "radio" | "fein" | "zip";
type AcordField = { name: string; label: string; kind: AcordKind; options?: string[][]; placeholder?: string; showIf?: [string, string]; maxLength?: number; numeric?: boolean };
// All ACORD intake fields below are OPTIONAL and must stay registered in public/__forms.html.
const ACORD_GROUPS: { title: string; desc: string; collapsible?: boolean; fields: AcordField[] }[] = [
  { title: "Business entity", desc: "Entity details for the application.", fields: [
    { name: "firstName", label: "First name", kind: "text" },
    { name: "lastName", label: "Last name", kind: "text" },
    { name: "dba", label: "DBA / trade name", kind: "text" },
    { name: "entityType", label: "Business entity type", kind: "select", options: [["Individual / Sole Proprietor", "Individual / Sole Proprietor"], ["Partnership", "Partnership"], ["Corporation", "Corporation"], ["S Corporation", "S Corporation"], ["LLC", "LLC"], ["Joint Venture", "Joint Venture"], ["Not For Profit", "Not For Profit"], ["Trust", "Trust"], ["Other", "Other"]] },
    { name: "entityTypeOther", label: "If other, describe", kind: "text" },
    { name: "fein", label: "Business FEIN (Federal Employer ID, 9 digits - never a Social Security number)", kind: "fein" },
    { name: "experienceMod", label: "Experience modification factor (if known)", kind: "text", placeholder: "e.g. 0.92 or 1.00" }
  ] },
  { title: "Mailing and physical location", desc: "Optional. Tell us if your mailing address differs from the business address above.", fields: [
    { name: "mailingSameAsPhysical", label: "Is your mailing address the same as the business address above?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "mailingAddress", label: "Mailing street address", kind: "text" },
    { name: "mailingCity", label: "Mailing city", kind: "text" },
    { name: "mailingState", label: "Mailing state", kind: "text" },
    { name: "mailingZip", label: "Mailing ZIP code", kind: "zip" },
    { name: "physicalCounty", label: "Business address county", kind: "text" }
  ] },
  { title: "Employees, payroll and operations", desc: "Optional detail used to rate workers' compensation.", fields: [
    { name: "fullTimeEmployees", label: "Full-time employees", kind: "number" },
    { name: "partTimeEmployees", label: "Part-time employees", kind: "number" },
    { name: "classPayroll1", label: "Annual payroll for class code 1 ($)", kind: "number" },
    { name: "classPayroll2", label: "Annual payroll for class code 2 ($)", kind: "number" },
    { name: "classPayroll3", label: "Annual payroll for class code 3 ($)", kind: "number" },
    { name: "classPayroll4", label: "Annual payroll for class code 4 ($)", kind: "number" },
    { name: "classPayroll5", label: "Annual payroll for class code 5 ($)", kind: "number" }
  ] },
  { title: "Subcontractors and certificates", desc: "Optional.", fields: [
    { name: "usesSubcontractors", label: "Do you use subcontractors?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "percentSubcontracted", label: "Percent of work subcontracted", kind: "number", placeholder: "25" },
    { name: "subsProvideCOI", label: "Do you collect certificates of insurance from your subcontractors?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "certificateHolderName", label: "Certificate holder name (if you need certificates issued)", kind: "text" },
    { name: "certificateHolderAddress", label: "Certificate holder address", kind: "text" },
    { name: "additionalInsuredNeeded", label: "Do you need additional insured or waiver of subrogation endorsements?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "additionalInsuredName", label: "Additional insured name and address", kind: "textarea" }
  ] },
  { title: "Coverage timing and history", desc: "Optional.", fields: [
    { name: "desiredEffectiveDate", label: "Desired policy effective date", kind: "date" },
    { name: "desiredExpirationDate", label: "Desired policy expiration date", kind: "date" },
    { name: "currentlyInsured", label: "Do you currently have workers' compensation coverage?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "coverageTerminated", label: "Has any carrier cancelled or declined your workers' compensation in the past 3 years?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "coverageTerminatedExplanation", label: "Please explain: which carrier, when, and why", kind: "textarea", showIf: ["coverageTerminated", "Yes"] },
    { name: "carrierNonRenewing", label: "Is your current carrier non-renewing?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "carrierNonRenewingExplanation", label: "Please explain: what reason did the carrier give?", kind: "textarea", showIf: ["carrierNonRenewing", "Yes"] },
    { name: "lossesLast3Years", label: "Any workers' compensation claims or losses in the last 3 years?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "lossCount", label: "Number of losses", kind: "number" },
    { name: "lossDate", label: "Date of most recent loss", kind: "date" },
    { name: "lossLineOfBusiness", label: "Line of business of most recent loss", kind: "text", placeholder: "Workers compensation" },
    { name: "lossDescription", label: "Describe the most recent loss", kind: "textarea" },
    { name: "lossAmountPaid", label: "Amount paid ($)", kind: "number", placeholder: "0 if none" },
    { name: "lossAmountReserved", label: "Amount reserved ($)", kind: "number", placeholder: "0 if none" },
    { name: "lossHistoryStatus", label: "Is that claim open or closed?", kind: "radio", options: [["Open", "Open"], ["Closed", "Closed"]] },
    { name: "lossAdditional", label: "Any other losses (date, type, amount, status)", kind: "textarea" }
  ] },
  { title: "Contacts and identifiers", desc: "Optional. Helps the carrier reach the right person. Do not enter Social Security numbers anywhere on this form.", fields: [
    { name: "businessWebsite", label: "Business website", kind: "text", placeholder: "https://" },
    { name: "secondaryPhone", label: "Secondary phone", kind: "text" },
    { name: "sicCode", label: "SIC code (if known)", kind: "text" },
    { name: "naicsCode", label: "NAICS code (if known)", kind: "text" },
    { name: "ncciRiskId", label: "NCCI risk ID or state rating bureau number (if you have one)", kind: "text" },
    { name: "inspectionContactName", label: "Contact for premises inspection", kind: "text" },
    { name: "inspectionContactPhone", label: "Inspection contact phone", kind: "text" },
    { name: "accountingContactName", label: "Billing / audit contact", kind: "text" },
    { name: "accountingContactPhone", label: "Billing / audit contact phone", kind: "text" },
    { name: "claimContactName", label: "Claims contact", kind: "text" },
    { name: "claimContactPhone", label: "Claims contact phone", kind: "text" }
  ] },
  { title: "Coverage limits and prior premium", desc: "Optional.", fields: [
    { name: "employersLiabilityLimit", label: "Employers liability limits requested (each accident / disease policy / disease each employee)", kind: "select", options: [["100/500/100", "$100,000 / $500,000 / $100,000"], ["500/500/500", "$500,000 / $500,000 / $500,000"], ["1000/1000/1000", "$1,000,000 / $1,000,000 / $1,000,000"], ["Other", "Other / not sure"]] },
    { name: "elEachAccident", label: "Employers liability: each accident", kind: "select", options: [["100,000", "100,000"], ["500,000", "500,000"], ["1,000,000", "1,000,000"]] },
    { name: "elDiseasePolicy", label: "Employers liability: disease, policy limit", kind: "select", options: [["100,000", "100,000"], ["500,000", "500,000"], ["1,000,000", "1,000,000"]] },
    { name: "elDiseaseEachEmployee", label: "Employers liability: disease, each employee", kind: "select", options: [["100,000", "100,000"], ["500,000", "500,000"], ["1,000,000", "1,000,000"]] },
    { name: "priorPremium", label: "Annual premium on your current or most recent policy ($)", kind: "number" },
    { name: "priorExperienceMod", label: "Experience modification factor on your current or most recent policy", kind: "text", placeholder: "e.g. 0.85" },
    { name: "priorYear1Year", label: "Year 1: policy year (current or most recent)", kind: "text", placeholder: "e.g. 2025", maxLength: 4, numeric: true }
  ] },
  { title: "Prior years 2 to 5", desc: "Optional. Carrier, premium, experience mod and claims for each earlier policy year. Enter 0 if there were no claims.", collapsible: true, fields: [
    { name: "priorYear2Year", label: "Year 2: policy year", kind: "text", placeholder: "e.g. 2023" },
    { name: "priorYear2Carrier", label: "Year 2: carrier name", kind: "text" },
    { name: "priorYear2Premium", label: "Year 2: premium ($)", kind: "number" },
    { name: "priorYear2Mod", label: "Year 2: experience mod", kind: "text", placeholder: "e.g. 0.85" },
    { name: "priorYear2ClaimCount", label: "Year 2: number of claims", kind: "number", placeholder: "0 if none" },
    { name: "priorYear2Paid", label: "Year 2: amount paid ($)", kind: "number", placeholder: "0 if none" },
    { name: "priorYear2Reserved", label: "Year 2: amount reserved ($)", kind: "number", placeholder: "0 if none" },
    { name: "priorYear3Year", label: "Year 3: policy year", kind: "text", placeholder: "e.g. 2023" },
    { name: "priorYear3Carrier", label: "Year 3: carrier name", kind: "text" },
    { name: "priorYear3Premium", label: "Year 3: premium ($)", kind: "number" },
    { name: "priorYear3Mod", label: "Year 3: experience mod", kind: "text", placeholder: "e.g. 0.85" },
    { name: "priorYear3ClaimCount", label: "Year 3: number of claims", kind: "number", placeholder: "0 if none" },
    { name: "priorYear3Paid", label: "Year 3: amount paid ($)", kind: "number", placeholder: "0 if none" },
    { name: "priorYear3Reserved", label: "Year 3: amount reserved ($)", kind: "number", placeholder: "0 if none" },
    { name: "priorYear4Year", label: "Year 4: policy year", kind: "text", placeholder: "e.g. 2023" },
    { name: "priorYear4Carrier", label: "Year 4: carrier name", kind: "text" },
    { name: "priorYear4Premium", label: "Year 4: premium ($)", kind: "number" },
    { name: "priorYear4Mod", label: "Year 4: experience mod", kind: "text", placeholder: "e.g. 0.85" },
    { name: "priorYear4ClaimCount", label: "Year 4: number of claims", kind: "number", placeholder: "0 if none" },
    { name: "priorYear4Paid", label: "Year 4: amount paid ($)", kind: "number", placeholder: "0 if none" },
    { name: "priorYear4Reserved", label: "Year 4: amount reserved ($)", kind: "number", placeholder: "0 if none" },
    { name: "priorYear5Year", label: "Year 5: policy year", kind: "text", placeholder: "e.g. 2023" },
    { name: "priorYear5Carrier", label: "Year 5: carrier name", kind: "text" },
    { name: "priorYear5Premium", label: "Year 5: premium ($)", kind: "number" },
    { name: "priorYear5Mod", label: "Year 5: experience mod", kind: "text", placeholder: "e.g. 0.85" },
    { name: "priorYear5ClaimCount", label: "Year 5: number of claims", kind: "number", placeholder: "0 if none" },
    { name: "priorYear5Paid", label: "Year 5: amount paid ($)", kind: "number", placeholder: "0 if none" },
    { name: "priorYear5Reserved", label: "Year 5: amount reserved ($)", kind: "number", placeholder: "0 if none" }
  ] },
  { title: "Workers' compensation questions", desc: "Optional. Answer Yes or No; add a short explanation for any Yes.", fields: [
    { name: "yn_foreignCoverage", label: "Do you need Foreign coverage?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "yn_voluntaryComp", label: "Do you want Voluntary Compensation coverage?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "yn_uslh", label: "Do you need U.S. Longshore and Harbor Workers (USL&H) coverage?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "yn_aircraftWatercraft", label: "Do you own, operate or lease aircraft or watercraft?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_aircraftWatercraft", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_aircraftWatercraft", "Yes"] },
    { name: "yn_hazardousMaterial", label: "Do past, present or discontinued operations involve storing, treating, discharging, applying, disposing of or transporting hazardous material?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_hazardousMaterial", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_hazardousMaterial", "Yes"] },
    { name: "yn_undergroundOrHeights", label: "Is any work performed underground or above 15 feet?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_undergroundOrHeights", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_undergroundOrHeights", "Yes"] },
    { name: "yn_overWaterWork", label: "Is any work performed on barges, vessels, docks or bridges over water?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_overWaterWork", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_overWaterWork", "Yes"] },
    { name: "yn_otherBusiness", label: "Are you engaged in any other type of business?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_otherBusiness", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_otherBusiness", "Yes"] },
    { name: "yn_subletWithoutCOI", label: "Is any work sublet without certificates of insurance?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_subletWithoutCOI", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_subletWithoutCOI", "Yes"] },
    { name: "yn_safetyProgram", label: "Is a written safety program in operation?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_safetyProgram", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_safetyProgram", "Yes"] },
    { name: "yn_groupTransportation", label: "Is any group transportation provided?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_groupTransportation", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_groupTransportation", "Yes"] },
    { name: "yn_minorsOrSeniors", label: "Any employees under 16 or over 60 years of age?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_minorsOrSeniors", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_minorsOrSeniors", "Yes"] },
    { name: "yn_seasonalEmployees", label: "Any seasonal employees?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_seasonalEmployees", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_seasonalEmployees", "Yes"] },
    { name: "yn_volunteerLabor", label: "Is there any volunteer or donated labor?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_volunteerLabor", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_volunteerLabor", "Yes"] },
    { name: "yn_physicalHandicaps", label: "Any employees with physical handicaps?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_physicalHandicaps", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_physicalHandicaps", "Yes"] },
    { name: "yn_outOfStateTravel", label: "Do employees travel out of state?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_outOfStateTravel", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_outOfStateTravel", "Yes"] },
    { name: "yn_athleticTeams", label: "Are athletic teams sponsored?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_athleticTeams", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_athleticTeams", "Yes"] },
    { name: "yn_physicalsRequired", label: "Are physicals required after offers of employment are made?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_physicalsRequired", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_physicalsRequired", "Yes"] },
    { name: "yn_otherInsuranceWithCarrier", label: "Any other insurance with this company?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_otherInsuranceWithCarrier", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_otherInsuranceWithCarrier", "Yes"] },
    { name: "yn_employeeHealthPlan", label: "Is an employee health plan provided?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_employeeHealthPlan", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_employeeHealthPlan", "Yes"] },
    { name: "yn_employeesOtherBusinesses", label: "Do any employees perform work for other businesses or subsidiaries?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_employeesOtherBusinesses", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_employeesOtherBusinesses", "Yes"] },
    { name: "yn_leasedEmployees", label: "Do you lease employees to or from other employers?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_leasedEmployees", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_leasedEmployees", "Yes"] },
    { name: "yn_workFromHome", label: "Do employees predominantly work from home?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_workFromHome", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_workFromHome", "Yes"] },
    { name: "yn_taxLiensBankruptcy", label: "Any tax liens or bankruptcy within the past 5 years?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_taxLiensBankruptcy", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_taxLiensBankruptcy", "Yes"] },
    { name: "yn_unpaidWCPremium", label: "Any undisputed and unpaid workers compensation premium due from you or any commonly owned or managed business?", kind: "radio", options: [["Yes", "Yes"], ["No", "No"]] },
    { name: "ynExplain_unpaidWCPremium", label: "Please explain (brief)", kind: "textarea", showIf: ["yn_unpaidWCPremium", "Yes"] }
  ] },
];
const ACORD_INITIAL: Record<string, string> = Object.fromEntries(ACORD_GROUPS.flatMap((g) => g.fields.map((f) => [f.name, ""])));


const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[rgba(154,52,18,0.2)] bg-white/80 text-[#2a211c] placeholder-[#a89a8c] focus:outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/20 transition-all text-sm";

const labelClass = "block text-sm font-semibold text-[#2a211c] mb-1.5";

const trustItems = [
  {
    icon: Globe,
    title: "Licensed All 50 States",
    desc: "We place coverage nationwide.",
  },
  {
    icon: Shield,
    title: "Ghost Policy Experts",
    desc: "20+ years of specialization.",
  },
  {
    icon: Star,
    title: "A-Rated Carriers",
    desc: "Admitted, financially stable markets.",
  },
  {
    icon: Clock,
    title: "Same-Day Response",
    desc: "We respond within hours.",
  },
  {
    icon: Lock,
    title: "No Obligation",
    desc: "Free quotes, no pressure.",
  },
  {
    icon: FileText,
    title: "Fast Certificates",
    desc: "Quick turnaround on COIs.",
  },
];

export default function QuotePage() {
  const [ownerFields, setOwnerFields] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    ...ACORD_INITIAL,
    "bot-field": "",
    name: "",
    businessName: "",
    email: "",
    phone: "",
    state: "",
    coverageNeeded: "",
    numberOfEmployees: "",
    annualPayroll: "",
    currentSituation: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData["bot-field"]) return;
    setSubmitting(true);
    setError("");
    try {
      // Uncontrolled legacy inputs are read from the DOM so they are captured too.
      const domFields: Record<string, string> = {};
      new FormData(e.currentTarget).forEach((v, k) => {
        if (typeof v === "string") domFields[k] = v;
      });
      const ok = await submitLead("quote", { ...domFields, ...formData, ...ownerFields });
      if (ok) setSubmitted(true);
      else setError("Something went wrong. Please call us at 844-967-5247.");
    } catch {
      setError("Something went wrong. Please call us at 844-967-5247.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#2a211c]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-[#9a3412] via-[#8a3410] to-[#7c2d12] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/20 blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/10 blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-amber-200" />
              <span className="text-amber-200 text-sm font-medium tracking-wide uppercase">
                Free Ghost WC Quote
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
            >
              Get Your Ghost Policy Quote
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-amber-100 text-lg max-w-xl mx-auto"
            >
              Tell us about your situation and we'll match you with the right
              coverage from an A-rated admitted carrier. No obligation, no pressure.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#fdf6ec] border border-[rgba(154,52,18,0.2)] rounded-2xl p-10 text-center"
                >
                  <div className="w-16 h-16 bg-[#9a3412] rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#2a211c] mb-3">
                    Quote Request Received!
                  </h2>
                  <p className="text-[#57493f] max-w-md mx-auto mb-6">
                    Thank you! A ghost WC specialist from Contractors Choice Agency
                    will review your request and contact you within one business day —
                    usually much sooner. For urgent needs, call us directly.
                  </p>
                  <a
                    href="tel:8449675247"
                    className="inline-flex items-center gap-2 bg-[#9a3412] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#8a3410] transition-colors shadow-lg"
                  >
                    <Phone className="w-4 h-4" />
                    844-967-5247
                  </a>
                </motion.div>
              ) : (
                <motion.div initial="hidden" animate="visible" variants={stagger}>
                  <motion.div variants={fadeUp} className="mb-6">
                    <h2 className="text-2xl font-extrabold text-[#2a211c] mb-2">
                      Request a Free Quote
                    </h2>
                    <p className="text-[#57493f] text-sm">
                      Complete the form below. The more detail you provide, the faster
                      we can build an accurate quote for your situation.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <form
                      data-netlify="true"
                      name="quote"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <input type="hidden" name="form-name" value="quote" />
                      {/* Honeypot */}
                      <div className="hidden" aria-hidden="true">
                        <input
                          name="bot-field"
                          value={formData["bot-field"]}
                          onChange={handleChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      {/* Personal info */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className={labelClass}>
                            Your Name <span className="text-[#9a3412]">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Jane Smith"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="businessName" className={labelClass}>
                            Business Name
                          </label>
                          <input
                            id="businessName"
                            name="businessName"
                            type="text"
                            placeholder="Smith Contracting LLC"
                            value={formData.businessName}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="email" className={labelClass}>
                            Email Address <span className="text-[#9a3412]">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="jane@smithcontracting.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className={labelClass}>
                            Phone Number <span className="text-[#9a3412]">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="(555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="state" className={labelClass}>
                          State of Coverage <span className="text-[#9a3412]">*</span>
                        </label>
                        <select
                          id="state"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Select your state...</option>
                          {US_STATES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      {/* Coverage details */}
                      <div className="pt-2 pb-1">
                        <div className="border-t border-[rgba(154,52,18,0.1)]" />
                        <p className="text-xs font-bold text-[#9a3412] uppercase tracking-wider mt-4 mb-1">
                          Coverage Details
                        </p>
                      </div>

                      <div>
                        <label htmlFor="coverageNeeded" className={labelClass}>
                          Coverage Needed <span className="text-[#9a3412]">*</span>
                        </label>
                        <select
                          id="coverageNeeded"
                          name="coverageNeeded"
                          required
                          value={formData.coverageNeeded}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Select coverage type...</option>
                          {COVERAGE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="numberOfEmployees" className={labelClass}>
                            Number of Employees
                          </label>
                          <input
                            id="numberOfEmployees"
                            name="numberOfEmployees"
                            type="text"
                            placeholder="0 (sole operator)"
                            value={formData.numberOfEmployees}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="annualPayroll" className={labelClass}>
                            Annual Payroll (Estimated)
                          </label>
                          <select
                            id="annualPayroll"
                            name="annualPayroll"
                            value={formData.annualPayroll}
                            onChange={handleChange}
                            className={inputClass}
                          >
                            <option value="">Select range...</option>
                            {PAYROLL_RANGES.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="currentSituation" className={labelClass}>
                          Your Current Situation
                        </label>
                        <select
                          id="currentSituation"
                          name="currentSituation"
                          value={formData.currentSituation}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Select what applies best...</option>
                          {CURRENT_SITUATION_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className={labelClass}>
                          Additional Details
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Any additional context about your situation, timeline, or specific requirements..."
                          value={formData.message}
                          onChange={handleChange}
                          className={inputClass + " resize-none"}
                        />
                      </div>

                      {error && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {error}
                        </div>
                      )}

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Business details</h3>
                          <p className="text-xs opacity-70 mt-0.5">What the business does and how long it has been running.</p>
                        </div>
                        <div><label className={labelClass}>Year business started</label><input type="text" name="yearBusinessStarted" placeholder="2015" className={inputClass} /></div>
                        <div><label className={labelClass}>Description of the business</label><textarea name="businessDescription" rows={3} placeholder="What the business does, day to day" className={inputClass} /></div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Annual gross sales</label><input type="text" name="annualGrossSales" placeholder="$1,200,000" className={inputClass} /></div>
                          <div><label className={labelClass}>Residential vs commercial split</label><input type="text" name="residentialVsCommercial" placeholder="70% residential / 30% commercial" className={inputClass} /></div>
                        </div>
                        <div><label className={labelClass}>New vs existing construction</label><input type="text" name="newVsExistingConstruction" placeholder="Mostly existing structures" className={inputClass} /></div>
                        <div><label className={labelClass}>Largest projects</label><textarea name="largestProjects" rows={3} placeholder="Three largest jobs in the last year — value and scope" className={inputClass} /></div>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Business address</h3>
                          <p className="text-xs opacity-70 mt-0.5">Where your operation is based.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Street address</label><input type="text" name="streetAddress" placeholder="123 Main St, Suite 200" className={inputClass} /></div>
                          <div><label className={labelClass}>City</label><input type="text" name="city" placeholder="Phoenix" className={inputClass} /></div>
                        </div>
                        <div><label className={labelClass}>ZIP code</label><input type="text" name="zip" placeholder="85001" className={inputClass} /></div>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Payroll and class codes</h3>
                          <p className="text-xs opacity-70 mt-0.5">Employees, payroll and how the work is classified.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Class code 1</label><input type="text" name="classCode1" placeholder="5403" className={inputClass} /></div>
                          <div><label className={labelClass}>Class code 2</label><input type="text" name="classCode2" placeholder="5645" className={inputClass} /></div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Class code 3</label><input type="text" name="classCode3" className={inputClass} /></div>
                          <div><label className={labelClass}>Class code 4</label><input type="text" name="classCode4" className={inputClass} /></div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Class code 5</label><input type="text" name="classCode5" className={inputClass} /></div>
                          <div><label className={labelClass}>Office vs field split</label><input type="text" name="officeVsFieldSplit" placeholder="2 office / 6 field" className={inputClass} /></div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Any clerical staff?</label><select name="hasClericalStaff" className={inputClass}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
                          <div><label className={labelClass}>Clerical staff — count and payroll</label><input type="text" name="clericalStaffCount" placeholder="2 clerical, $90,000 payroll" className={inputClass} /></div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Any outside sales staff?</label><select name="hasSalesStaff" className={inputClass}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
                          <div><label className={labelClass}>Sales staff — count and payroll</label><input type="text" name="salesStaffCount" placeholder="1 outside sales, $60,000 payroll" className={inputClass} /></div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Prior year</h3>
                          <p className="text-xs opacity-70 mt-0.5">Your last completed 12 months. Best estimates are fine.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Prior year gross sales</label><input type="text" name="priorYearGrossSales" placeholder="$1,200,000" className={inputClass} /></div>
                          <div><label className={labelClass}>Prior year subcontractor expenses</label><input type="text" name="priorYearSubcontractorExpenses" placeholder="$250,000" className={inputClass} /></div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Prior year employee count</label><input type="text" name="priorYearEmployeeCount" placeholder="8" className={inputClass} /></div>
                          <div><label className={labelClass}>Prior year employee payroll</label><input type="text" name="priorYearEmployeePayroll" placeholder="$400,000" className={inputClass} /></div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Next twelve months — estimates</h3>
                          <p className="text-xs opacity-70 mt-0.5">Projected figures for the coming policy period.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Estimated gross sales</label><input type="text" name="estimatedGrossSales" placeholder="$1,400,000" className={inputClass} /></div>
                          <div><label className={labelClass}>Estimated subcontractor expenses</label><input type="text" name="estimatedSubcontractorExpenses" placeholder="$300,000" className={inputClass} /></div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Estimated employee count</label><input type="text" name="estimatedEmployeeCount" placeholder="10" className={inputClass} /></div>
                          <div><label className={labelClass}>Estimated employee payroll</label><input type="text" name="estimatedEmployeePayroll" placeholder="$500,000" className={inputClass} /></div>
                        </div>
                        <div><label className={labelClass}>Estimated material costs</label><input type="text" name="estimatedMaterialCosts" placeholder="$180,000" className={inputClass} /></div>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Subcontractor insurance</h3>
                          <p className="text-xs opacity-70 mt-0.5">How subcontracted work is covered.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Do your subcontractors carry their own insurance?</label><select name="subcontractorsHaveInsurance" className={inputClass}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
                          <div><label className={labelClass}>Percentage of subcontractors insured</label><input type="text" name="percentSubcontractorsInsured" placeholder="100" className={inputClass} /></div>
                        </div>
                        <div><label className={labelClass}>Do you need coverage for uninsured subcontractors?</label><select name="coverageForUninsuredSubcontractors" className={inputClass}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Current or prior coverage</h3>
                          <p className="text-xs opacity-70 mt-0.5">Who covers you today, if anyone.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Current or prior carrier</label><input type="text" name="priorCarrierName" placeholder="Carrier name" className={inputClass} /></div>
                        </div>
                        <div><label className={labelClass}>Policy expiration date</label><input type="date" name="priorPolicyExpiration" className={inputClass} /></div>
                      </div>

                      {ACORD_GROUPS.map((g) => {
                        const Wrap = (g.collapsible ? "details" : "div") as "div";
                        return (
                        <Wrap key={g.title} className="space-y-4 pt-5 border-t border-adobe">
                          {g.collapsible ? (
                            <summary className="cursor-pointer font-heading font-bold text-sm uppercase tracking-wider">
                              {g.title} (optional, click to expand)
                              <span className="block text-xs font-normal normal-case tracking-normal opacity-70 mt-1">{g.desc}</span>
                            </summary>
                          ) : (
                          <div>
                            <h3 className="font-heading font-bold text-sm uppercase tracking-wider">{g.title}</h3>
                            <p className="text-xs opacity-70 mt-0.5">{g.desc}</p>
                          </div>
                          )}
                          <div className="grid sm:grid-cols-2 gap-4">
                            {g.fields.filter((f) => !f.showIf || formData[f.showIf[0]] === f.showIf[1]).map((f) => (
                              <div key={f.name} className={f.kind === "textarea" ? "sm:col-span-2" : ""}>
                                {f.kind === "radio" ? (
                                  <fieldset>
                                    <legend className={labelClass}>{f.label}</legend>
                                    <div className="flex gap-5">
                                      {f.options!.map(([v, l]) => (
                                        <label key={v} className="inline-flex items-center gap-2 text-sm">
                                          <input type="radio" name={f.name} value={v} checked={formData[f.name] === v} onChange={handleChange} />{l}
                                        </label>
                                      ))}
                                    </div>
                                  </fieldset>
                                ) : (
                                  <>
                                    <label htmlFor={f.name} className={labelClass}>{f.label}</label>
                                    {f.kind === "select" ? (
                                      <select id={f.name} name={f.name} value={formData[f.name]} onChange={handleChange} className={inputClass}><option value="">Select…</option>{f.options!.map(([v, l]) => (<option key={v} value={v}>{l}</option>))}</select>
                                    ) : f.kind === "textarea" ? (
                                      <textarea id={f.name} name={f.name} rows={3} maxLength={500} value={formData[f.name]} onChange={handleChange} placeholder={f.placeholder} className={`${inputClass} resize-none`} />
                                    ) : (
                                      <input id={f.name} name={f.name} type={f.kind === "date" ? "date" : f.kind === "number" ? "number" : "text"} min={f.kind === "number" ? 0 : undefined} inputMode={f.kind === "number" || f.kind === "zip" || f.numeric ? "numeric" : undefined} pattern={f.kind === "fein" ? "[0-9]{2}-?[0-9]{7}" : f.kind === "zip" ? "[0-9]{5}(-[0-9]{4})?" : undefined} title={f.kind === "fein" ? "9 digits, e.g. 12-3456789" : f.kind === "zip" ? "5-digit ZIP code" : undefined} maxLength={f.maxLength} placeholder={f.kind === "fein" ? "12-3456789" : f.placeholder} value={formData[f.name]} onChange={handleChange} className={inputClass} />
                                    )}
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </Wrap>
                        );
                      })}

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Owners and officers</h3>
                          <p className="text-xs opacity-70 mt-0.5">Each owner or officer to be included or excluded.</p>
                        </div>
                        <OwnersFieldset
                          inputClass={inputClass}
                          labelClass={labelClass}
                          buttonClass="inline-flex min-h-[44px] items-center gap-2 rounded-xl border-2 border-[#9a3412] px-5 py-2 text-sm font-semibold text-[#9a3412] hover:bg-[#9a3412]/5"
                          accentTextClass="text-[#9a3412]"
                          mutedTextClass="text-[#6b5e52]"
                          borderClass="border-[rgba(154,52,18,0.2)]"
                          onFieldsChange={setOwnerFields}
                        />
                      </div>

                      <p className="text-xs text-[#a89a8c] text-center">
                        By submitting this form you consent to be contacted by
                        Contractors Choice Agency regarding your insurance inquiry.
                        We never sell your information to third parties.
                      </p>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#9a3412] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#8a3410] active:bg-[#7c2d12] transition-colors shadow-lg shadow-[#9a3412]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Request My Free Quote
                          </>
                        )}
                      </button>

                    </form>
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Trust Sidebar */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-5"
            >
              {/* Call CTA */}
              <motion.div
                variants={fadeUp}
                className="bg-[#9a3412] rounded-2xl p-6 text-white shadow-lg shadow-[#9a3412]/20"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-1">Prefer to Call?</h3>
                <p className="text-amber-100 text-sm mb-3">
                  Speak with a specialist right now. We pick up.
                </p>
                <a
                  href="tel:8449675247"
                  className="text-2xl font-extrabold hover:text-amber-200 transition-colors block"
                >
                  844-967-5247
                </a>
              </motion.div>

              {/* Trust grid */}
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-[rgba(154,52,18,0.15)] shadow-sm"
              >
                <h3 className="font-bold text-[#2a211c] text-base mb-4">
                  Why Contractors Choose Us
                </h3>
                <div className="space-y-4">
                  {trustItems.map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#fdf6ec] rounded-lg flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-[#9a3412]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2a211c]">{item.title}</p>
                        <p className="text-xs text-[#a89a8c]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* What happens next */}
              <motion.div
                variants={fadeUp}
                className="bg-[#fdfaf5] rounded-2xl p-6 border border-[rgba(154,52,18,0.1)]"
              >
                <h3 className="font-bold text-[#2a211c] text-base mb-4">
                  What Happens Next?
                </h3>
                <ol className="space-y-3">
                  {[
                    "We review your quote request (usually within hours).",
                    "A specialist contacts you to confirm details and answer questions.",
                    "We shop A-rated carriers and present your best options.",
                    "You choose. We bind coverage and issue your certificate.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#57493f]">
                      <span className="flex-shrink-0 w-5 h-5 bg-[#9a3412] text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
