import type { Student, Subject } from "@shared/schema";
import { testStudentCredentials } from "@shared/schema";

const firstNames = [
  "Aarav", "Aditi", "Aisha", "Amit", "Ananya", "Arjun", "Bhavya", "Chetan", "Deepa", "Dev",
  "Divya", "Esha", "Gaurav", "Harini", "Harsh", "Ishaan", "Jaya", "Karan", "Kavya", "Krishna",
  "Lakshmi", "Manish", "Meera", "Neha", "Nikhil", "Pallavi", "Pranav", "Priya", "Rahul", "Ravi",
  "Ritika", "Rohan", "Sakshi", "Sameer", "Sanvi", "Shreya", "Siddharth", "Sneha", "Tanvi", "Varun",
  "Vidya", "Vikram", "Yamini", "Yash", "Zara", "Aditya", "Bhavana", "Chandra", "Dhruv", "Ekta",
  "Farhan", "Gayatri", "Himanshu", "Isha", "Jatin", "Kiara", "Lavanya", "Mohit", "Nandini", "Om",
  "Pooja", "Raj", "Sanjana", "Tarun", "Uma", "Vaishnavi", "Yuvraj", "Aakash", "Bala", "Charvi"
];

const lastNames = [
  "Sharma", "Patel", "Reddy", "Kumar", "Singh", "Nair", "Rao", "Gupta", "Iyer", "Menon",
  "Joshi", "Verma", "Agarwal", "Pillai", "Chakraborty", "Mishra", "Kulkarni", "Deshmukh", "Bhat", "Naidu",
  "Srinivasan", "Murthy", "Choudhary", "Saxena", "Tiwari", "Pandey", "Yadav", "Rajput", "Kapoor", "Malhotra",
  "Banerjee", "Mukherjee", "Das", "Sen", "Ghosh", "Bose", "Roy", "Dutta", "Chatterjee", "Sengupta"
];

const cities = [
  "Vijayawada", "Guntur", "Amaravati", "Tirupati", "Visakhapatnam", "Nellore", "Kakinada", "Rajahmundry",
  "Hyderabad", "Chennai", "Bangalore", "Mumbai", "Delhi", "Kolkata", "Pune", "Ahmedabad"
];

const states = ["Andhra Pradesh", "Telangana", "Tamil Nadu", "Karnataka", "Maharashtra", "Delhi"];

const branches: Array<"CSE" | "ECE" | "EEE" | "MECH" | "CIVIL" | "IT"> = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"];
const sections: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];
const genders: Array<"Male" | "Female" | "Other"> = ["Male", "Female", "Other"];

const branchCodes: Record<string, string> = {
  CSE: "11",
  ECE: "12", 
  EEE: "13",
  MECH: "14",
  CIVIL: "15",
  IT: "16"
};

function generateRollNumber(admissionYear: number, branch: string, section: string, seq: number): string {
  const yearCode = String(admissionYear).slice(-2);
  const branchCode = branchCodes[branch] || "11";
  const sectionCode = String("ABCD".indexOf(section) + 1).padStart(2, "0");
  const seqNum = String(seq).padStart(4, "0");
  return `AP${yearCode}${branchCode}${sectionCode}${seqNum}`;
}
const hostels = ["Hostel A", "Hostel B", "Hostel C", "Hostel D", "Hostel E", null];

const subjectsByBranch: Record<string, string[]> = {
  CSE: ["Data Structures", "Algorithms", "Database Systems", "Operating Systems", "Computer Networks", "Machine Learning"],
  ECE: ["Digital Electronics", "Signal Processing", "Communication Systems", "VLSI Design", "Embedded Systems", "Control Systems"],
  EEE: ["Power Systems", "Electrical Machines", "Power Electronics", "Control Systems", "High Voltage Engineering", "Renewable Energy"],
  MECH: ["Thermodynamics", "Fluid Mechanics", "Machine Design", "Manufacturing Technology", "Heat Transfer", "Automobile Engineering"],
  CIVIL: ["Structural Analysis", "Geotechnical Engineering", "Surveying", "Concrete Technology", "Hydraulics", "Transportation Engineering"],
  IT: ["Web Technologies", "Software Engineering", "Cloud Computing", "Cyber Security", "Data Mining", "Mobile Computing"]
};

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateGrade(total: number): "O" | "A+" | "A" | "B+" | "B" | "C" | "D" | "F" {
  const percentage = (total / 170) * 100;
  if (percentage >= 90) return "O";
  if (percentage >= 80) return "A+";
  if (percentage >= 70) return "A";
  if (percentage >= 60) return "B+";
  if (percentage >= 50) return "B";
  if (percentage >= 40) return "C";
  if (percentage >= 30) return "D";
  return "F";
}

function generateSubjects(branch: string): Subject[] {
  const subjectNames = subjectsByBranch[branch] || subjectsByBranch.CSE;
  return subjectNames.map(name => {
    const internal1 = random(12, 30);
    const internal2 = random(12, 30);
    const assignment = random(5, 10);
    const endSem = random(40, 100);
    const total = internal1 + internal2 + assignment + endSem;
    return {
      name,
      internal1,
      internal2,
      assignment,
      endSem,
      total,
      grade: generateGrade(total)
    };
  });
}

function calculateSGPA(subjects: Subject[]): number {
  const gradePoints: Record<string, number> = {
    "O": 10, "A+": 9, "A": 8, "B+": 7, "B": 6, "C": 5, "D": 4, "F": 0
  };
  const totalPoints = subjects.reduce((sum, sub) => sum + gradePoints[sub.grade], 0);
  return parseFloat((totalPoints / subjects.length).toFixed(2));
}

