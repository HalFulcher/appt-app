import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  
  const title = <h1>Appointment Booker</h1>
const interviewers = [{
    name: 'Joe Bloggs',
    skills: ['JavaScript', 'nextJS'],
    availability: {monday: true, tuesday: false, wednesday: true, thursday: true, friday: false}
},
{
    name: 'Sam Cheese',
    skills: ['Java', 'Python'],
    availability: {monday: true, tuesday: true, wednesday: false, thursday: true, friday: false}
},
{
    name: 'John Smith',
    skills: ['Java', 'Python'],
    availability: {monday: false, tuesday: true, wednesday: false, thursday: true, friday: false}
}
]

const interviewerCard = interviewers.map(interviewer=><div>
    <h2>Name: {interviewer.name}</h2>
    <h3>Skills: {interviewer.skills.map(skill=><p>{skill}</p>)}</h3>
    <h3>Availability:</h3>
</div>)
  return (
<div>

{title}
{interviewerCard}
</div>
  )
}
