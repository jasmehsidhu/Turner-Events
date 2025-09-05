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
              return({name:ele.name,sdis:ele.sdis,image:sports,date:ele.date,ldis:ele.ldis,location:ele.location,key:ele.id})
              break;
            case 'guest':
              return({name:ele.name,sdis:ele.sdis,image:guest,date:ele.date,ldis:ele.ldis,location:ele.location,key:ele.id})
              break;
            case 'charity':
              return({name:ele.name,sdis:ele.sdis,image:charity,date:ele.date,ldis:ele.ldis,location:ele.location,key:ele.id})
              break;
            case 'club':
              return({name:ele.name,sdis:ele.sdis,image:club,date:ele.date,ldis:ele.ldis,location:ele.location,key:ele.id})
              break;
            case 'cultural':
              return({name:ele.name,sdis:ele.sdis,image:cultural,date:ele.date,ldis:ele.ldis,location:ele.location,key:ele.id})
              break;
            case 'potluck':
              return({name:ele.name,sdis:ele.sdis,image:potluck,date:ele.date,ldis:ele.ldis,location:ele.location,key:ele.id})
              break;
            case 'academic':
              return({name:ele.name,sdis:ele.sdis,image:academic,date:ele.date,ldis:ele.ldis,location:ele.location,key:ele.id})
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
var [value2,setvalue2]=useState('')
var[count,setcount]=useState(0)
var[count2,setcount2]=useState(0)
var [date, setdate]=useState()
var [name, setname]=useState()
var [location, setlocation]=useState()
var [marn, setmarn]=useState(false)
var [load,showload]=useState(false)
var [full,showfull]=useState(false)
var [loc, setloc]=useState()
var [para,setpara]=useState()
var [names,setnames]=useState()
var [img,setimg]=useState()
var [del,showdel]=useState(false)
var [edit,showedit]=useState(false)
var [key,setkey]=useState()
var [confirm,setconfirm]=useState(false)
var [fc,setfc]=useState(false)


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
if(e.target.value.length<101){
setvalue(e.target.value)
setcount(e.target.value.length)
}
}
function dischange2(e){
if(e.target.value.length<501){
setvalue2(e.target.value)
setcount2(e.target.value.length)
}
}
async function addevent(){
   var request=await axios.post('https://event-app-3-fb1n.onrender.com/',{name:name,sdis:value,ldis:value2,type:border,date:date.toDateString(),location:location})
   if(request.data=='done'){
    setmarn(true)
   }
}
function back(){
  setface('main')
}

function fullviews(e){
showfull(true)
var item=e.target.parentElement;
setnames(item.children[1].innerText)
setimg(item.children[0].getAttribute('src'))
events.map((ele,index)=>{
 if(item.getAttribute('data-key')==ele.key){
  setloc(ele.location)
  setpara(ele.ldis)
 }
})
}
function dels(e){
var item=e.target.parentElement;
setkey(item.getAttribute('data-key'))
setconfirm(true)
}
function dele(e){
setface('main')
showdel(true)
}
async function fdelete(){
  var request =await axios.post('https://event-app-3-fb1n.onrender.com/delete',{key:key})
  if(request.data=='done'){
    setfc(true)
  }
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
return(
  <div data-key={ele.key} id='e'>
{ del?   <button onClick={dels} id='delete' style={{border:'none',borderRadius:'2px',color:'white',alignSelf:'end'}}>Delete</button>:null}
{edit?<button id='edit' style={{border:'none',borderRadius:'2px',color:'white',alignSelf:'end'}}>Edit</button>:null}
    <img id='emg' src={ele.image}></img>
    <h1 id='title'>{ele.name}</h1>
    <h2 id='date'>📅 {ele.date.slice(4)}</h2>
    <p id='dis'>{ele.sdis}</p>
    <button onClick={(fullviews)} id='submit3'>View details</button>
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
  {face=='admin'?
  <>  <div id='setb'>
            <button onClick={dele} id='delete'>Delete Events</button>

    </div>
  <div id='mainadmin'>
          <h1 id='ftitle'>ADMIN CONSOLE</h1>
{marn?<h3  id='marn'>Event added succesfully</h3>
:null}        <input onChange={(e)=>{setname(e.target.value)}} placeholder='Title' type='text' id='atitle'></input>
<input onChange={(e)=>{setlocation(e.target.value)}} placeholder='Location' type='text' id='atitle'></input>
        <textarea onChange={dischange} value={value} placeholder='Discription...' rows={2}></textarea>
                        <p id='count'>{count}/100</p>
                <textarea onChange={dischange2} value={value2} placeholder='Discription...' rows={5}></textarea>
                <p id='count'>{count2}/500</p>
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

  </div></>:null}
{full?  <div id='fullview'>
  <h1 onClick={()=>{showfull(false)}} style={{marginTop:'-30px',alignSelf:'end',cursor:'pointer'}}>X</h1>
    <img id='fimage' src={img}></img>
    <h1 className='headings'>{names}</h1>
        <h2 className='headings'>📍{loc}</h2>
        <p style={{marginTop:'10px'}} id='dis'>{para}
</p>
  </div>:null}
{confirm?  <div id='confirm'>
    <h1 style={{margin:0}}>Are you sure?</h1>
{
  fc?    <h4 style={{margin:0}} id='warn'>Deletion succesfully</h4>
:null
}    <div onClick={fdelete} id='btns' style={{display:'flex',gap:'10px'}}><button style={{backgroundColor:'crimson'}} id='deletes' >Delete</button>
    <button style={{backgroundColor:'#0a1c4dff'}} id='edits'>Cancel</button>
    </div>
  </div>:null}
    </>
  )
}

export default App
