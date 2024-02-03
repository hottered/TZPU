import { Student } from "../Models/Student";

const fetch = require("node-fetch");

export class FetchService {
  async getStudentById(id: number) {
    const response = await fetch("http://localhost:3000/studenti?indeks=" + id);
    const data: Student[] = await response.json();
    return (await data[0]) ?? null;
  }

  async getCoursesByDay(day: string) {
    const response = await fetch("http://localhost:3000/raspored?dan=" + day);
    const data: { dan: string; casovi: string[] }[] = await response.json();
    return (await data[0]).casovi;
  }

  async getCourseTime(name: string) {
    const response = await fetch(
      "http://localhost:8080/Predmet/Prosek/" + name
      );
    const result = await response.json();
    return result;
  }

  async getClassRoom(numOfStudents: number, id: string, courseName: string) {
      await fetch("http://localhost:5050/classroomController/sendRequest", {
      method: "POST",
      body: JSON.stringify({
        requestId: id,
        studentNumber: numOfStudents,
        courseName: courseName,
        typeOfClass: "Ucionica",
      }),
      headers: { "Content-Type": "application/json" },
    });

    //console.log("PODACI: " + id + "  " + courseName);
  }
}
