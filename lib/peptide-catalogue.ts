export interface Peptide {
  name: string;
  concentration: string;
  frequency: string;
  duration: string;
  breakPeriod: string;
  pricePerPen: number;
  notes: string;
  categories: string[];
}

export const PEPTIDE_CATALOGUE: Peptide[] = [
  { name: "BPC-157", concentration: "5mg/ml, 3ml, 15mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 194, notes: "Can be used continuously for healing; cycling improves long-term effectiveness.", categories: ["recovery", "healing", "gut"] },
  { name: "TB-500", concentration: "5mg/ml, 3ml, 15mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 194, notes: "Tissue repair and healing. Cycle based on recovery or injury status.", categories: ["recovery", "healing", "muscle"] },
  { name: "TB500+BPC157", concentration: "5mg/ml, 3ml, 15mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 232, notes: "Synergistic combination for tissue healing and recovery.", categories: ["recovery", "healing"] },
  { name: "Semaglutide", concentration: "5mg/0.88ml", frequency: "Daily", duration: "6 Months", breakPeriod: "6 Months", pricePerPen: 218, notes: "No specific break required unless for safety or tolerance reasons.", categories: ["fat loss", "metabolic", "weight management"] },
  { name: "Tirzepatide", concentration: "10mg/ml, 3ml, 30mg", frequency: "Once per week", duration: "1 Year", breakPeriod: "6 Months", pricePerPen: 342, notes: "No specific break required unless side effects observed.", categories: ["fat loss", "metabolic", "weight management"] },
  { name: "Retatrutide", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 208, notes: "Advanced metabolic peptide for fat loss.", categories: ["fat loss", "metabolic"] },
  { name: "AOD9604", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 160, notes: "Fragment of HGH specifically for fat metabolism.", categories: ["fat loss"] },
  { name: "Adipotide", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "6 Months", breakPeriod: "6 Months", pricePerPen: 200, notes: "Monitor kidney function. Used for fat loss with careful monitoring.", categories: ["fat loss"] },
  { name: "5-amino 1MQ", concentration: "33mg/ml, 3ml, 100mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 306, notes: "NNMT inhibitor for fat loss and metabolic support.", categories: ["fat loss", "metabolic"] },
  { name: "Retatrutide + Follistatin 344 Blend", concentration: "10.4mg/ml, 3ml, 31.2mg", frequency: "Daily", duration: "6 Months", breakPeriod: "6 Months", pricePerPen: 306, notes: "Fat loss combined with muscle preservation.", categories: ["fat loss", "muscle", "body composition"] },
  { name: "Ipamorelin", concentration: "5mg/ml, 3ml, 15mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 144, notes: "Growth hormone secretagogue. Gentle and well-tolerated.", categories: ["growth hormone", "muscle", "anti-aging", "sleep"] },
  { name: "CJC-no-DAC", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 192, notes: "GHRH analogue. Pairs well with Ipamorelin.", categories: ["growth hormone", "muscle", "anti-aging"] },
  { name: "Ipamorelin / CJC1295", concentration: "5mg/ml, 3ml, 15mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 242, notes: "Classic growth hormone combo stack.", categories: ["growth hormone", "muscle", "anti-aging", "fat loss"] },
  { name: "GHRP6", concentration: "5mg/ml, 3ml, 15mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 194, notes: "Potent growth hormone secretagogue. Stimulates appetite.", categories: ["growth hormone", "muscle"] },
  { name: "IGF-1LR3", concentration: "1mg/ml, 1ml, 1mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 192, notes: "Insulin-like growth factor. Powerful for muscle and recovery.", categories: ["muscle", "recovery", "growth hormone"] },
  { name: "Follistatin 344", concentration: "1mg/ml, 3ml, 3mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 160, notes: "Myostatin inhibitor. Short intense cycles recommended.", categories: ["muscle", "body composition"] },
  { name: "HGH", concentration: "Upon request", frequency: "Upon request", duration: "Upon request", breakPeriod: "Upon request", pricePerPen: 180, notes: "Human Growth Hormone. Upon request.", categories: ["growth hormone", "anti-aging", "muscle"] },
  { name: "Tesamorelin", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 160, notes: "GHRH analogue. Particularly effective for visceral fat reduction.", categories: ["fat loss", "growth hormone"] },
  { name: "Epitalon", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 194, notes: "Anti-aging and telomere support. Short cycles with long breaks.", categories: ["anti-aging", "longevity", "sleep"] },
  { name: "Humanin", concentration: "2.5mg/ml, 3ml, 7.5mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 160, notes: "Improves mitochondrial function and protects against aging.", categories: ["anti-aging", "longevity", "mitochondrial"] },
  { name: "MOTS-c", concentration: "5mg/ml, 3ml, 15mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 194, notes: "Mimics exercise benefits. Enhances mitochondrial function.", categories: ["anti-aging", "mitochondrial", "metabolic", "fat loss"] },
  { name: "SS31", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 160, notes: "Mitochondrial health and function. Cycle with breaks.", categories: ["mitochondrial", "anti-aging", "cardiovascular"] },
  { name: "SS31+Cardiogen mix", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 274, notes: "Combined mitochondrial and cardiovascular support.", categories: ["cardiovascular", "mitochondrial", "anti-aging"] },
  { name: "NAD+ 300", concentration: "100mg/ml, 3ml, 300mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 160, notes: "NAD+ precursor for cellular energy and anti-aging.", categories: ["anti-aging", "mitochondrial", "energy", "longevity"] },
  { name: "NAD+ 600", concentration: "200mg/ml, 3ml, 600mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 288, notes: "Higher dose NAD+ for enhanced cellular energy.", categories: ["anti-aging", "mitochondrial", "energy", "longevity"] },
  { name: "NAD (SPRAY)", concentration: "300mg/ml, 10ml, 3g", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 192, notes: "Nasal NAD+ spray for convenient delivery.", categories: ["anti-aging", "mitochondrial", "energy", "cognitive"] },
  { name: "AC-Semax-NH2", concentration: "5mg/ml, 3ml, 15mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 160, notes: "Nootropic peptide for cognitive enhancement and neuroprotection.", categories: ["cognitive", "nootropic", "stress"] },
  { name: "AC-Selank-NH2", concentration: "5mg/ml, 3ml, 15mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 160, notes: "Anxiolytic and nootropic. Reduces anxiety and improves cognition.", categories: ["cognitive", "nootropic", "stress", "anxiety"] },
  { name: "AC-KPV-NH2", concentration: "5mg/ml, 3ml, 15mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 160, notes: "Anti-inflammatory peptide derived from alpha-MSH.", categories: ["anti-inflammatory", "gut", "recovery"] },
  { name: "delta sleep", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 160, notes: "Delta sleep-inducing peptide for deep sleep improvement.", categories: ["sleep"] },
  { name: "AC-Selank+Delta-sleep", concentration: "5mg/ml, 3ml, 15mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 226, notes: "Combined anxiety reduction and deep sleep improvement.", categories: ["sleep", "stress", "anxiety", "cognitive"] },
  { name: "AC Selank + AC Semax Spray", concentration: "5mg/ml+5mg/ml, 10ml", frequency: "Upon request", duration: "6 Months", breakPeriod: "6 Months", pricePerPen: 242, notes: "Combined cognitive and anxiolytic spray.", categories: ["cognitive", "nootropic", "stress"] },
  { name: "VIP", concentration: "5mg/ml, 2ml, 10mg", frequency: "Daily or Every Other Day", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 194, notes: "Immune modulation and inflammation control.", categories: ["immune", "anti-inflammatory", "cognitive"] },
  { name: "VIP+MOTS-C mix", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 242, notes: "Immune and metabolic combination.", categories: ["immune", "metabolic", "mitochondrial"] },
  { name: "GcMAF", concentration: "1800mcg/3ml", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 420, notes: "Immune modulation. Used in cancer and chronic disease management.", categories: ["immune"] },
  { name: "Thymalin", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 210, notes: "Boosts immune system and provides anti-aging benefits.", categories: ["immune", "anti-aging"] },
  { name: "Thymosin ALPHA 1", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 224, notes: "Potent immune modulator. Antiviral and anti-tumor properties.", categories: ["immune", "anti-aging"] },
  { name: "Thymogen", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 192, notes: "Thymic peptide for immune enhancement.", categories: ["immune"] },
  { name: "NK peptide", concentration: "5mg/ml, 3ml, 15mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 192, notes: "Natural killer cell activator for immune support.", categories: ["immune"] },
  { name: "Bronchogen", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 160, notes: "Lung and respiratory support. Cycle with breaks.", categories: ["respiratory", "immune"] },
  { name: "Cardiogen", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 194, notes: "Cardiovascular health support. Cycle based on health goals.", categories: ["cardiovascular"] },
  { name: "Skin-glow (GHK-CU)", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 168, notes: "Skin rejuvenation and wound healing.", categories: ["skin", "anti-aging", "healing"] },
  { name: "BPC SPRAY", concentration: "5mg/ml, 10ml, 50mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 192, notes: "BPC-157 nasal spray for systemic delivery.", categories: ["recovery", "healing", "gut", "anti-inflammatory"] },
  { name: "Melanotan 2", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 160, notes: "Tanning peptide. Also has libido-enhancing effects.", categories: ["skin", "sexual health", "libido"] },
  { name: "Pt-141", concentration: "5mg/ml, 3ml, 15mg", frequency: "By demand", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 164, notes: "Sexual health peptide. Used on demand for libido and sexual function.", categories: ["sexual health", "libido"] },
  { name: "Kisspeptin", concentration: "5mg/ml, 3ml, 15mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 144, notes: "Hormonal regulation and reproductive health.", categories: ["hormonal", "sexual health", "libido"] },
  { name: "Oxytocin (SPRAY)", concentration: "100IU/10ml", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 128, notes: "Bonding hormone. Reduces stress and anxiety.", categories: ["stress", "anxiety", "sexual health"] },
  { name: "Oxytocin + PT141 Spray", concentration: "0.05mg/ml + 2.56mg/ml, 10ml", frequency: "Upon request", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 242, notes: "Combined sexual health and bonding spray.", categories: ["sexual health", "libido"] },
  { name: "Melittin", concentration: "5mg/ml, 3ml, 15mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 160, notes: "Bee venom peptide with anti-inflammatory properties.", categories: ["anti-inflammatory", "immune"] },
  { name: "prostamax", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 160, notes: "Prostate health support.", categories: ["prostate", "hormonal"] },
  { name: "Teriparitide", concentration: "0.2mg/ml, 3ml, 0.6mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 128, notes: "Bone density and osteoporosis support.", categories: ["bone", "anti-aging"] },
  { name: "TB4 (Thymosin Beta 4)", concentration: "10mg/ml, 3ml, 30mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 208, notes: "Tissue repair, anti-inflammatory, cardiac protection.", categories: ["recovery", "healing", "cardiovascular", "anti-inflammatory"] },
  { name: "PHDP5 (SPRAY)", concentration: "10mg/ml, 10ml, 100mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 240, notes: "Peptide spray for systemic support.", categories: ["anti-aging", "cognitive"] },
  { name: "SLUPP 332", concentration: "0.5mg/ml, 3ml, 1.5mg", frequency: "Daily", duration: "1 Month", breakPeriod: "1 Month", pricePerPen: 194, notes: "REV-ERB agonist for circadian rhythm and metabolic support.", categories: ["metabolic", "sleep", "fat loss"] },
];

export function getCatalogueText(): string {
  return PEPTIDE_CATALOGUE.map(p =>
    `- ${p.name} (€${p.pricePerPen}/pen): ${p.notes} Categories: ${p.categories.join(", ")}. Dosing: ${p.frequency}, ${p.duration} on / ${p.breakPeriod} off.`
  ).join("\n");
}
