import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Input from "../components/input";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/candidates")
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const title = <h1>Appointment Booker</h1>;
  const interviewers = [
    {
      name: "Joe Bloggs",
      skills: ["JavaScript", "nextJS"],
      availability: {
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: true,
        friday: false,
      },
    },
    {
      name: "Sam Cheese",
      skills: ["Java", "Python"],
      availability: {
        monday: true,
        tuesday: true,
        wednesday: false,
        thursday: true,
        friday: false,
      },
    },
    {
      name: "John Smith",
      skills: ["Java", "Python"],
      availability: {
        monday: false,
        tuesday: true,
        wednesday: false,
        thursday: true,
        friday: false,
      },
    },
  ];

  const options = [{ label: "test1" }, { label: "test2" }, { label: "test3" }];
  const interviewerCard = interviewers.map((interviewer) => (
    <div key={interviewer.name}>
      <h2>Name: {interviewer.name}</h2>
      <h3>
        Skills:{" "}
        {interviewer.skills.map((skill) => (
          <p key={skill}>{skill}</p>
        ))}
      </h3>
      <h3>Availability: </h3>
    </div>
  ));
  return (
    <div>
      {title}
      <Input options={candidates} />
      {interviewerCard}
    </div>
  );
}
