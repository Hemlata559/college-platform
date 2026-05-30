import { PrismaClient } from "@prisma/client";

declare const process: { exit(code?: number): never };

const prisma = new PrismaClient();

async function main() {
  await prisma.college.createMany({
    data: [
      // ================= IITs (JEE Advanced) =================
      {
        name: "IIT Delhi",
        location: "Delhi",
        type: "Government",
        rating: 4.9,
        fees: { tuition: 220000, total: 900000 },
        courses: ["CSE", "ECE", "Mechanical", "Civil"],
        cutoff: { CSE: "AIR < 5000" },
        placement: { avg: "25 LPA", highest: "2 Cr" },
      },
      {
        name: "IIT Bombay",
        location: "Mumbai",
        type: "Government",
        rating: 4.9,
        fees: { tuition: 230000, total: 950000 },
        courses: ["CSE", "Aerospace", "Mechanical", "Electrical"],
        cutoff: { CSE: "AIR < 3000" },
        placement: { avg: "28 LPA", highest: "3 Cr" },
      },
      {
        name: "IIT Madras",
        location: "Chennai",
        type: "Government",
        rating: 4.9,
        fees: { tuition: 220000, total: 900000 },
        courses: ["CSE", "ECE", "Mechanical"],
        cutoff: { CSE: "AIR < 4000" },
        placement: { avg: "26 LPA", highest: "1.8 Cr" },
      },

      // ================= NITs (JEE Main) =================
      {
        name: "NIT Trichy",
        location: "Tamil Nadu",
        type: "Government",
        rating: 4.7,
        fees: { tuition: 160000, total: 700000 },
        courses: ["CSE", "ECE", "Mechanical"],
        cutoff: { CSE: "99.5 percentile" },
        placement: { avg: "18 LPA", highest: "52 LPA" },
      },
      {
        name: "NIT Surathkal",
        location: "Karnataka",
        type: "Government",
        rating: 4.6,
        fees: { tuition: 150000, total: 680000 },
        courses: ["CSE", "IT", "ECE"],
        cutoff: { CSE: "99.4 percentile" },
        placement: { avg: "17 LPA", highest: "45 LPA" },
      },
      {
        name: "NIT Warangal",
        location: "Telangana",
        type: "Government",
        rating: 4.6,
        fees: { tuition: 150000, total: 700000 },
        courses: ["CSE", "ECE", "Mechanical"],
        cutoff: { CSE: "99.3 percentile" },
        placement: { avg: "16 LPA", highest: "44 LPA" },
      },

      // ================= Delhi Colleges =================
      {
        name: "DTU",
        location: "Delhi",
        type: "Government",
        rating: 4.5,
        fees: { tuition: 180000, total: 850000 },
        courses: ["CSE", "IT", "ECE", "Mechanical"],
        cutoff: { CSE: "99+ percentile" },
        placement: { avg: "15 LPA", highest: "60 LPA" },
      },
      {
        name: "NSUT",
        location: "Delhi",
        type: "Government",
        rating: 4.6,
        fees: { tuition: 170000, total: 800000 },
        courses: ["CSE", "IT", "ECE"],
        cutoff: { CSE: "99+ percentile" },
        placement: { avg: "16 LPA", highest: "55 LPA" },
      },
      {
        name: "IGDTUW",
        location: "Delhi",
        type: "Government (Women)",
        rating: 4.5,
        fees: { tuition: 150000, total: 800000 },
        courses: ["CSE", "IT", "AI/ML", "ECE"],
        cutoff: { CSE: "98.5–99.5 percentile" },
        placement: { avg: "14 LPA", highest: "50 LPA" },
      },

      // ================= Private Top Universities =================
      {
        name: "VIT Vellore",
        location: "Vellore",
        type: "Private",
        rating: 4.3,
        fees: { tuition: 250000, total: 1200000 },
        courses: ["CSE", "AI/ML", "Cyber Security"],
        cutoff: { CSE: "Rank < 20,000 VITEEE" },
        placement: { avg: "8 LPA", highest: "45 LPA" },
      },
      {
        name: "Manipal Institute of Technology",
        location: "Manipal",
        type: "Private",
        rating: 4.2,
        fees: { tuition: 350000, total: 1500000 },
        courses: ["CSE", "IT", "Biotech"],
        cutoff: { CSE: "Rank < 10,000 MET" },
        placement: { avg: "10 LPA", highest: "40 LPA" },
      },
      {
        name: "SRM University",
        location: "Chennai",
        type: "Private",
        rating: 4.1,
        fees: { tuition: 300000, total: 1400000 },
        courses: ["CSE", "ECE", "AI/ML"],
        cutoff: { CSE: "SRMJEEE Qualified" },
        placement: { avg: "7 LPA", highest: "35 LPA" },
      },

      // ================= CUET Universities =================
      {
        name: "Delhi University (SRCC)",
        location: "Delhi",
        type: "Government",
        rating: 4.8,
        fees: { tuition: 20000, total: 80000 },
        courses: ["B.Com", "Economics"],
        cutoff: { CUET: "99+ percentile" },
        placement: { avg: "10 LPA", highest: "30 LPA" },
      },
      {
        name: "Jamia Millia Islamia",
        location: "Delhi",
        type: "Government",
        rating: 4.4,
        fees: { tuition: 50000, total: 200000 },
        courses: ["CSE", "ECE", "Civil"],
        cutoff: { CUET: "97–99 percentile" },
        placement: { avg: "8 LPA", highest: "25 LPA" },
      },

      // ================= NEET Medical Colleges =================
      {
        name: "AIIMS Delhi",
        location: "Delhi",
        type: "Government",
        rating: 4.9,
        fees: { tuition: 6000, total: 30000 },
        courses: ["MBBS"],
        cutoff: { NEET: "AIR < 100" },
        placement: { avg: "Medical Residency" },
      },
      {
        name: "Maulana Azad Medical College",
        location: "Delhi",
        type: "Government",
        rating: 4.8,
        fees: { tuition: 10000, total: 50000 },
        courses: ["MBBS"],
        cutoff: { NEET: "AIR < 500" },
        placement: { avg: "Medical Residency" },
      },

      // ================= Additional Colleges =================
      {
        name: "BHU Varanasi",
        location: "Varanasi",
        type: "Government",
        rating: 4.5,
        fees: { tuition: 30000, total: 120000 },
        courses: ["CSE", "ECE", "Mechanical"],
        cutoff: { JEE: "98+ percentile" },
        placement: { avg: "9 LPA", highest: "28 LPA" },
      },
      {
        name: "AMU Aligarh",
        location: "Aligarh",
        type: "Government",
        rating: 4.3,
        fees: { tuition: 40000, total: 150000 },
        courses: ["CSE", "ECE"],
        cutoff: { JEE: "97+ percentile" },
        placement: { avg: "7 LPA", highest: "22 LPA" },
      },

      {
        name: "PEC Chandigarh",
        location: "Chandigarh",
        type: "Government",
        rating: 4.4,
        fees: { tuition: 150000, total: 600000 },
        courses: ["CSE", "ECE", "Mechanical"],
        cutoff: { JEE: "98.5 percentile" },
        placement: { avg: "12 LPA", highest: "35 LPA" },
      },

      {
        name: "IIIT Hyderabad",
        location: "Hyderabad",
        type: "Government",
        rating: 4.8,
        fees: { tuition: 300000, total: 1200000 },
        courses: ["CSE", "AI/ML"],
        cutoff: { JEE: "Top 1000 rank" },
        placement: { avg: "28 LPA", highest: "85 LPA" },
      },

      {
        name: "IIIT Delhi",
        location: "Delhi",
        type: "Government",
        rating: 4.6,
        fees: { tuition: 250000, total: 1000000 },
        courses: ["CSE", "ECE"],
        cutoff: { JEE: "99+ percentile" },
        placement: { avg: "20 LPA", highest: "50 LPA" },
      },

    ],
  });

  console.log("Seed completed");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });