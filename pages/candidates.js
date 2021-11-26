import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Input from "../components/input";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState();
  const [selectedArea, setSelectedArea] = useState();
  const [selectedDaysOfTheWeek, setSelectedDaysOfTheWeek] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/candidates")
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    console.log(selected);
  }, [selected]);

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
  const daysOfTheWeek = [
    { id: "Monday", Name: "Monday" },
    { id: "Tuesday", Name: "Tuesday" },
    { id: "Wednesday", Name: "Wednesday" },
    { id: "Thursday", Name: "Thursday" },
    { id: "Friday", Name: "Friday" },
  ];
  const areas = [
    { id: "Software Engineer", Name: "Software Engineer" },
    { id: "Platform Engineer", Name: "Platform Engineer" },
  ];
  const submitHandler = async () => {
    const response = await axios.post("http://localhost:5000/test", {
      Area: selectedArea,
      Availability: selectedDaysOfTheWeek,
    });
    console.log(response);
  };
  return (
    <div>
      {title}
      <Input options={candidates} selectHandler={setSelected} />
      <Input options={daysOfTheWeek} selectHandler={setSelectedDaysOfTheWeek} />
      <Input options={areas} selectHandler={setSelectedArea} />
      <button onClick={submitHandler}>Search</button>
      {interviewerCard}
    </div>
  );
}