function generateDOB(admissionYear: number): string {
  const birthYear = admissionYear - random(17, 20);
  const month = String(random(1, 12)).padStart(2, "0");
  const day = String(random(1, 28)).padStart(2, "0");
  return `${birthYear}-${month}-${day}`;
}

function createTestStudent(testCred: typeof testStudentCredentials[0], index: number): Student {
  const rollParts = testCred.roll.match(/AP(\d{2})(\d{2})(\d{2})(\d{4})/);
  const yearCode = rollParts ? parseInt(rollParts[1]) : 22;
  const branchCode = rollParts ? rollParts[2] : "11";
  
  const branchMap: Record<string, "CSE" | "ECE" | "EEE" | "MECH" | "CIVIL" | "IT"> = {
    "11": "CSE", "12": "ECE", "13": "EEE", "14": "MECH", "15": "CIVIL", "16": "IT"
  };
  const branch = branchMap[branchCode] || "CSE";
  const admissionYear = 2000 + yearCode;
  const currentYear = 2024;
  const year = Math.min(4, Math.max(1, currentYear - admissionYear + 1)) as 1 | 2 | 3 | 4;
  
  const subjects = generateSubjects(branch);
  const sgpa = calculateSGPA(subjects);
  const cgpa = randomFloat(Math.max(6, sgpa - 0.5), Math.min(10, sgpa + 0.3));
  
  return {
    roll: testCred.roll,
    name: testCred.name,
    dob: testCred.dob,
    gender: index % 2 === 0 ? "Male" : "Female",
    phone: `+91-${random(70000, 99999)}${random(10000, 99999)}`,
    email: `${testCred.name.toLowerCase().replace(" ", ".")}@srmap.edu.in`,
    address: `${randomChoice(cities)}, ${randomChoice(states)}`,
    course: "B.Tech",
    branch,
    year,
    section: "A",
    admissionYear,
    subjects,
    sgpa,
    cgpa: parseFloat(cgpa.toFixed(2)),
    feePaid: 50000,
    feePending: 0,
    hostelName: randomChoice(hostels),
    roomNo: random(101, 450),
    attendance: randomFloat(75, 98, 1),
    createdAt: new Date(Date.now() - random(0, 365 * 24 * 60 * 60 * 1000)).toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export function generateStudents(count: number = 1200): Student[] {
  const students: Student[] = [];
  const usedRolls = new Set<string>();
  const usedEmails = new Set<string>();

  testStudentCredentials.forEach((cred, idx) => {
    const testStudent = createTestStudent(cred, idx);
    students.push(testStudent);
    usedRolls.add(testStudent.roll);
    usedEmails.add(testStudent.email);
  });

  const rollCounters: Record<string, number> = {};
  
  for (let i = 0; i < count - testStudentCredentials.length; i++) {
    const firstName = randomChoice(firstNames);
    const lastName = randomChoice(lastNames);
    const name = `${firstName} ${lastName}`;
    
    const admissionYear = random(2021, 2024);
    const currentYear = 2024;
    const year = Math.min(4, Math.max(1, currentYear - admissionYear + 1));
    const branch = randomChoice(branches);
    const section = randomChoice(sections);
    
    const rollKey = `${admissionYear}-${branch}-${section}`;
    rollCounters[rollKey] = (rollCounters[rollKey] || 2) + 1;
    let roll = generateRollNumber(admissionYear, branch, section, rollCounters[rollKey]);
    
    while (usedRolls.has(roll)) {
      rollCounters[rollKey]++;
      roll = generateRollNumber(admissionYear, branch, section, rollCounters[rollKey]);
    }
    usedRolls.add(roll);
    
    let email: string;
    do {
      const emailNum = random(1, 9999);
      email = `${firstName.toLowerCase()}${lastName.toLowerCase()}${emailNum}@srmap.edu.in`;
    } while (usedEmails.has(email));
    usedEmails.add(email);

    const subjects = generateSubjects(branch);
    const sgpa = calculateSGPA(subjects);
    const cgpa = randomFloat(Math.max(4, sgpa - 1.5), Math.min(10, sgpa + 0.5));

    const hostel = randomChoice(hostels);
    const totalFee = 50000;
    const feePaid = random(0, 5) === 0 ? random(20000, 45000) : totalFee;
    const feePending = totalFee - feePaid;

    const city = randomChoice(cities);
    const state = randomChoice(states);

    const student: Student = {
      roll,
      name,
      dob: generateDOB(admissionYear),
      gender: randomChoice(genders),
      phone: `+91-${random(70000, 99999)}${random(10000, 99999)}`,
      email,
      address: `${city}, ${state}`,
      course: "B.Tech",
      branch,
      year,
      section,
      admissionYear,
      subjects,
      sgpa,
      cgpa: parseFloat(cgpa.toFixed(2)),
      feePaid,
      feePending,
      hostelName: hostel,
      roomNo: hostel ? random(101, 450) : null,
      attendance: randomFloat(60, 100, 1),
      createdAt: new Date(Date.now() - random(0, 365 * 24 * 60 * 60 * 1000)).toISOString(),
      updatedAt: new Date().toISOString()
    };

    students.push(student);
  }

  return students.sort((a, b) => a.roll.localeCompare(b.roll));
}

let cachedStudents: Student[] | null = null;

export function getStudents(): Student[] {
  if (!cachedStudents) {
    cachedStudents = generateStudents(1200);
  }
  return cachedStudents;
}

export function getStudentByRoll(roll: string): Student | undefined {
  return getStudents().find(s => s.roll === roll);
}

export function validateStudentLogin(roll: string, dob: string): Student | null {
  const student = getStudentByRoll(roll);
  if (student && student.dob === dob) {
    return student;
  }
  return null;
}
