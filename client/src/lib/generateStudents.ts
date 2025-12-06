import type { Student, Subject } from "@shared/schema";

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

export function generateStudents(count: number = 1200): Student[] {
  const students: Student[] = [];
  const usedRolls = new Set<number>();
  const usedEmails = new Set<string>();

  for (let i = 0; i < count; i++) {
    const firstName = randomChoice(firstNames);
    const lastName = randomChoice(lastNames);
    const name = `${firstName} ${lastName}`;
    
    let roll: number;
    do {
      roll = random(10001, 99999);
    } while (usedRolls.has(roll));
    usedRolls.add(roll);

    const admissionYear = random(2020, 2024);
    const currentYear = 2024;
    const year = Math.min(4, Math.max(1, currentYear - admissionYear + 1));
    const branch = randomChoice(branches);
    const section = randomChoice(sections);
    
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

  return students.sort((a, b) => a.roll - b.roll);
}

let cachedStudents: Student[] | null = null;

export function getStudents(): Student[] {
  if (!cachedStudents) {
    cachedStudents = generateStudents(1200);
  }
  return cachedStudents;
}

export function getStudentByRoll(roll: number): Student | undefined {
  return getStudents().find(s => s.roll === roll);
}

export function validateStudentLogin(roll: number, dob: string): Student | null {
  const student = getStudentByRoll(roll);
  if (student && student.dob === dob) {
    return student;
  }
  return null;
}
