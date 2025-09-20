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
import Admin from './Admin'

function App() {
useEffect(()=>{
 async function fetchData(){
  showload(true)
    var request=await axios.get('https://event-app-3-fb1n.onrender.com/')
    var m=request.data
    for(var x=0;x<m.length;x++){
         m.forEach((item,index)=>{
            if(m[index+1]){
                 if(m[index].date>m[index+1].date){
                    var l=m[index]
                    m[index]=m[index+1]
                    m[index+1]=l
             }
            }
         })
    }
    var objects1= request.data.map((ele,ind)=>{
          switch(ele.etype){
            case 'sports':
              return({name:ele.name,sdis:ele.sdis,image:sports,date:new Date(ele.date).toDateString(),ldis:ele.ldis,location:ele.location,key:ele.id})
              break;
            case 'guest':
              return({name:ele.name,sdis:ele.sdis,image:guest,date:new Date(ele.date).toDateString(),ldis:ele.ldis,location:ele.location,key:ele.id})
              break;
            case 'charity':
              return({name:ele.name,sdis:ele.sdis,image:charity,date:new Date(ele.date).toDateString(),ldis:ele.ldis,location:ele.location,key:ele.id})
              break;
            case 'club':
              return({name:ele.name,sdis:ele.sdis,image:club,date:new Date(ele.date).toDateString(),ldis:ele.ldis,location:ele.location,key:ele.id})
              break;
            case 'cultural':
              return({name:ele.name,sdis:ele.sdis,image:cultural,date:new Date(ele.date).toDateString(),ldis:ele.ldis,location:ele.location,key:ele.id})
              break;
            case 'potluck':
              return({name:ele.name,sdis:ele.sdis,image:potluck,date:new Date(ele.date).toDateString(),ldis:ele.ldis,location:ele.location,key:ele.id})
              break;
            case 'academic':
              return({name:ele.name,sdis:ele.sdis,image:academic,date:new Date(ele.date).toDateString(),ldis:ele.ldis,location:ele.location,key:ele.id})
              break;
          }
        })
        console.log(objects1)
        showload(false)
        setfetch(true)
        setallevents(objects1)
        setallfevents(objects1)
        setevents(objects1)
  }
  fetchData()
},[])
var Cdate=new Date();
var cdate=Cdate.toISOString().split('T')[0]
var [allevents,setallevents]=useState([])
var [allfevents,setallfevents]=useState([])
var [border,setborder]=useState('academic')
var [aadd,setaadd]=useState(true)
var [cap,setcap]=useState(false)
var [t,sett]=useState('Submit a request')
var [events,setevents]=useState([])
var [warn,setwarn]=useState(false)
var [username,setusername]=useState()
  var [face,setface]=useState('main')
var [password,setpassword]=useState()
var [value,setvalue]=useState('')
var [sname,setsname]=useState('Request submitted succesfully')
var [value2,setvalue2]=useState('')
var[count,setcount]=useState(0)
var[count2,setcount2]=useState(0)
var[count3,setcount3]=useState(0)
var [date, setdate]=useState()
var [fetch, setfetch]=useState(false)
var [name, setname]=useState()
var [location, setlocation]=useState()
var [marn, setmarn]=useState(false)
var [load,showload]=useState(false)
var [full,showfull]=useState(false)
var [loc, setloc]=useState()
var [contact, setcontact]=useState()
var [para,setpara]=useState()
var [names,setnames]=useState()
var [img,setimg]=useState()
var [del,showdel]=useState(false)
var [edit,showedit]=useState(false)
var [key,setkey]=useState()
var [requests,setrequests]=useState()
var [confirm,setconfirm]=useState(false)
var [fc,setfc]=useState(false)
var [alls,setalls]=useState(false)
var [em,setem]=useState(false)


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
async function session(){
  showload(true)
var request=await axios.post('https://event-app-3-fb1n.onrender.com/submit',{username:'peelschools.org',password:'Helloturner'})
if(request.data=='done'){
}
else{
console.log('ok')
setrequests(request.data)
setface('admin')
setwarn(false)
showload(false)
}
}
function changes(){
  var m=localStorage.getItem('session')
  if(m!='true'){
    setface('auth')
  }
  else{
    session()
  }
}
async function submit(){
showload(true)
var request=await axios.post('https://event-app-3-fb1n.onrender.com/submit',{username:username,password:password.trim()})
if(request.data=='done'){
  setwarn(true)
}
else{
localStorage.setItem('session','true')
setrequests(request.data)
setface('admin')
setwarn(false)
}
showload(false)
}
function dischange(e){
if(e.target.value.length<101){
setvalue(e.target.value)
setcount(e.target.value.length)
}
}
function dischange3(e){
if(e.target.value.length<16){
setname(e.target.value)
setcount3(e.target.value.length)
}
}
function dischange2(e){
if(e.target.value.length<501){
setvalue2(e.target.value)
setcount2(e.target.value.length)
}
}
async function addevent(){
if(cap){
    if(location==''||location==undefined||date==''||date==undefined||value==''||value==undefined||value2==''||value2==undefined||name==''||name==undefined){
setalls(true)
setem(false)
setmarn(false)
 }
 else{
    showload(true)
     var r1=await axios.post('https://event-app-3-fb1n.onrender.com/admin',{name:name,sdis:value,ldis:value2,type:border,date:date.toISOString().split('T')[0],location:location})
     if(r1.data=='done'){
        setlocation('')
        setsname('Added the event!')
    setdate('')
    showload(false)
    setmarn(true)
    setalls(false)
    setcap(false)
    setem(false)
    setTimeout(()=>{
      setmarn(false)
    },2000)
     }
 }
}
else{
    if(location==''||location==undefined||date==''||date==undefined||value==''||value==undefined||value2==''||value2==undefined||name==''||name==undefined||contact==''||contact==undefined){
setalls(true)
setem(false)
setmarn(false)
 }
 else if(contact.slice(-9)!='@pdsb.net'){
setem(true)
setmarn(false)
setalls(false)
 }
 else{
  showload(true)
   var request=await axios.post('https://event-app-3-fb1n.onrender.com/',{contact:contact,name:name,sdis:value,ldis:value2,type:border,date:date.toISOString().split('T')[0],location:location})
   if(request.data=='done'){
    showload(false)
    setmarn(true)
    setalls(false)
    setem(false)
    setTimeout(()=>{
      setmarn(false)
    },2000)
   }
 }
}
}
function back(){
setface('main')
if(fetch){
  showload(false)
}  
else{
  showload(true)
}
showdel(false)
  showwarn(false)
  setfc(false)
  showalls(false)
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
  showload(true)
  var request =await axios.post('https://event-app-3-fb1n.onrender.com/delete',{key:key})
  if(request.data=='done'){
    setfc(true)
    showload(false)
    setTimeout(()=>{
      setfc(false)
      setconfirm(false)
    },2000)
  }
}
function select(e){
  var newarr=allfevents.filter((ele,index)=>{
      if(e.target.value=='All'){
        return true
      }
      else{
         if(ele.date.includes(e.target.value.slice(0,3))&&ele.date.includes(e.target.value.slice(-4))){
            return true;
      }
      }
  })
  setallevents(newarr)
  setevents(newarr)
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
      <select onChange={select} id='dropbox'>
        <option>All</option>
        <option value='Sep 2025'>Sep 2025</option>
        <option value='Oct 2025'>Oct 2025</option>
        <option value='Nov 2025'>Nov 2025</option>
        <option value='Dec 2025'>Dec 2025</option>
      </select>
    </div>
    <div id='main'>
<div id='events'>
  {events.map((ele,index)=>{
return(
  <div data-key={ele.key} id='e'>
{ del?   <button onClick={dels} id='deleted' style={{border:'none',borderRadius:'2px',color:'white',alignSelf:'end'}}>Delete</button>:null}
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
      <button onClick={changes}  id='submit2'>Admin Login</button>
      <button onClick={()=>{setface('request');showload(false);setalls(false)
    setem(false);setmarn(false)
}}  id='submit0'>+</button>
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
  {face=='request'?
  <>  
  <div id='mainadmin'>
          <h1 id='ftitle'>{t}</h1>
{marn?<h3  id='marn'>{sname}</h3>
:null}    
{alls?<h3  id='marn' style={{color:'red'}}>Please fill all the fields</h3>:null}
{em?<h3  id='marn' style={{color:'red'}}>Email not acceptable</h3>:null}
    <input value={name} onChange={dischange3} placeholder='Title' type='text' id='atitle'></input>
                            <p id='count'>{count3}/15</p>
{aadd?<input onChange={(e)=>{setcontact(e.target.value)}} placeholder='Contact email' type='email' id='atitle'></input>
:null}
<input onChange={(e)=>{setlocation(e.target.value)}} placeholder='Location' type='text' id='atitle'></input>
        <textarea id='ldiss' onChange={dischange} value={value} placeholder='Discription...' rows={2}></textarea>
                        <p id='count'>{count}/100</p>
                <textarea id='ldiss' onChange={dischange2} value={value2} placeholder='Discription...' rows={5}></textarea>
                <p id='count'>{count2}/500</p>
                <input min={cdate} onChange={(e)=>{setdate(new Date(e.target.value))}} placeholder='Title' type='date' id='atitle'></input>
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
}    <div  id='btns' style={{display:'flex',gap:'10px'}}><button onClick={fdelete}  id='deletes' >Delete</button>
    <button onClick={()=>{setconfirm(false); showdel(false)}}  id='edits'>Cancel</button>
    </div>
  </div>:null}
{face=='admin'?<Admin setface={setface} t={sett} showdel={showdel} load={showload} requests={requests} cap={setcap} aadd={setaadd}></Admin>:null}
    </>
  )
}

export default App
