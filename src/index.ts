/**
 * Interfaces (blueprints for objects) and primitive types (string, number, boolean, etc.) are fundamental concepts in TypeScript that help us create type-safe code. In this lesson, we will explore how to define interfaces to describe the shape of objects and how to use primitive types to ensure our variables hold the correct type of data.
 */
interface Student {
  firstName: string;
  lastName: string;
  age: number;
  perfectAttendance: boolean;
}

/**
 * Day 1 - Typescript Basics - interface and primitive types
 */
// Type inference: TS infers this type based on its value
const courseName = "Level 4 - Week 4 - Typescript";

console.log(typeof courseName);

// Explicit type annotation
const courseDate: string = '2026/02/25';
const maxStudents: number = 10;
const isClassFull: boolean = false;

// Explicit type annotations for variables that aren't constants
let selectedStudent: string | undefined;

// When building functions, explicit annotation is always required
function printMessage(message: string): void {
  console.log(`Here's my message: ${message}`);
}

printMessage("Hello World from type safe environments");

function selectStudent(student?: string | Student | undefined): string {
  if (student) {
    return (`Hi, this is the selected student: ${student}`);
  } else {
    return ("No student selected");
  }
}

selectedStudent = selectStudent();

console.log(selectedStudent);

// Selecting a student with the interface
const jesse: Student = {
  firstName: "Jesse",
  lastName: "Yocum",
  age: 108,
  perfectAttendance: true
};

console.log(selectStudent(jesse));
