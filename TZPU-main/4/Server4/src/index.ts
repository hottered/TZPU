import express, { Request, Application, Response } from "express";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Student } from "./Models/Student";
import { FetchService } from "./Services/fetchService";
import { StudentResponse } from "./Models/Response";
import { Cas } from "./Models/Cas";
var cors = require("cors");
const app: Application = express();
app.use(cors());
const http = require("http").Server(app);
const fservice = new FetchService();
const myResponse: StudentResponse[] = [];

let students: Map<string, Student> = new Map<string, Student>();

const io: Server<DefaultEventsMap, DefaultEventsMap> = require("socket.io")(
  http,
  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  }
);

const PORT = process.env.PORT || 3500;

io.on("connection", (socket) => {
  socket.on("disconnect", (message) => {
    const student = students.get(socket.id);
    const respid = myResponse.findIndex(
      (r) => r.student.indeks == student?.indeks
    );
    myResponse.splice(respid, 1);
    if (student) students.delete("" + student.indeks);
    console.log("User " + socket.id + " disconnected!");
    socket.removeAllListeners();
  });

  socket.on("login", async (message) => {
    fservice.getStudentById(message).then((s) => {
      if (s) students.set(socket.id, s);
      myResponse.push({ student: s, casovi: [] });
    });
  });

  socket.on("selectDay", async (message) => {
    if (students.has(socket.id)) {
      const student = students.get(socket.id);
      const respid = myResponse.findIndex(
        (r) => r.student.indeks == student?.indeks
      );

      let myResponsePetar: Array<SchElement> = new Array<SchElement>();

      fservice.getCoursesByDay(message).then((casovi) => {
        //console.log(casovi);
        casovi.forEach((cas) => {
          const mCas: Cas = {
            ime: cas,
            trajanje: 0,
            ucionice: [],
            brstudenata: 0,
          };
          fservice.getCourseTime(cas).then((sData) => {
            mCas.trajanje = sData[0].trajanje;
            mCas.ucionice = [];
            mCas.brstudenata = sData[0].brucenika;

            let mojCas: SchElement = {
              name: cas,
              trajanje : sData[0].trajanje,
              classrooms: ["Classrom 1", "Classrom 2","Classrom 3"],
              t1: "t1",
              t2: "t2",
              odmor: "odmorr"
            }
            console.log(mojCas);
            myResponsePetar.push(mojCas);
            myResponse[respid].casovi.push(mCas);
            fservice.getClassRoom(sData.brucenika, socket.id, cas);
          });
        });
        console.log(myResponsePetar);
        socket.emit("test", myResponsePetar);
      });
    }
  });

  console.log("User " + socket.id + " connected successfully!");
});

app.get("/", (req: Request, res: Response): void => {
  res.send(
    JSON.stringify([
      {
        requestId: "1",
        studentNumber: 50,
        typeOfClass: "Amfiteatar",
      },
    ])
  );
});

app.get("/classroompowerofftest", (req: Request, res: Response): void => {
  io.emit(
    "U" + 17000,
    JSON.stringify({ name: req.query.name, time: req.query.time })
  );
  res.send(
    JSON.stringify([
      {
        requestId: "1",
        studentNumber: 50,
        typeOfClass: "Amfiteatar",
      },
    ])
  );
});

app.get("/classroompoweroff", (req: Request, res: Response): void => {
  const studenti: { index: number; cas: string }[] = [];
  myResponse.forEach((resp) => {
    resp.casovi.forEach((cas) => {
      cas.ucionice.forEach((u) => {
        if (u == req.query.name) {
          resp.student.indeks;
          if (studenti.map((s) => s.index).indexOf(resp.student.indeks) < 0) {
            io.emit(
              "U" + resp.student.indeks,
              JSON.stringify({ name: req.query.name, time: req.query.time })
            );
            studenti.push({ index: resp.student.indeks, cas: cas.ime });
          }
        }
      });
    });
  });
  res.send(studenti);
});

app.get("/importantnotify", (req: Request, res: Response): void => {
  const ind: number[] = [];
  students.forEach((s) => {
    if (ind.indexOf(s.indeks) < 0) ind.push(s.indeks);
  });
  res.send(ind);
});

app.post("/setClassRoom", (req: Request, res: Response): void => {
  req.on("data", (chunk) => {
    const obj = JSON.parse(chunk);
    const student: Student | undefined = students.get(obj.requestId as string);
    if (student) {
      const respid = myResponse.findIndex(
        (r) => r.student.indeks == student.indeks
      );
      let waiting: number = 0;
      myResponse[respid].casovi.forEach((cas: Cas) => {
        if (cas.ime == (obj.courseName as string)) {
          cas.ucionice = obj.classroomName as string[];
          console.log(myResponse[respid]);
        }
        if (cas.ucionice.length == 0) waiting++;
      });
      if (waiting == 0) {
        //SVI ZAHTEVI SU OBRADJENI
        io.emit("" + student.indeks, JSON.stringify(myResponse[respid]));
      }
    }
    res.statusCode = 200;
    res.send({ requestId: obj.requestId, courseName: obj.courseName });
  });
});

http.listen(4444, () => {
  console.log(" listen on 4444");
}); //socket slusa na 4444

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});


export interface SchElement {
  name: string;
  t1: string;
  t2: string;
  classrooms: string[];
  trajanje: number;
  odmor: string | null;
}

