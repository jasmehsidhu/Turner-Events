import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import academic from './assets/academic.png'
import sports from './assets/sports.png'
import guest from './assets/guest.png'
import charity from './assets/charity.png'
import cultural from './assets/cultural.png'
import potluck from './assets/potluck.png'
import club from './assets/club.png'
import './App.css'
import axios from 'axios'

function App() {
useEffect(()=>{
 async function fetchData(){
  showload(true)
    var request=await axios.get('https://event-app-3-fb1n.onrender.com/')
     var objects1= request.data.map((ele,ind)=>{
          switch(ele.etype){
            case 'sports':
              return({name:ele.name,discription:ele.discription,image:sports,date:ele.date})
              break;
            case 'guest':
              return({name:ele.name,discription:ele.discription,image:guest,date:ele.date})
              break;
            case 'charity':
              return({name:ele.name,discription:ele.discription,image:charity,date:ele.date})
              break;
            case 'club':
              return({name:ele.name,discription:ele.discription,image:club,date:ele.date})
              break;
            case 'cultural':
              return({name:ele.name,discription:ele.discription,image:cultural,date:ele.date})
              break;
            case 'potluck':
              return({name:ele.name,discription:ele.discription,image:potluck,date:ele.date})
              break;
            case 'academic':
              return({name:ele.name,discription:ele.discription,image:academic,date:ele.date})
              break;
          }
        })
        showload(false)
         setallevents(objects1)
        setevents(objects1)
  }
  fetchData()
},[])

var [allevents,setallevents]=useState([])
var [border,setborder]=useState('academic')
var [events,setevents]=useState([])
var [face,setface]=useState('main')
var [warn,setwarn]=useState(false)
var [username,setusername]=useState()
var [password,setpassword]=useState()
var [value,setvalue]=useState('')
var[count,setcount]=useState(0)
var [date, setdate]=useState()
var [name, setname]=useState()
var [marn, setmarn]=useState(false)
var [load,showload]=useState(false)

function change(){
var x=document.getElementById('search').value
if(x==''){
setevents(allevents)
}
else{
  var newarr=allevents.filter((ele,index)=>{
  if(ele.name.toLowerCase().includes(x.toLowerCase())){
    return ele;
  }
})
console.log(newarr)
setevents(newarr)
}
}
async function submit(){
console.log(password)
var request=await axios.post('https://event-app-3-fb1n.onrender.com/submit',{username:username,password:password.trim()})
if(request.data){
setface('admin')
}
else{
  setwarn(true)
}
}
function dischange(e){
if(e.target.value.length!=101){
setvalue(e.target.value)
setcount(e.target.value.length)
}
}
async function addevent(){
   var request=await axios.post('https://event-app-3-fb1n.onrender.com/',{name:name,discription:value,type:border,date:date.toDateString()})
   if(request.data=='done'){
    setmarn(true)
   }
}
function back(){
  setface('main')
}
  return (
    <>
    <div id='header'>
      <h1 id='heading'>Turner Fenton Events</h1>
    </div>
    <div id='loader'>
      {load?<div className='loading'></div> :null}
    </div>
{face!='main'?    <button onClick={back} id='back'>Back</button>:null}  
  {face=='main'?<><div id='searchs'>
      <input onChange={change} placeholder='Search events' type='text' id='search'></input>
    </div>
    <div id='main'>
<div id='events'>
  {events.map((ele,index)=>{
    var image = `./assets/${ele.etype}.png`
return(
  <div id='e'>
    <img id='emg' src={ele.image}></img>
    <h1 id='title'>{ele.name}</h1>
    <h2 id='date'>{ele.date}</h2>
    <p id='dis'>{ele.discription}
</p>
  </div>
)
  })}
</div>
  <div id='peek'>
      <button onClick={()=>{setface('auth')}}  id='submit2'>Admin Login</button>
  </div>
    </div></>:null}
  {face=='auth'?<>
<div id='forms'>
    <div id='form'>
      <h1 id='ftitle'>Admin Login</h1>
      {warn?      <h3 id='warn'>username or password is incorrect</h3>
:null}
    <input onChange={(e)=>{setusername(e.target.value)}} placeholder='Username' id='username' type='text'></input>
    <input onChange={(e)=>{setpassword(e.target.value)}}placeholder='Password' id='password' type='password'></input>
    <button onClick={submit} id='submit'>Login</button>
  </div>
</div>
  </>:null}
  {face=='admin'?<div id='mainadmin'>
          <h1 id='ftitle'>Admin Login</h1>
{marn?<h3  id='marn'>Event added succesfully</h3>
:null}        <input onChange={(e)=>{setname(e.target.value)}} placeholder='Title' type='text' id='atitle'></input>
        <textarea onChange={dischange} value={value} placeholder='Discription...' rows={3}></textarea>
                <p id='count'>{count}/100</p>
                <input onChange={(e)=>{setdate(new Date(e.target.value))}} placeholder='Title' type='date' id='atitle'></input>
        <div id='types'>
          <div onClick={()=>{setborder('academic')}} style={border=='academic'?{borderColor:'red'}:null} id='et'>
            <img  id='etm'src={academic}></img>
            <h4 id='namea'>Academic</h4>
          </div>
           <div onClick={()=>{setborder('charity')}} style={border=='charity'?{borderColor:'red'}:null} id='et'>
            <img id='etm'src={charity}></img>
            <h4 id='namea'>Charity</h4>
          </div> <div onClick={()=>{setborder('guest')}} style={border=='guest'?{borderColor:'red'}:null} id='et'>
            <img id='etm'src={guest}></img>
            <h4 id='namea'>Guest</h4>
          </div> <div onClick={()=>{setborder('sports')}} style={border=='sports'?{borderColor:'red'}:null} id='et'>
            <img id='etm'src={sports}></img>
            <h4 id='namea'>Sports</h4>
          </div> <div onClick={()=>{setborder('potluck')}} style={border=='potluck'?{borderColor:'red'}:null} id='et'>
            <img id='etm'src={potluck}></img>
            <h4 id='namea'>Potluck</h4>
          </div> <div onClick={()=>{setborder('cultural')}} style={border=='cultural'?{borderColor:'red'}:null} id='et'>
            <img id='etm'src={cultural}></img>
            <h4 id='namea'>Cultural</h4>
          </div> <div onClick={()=>{setborder('club')}} style={border=='club'?{borderColor:'red'}:null} id='et'>
            <img id='etm'src={club}></img>
            <h4 id='namea'>Club</h4>
          </div>
        </div>
            <button onClick={addevent} id='submit'>Add event</button>

  </div>:null}
  
    </>
  )
}

export default App
