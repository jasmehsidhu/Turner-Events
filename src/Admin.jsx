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
import './index.css'
import axios from 'axios'

function Admin({requests,setface,showdel,load,aadd,cap,t}) {
    
    var [request,setrequest]=useState([])
        var [contacts,setcontacts]=useState()
     var [s,sets]=useState(true)
        var [ct,setct]=useState(false)
        var [reason,setreason]=useState(false)
        var [reas,setreas]=useState()
        var [acc,showacc]=useState(false)
                var [key,setkey]=useState()
    useEffect(()=>{
function load(){
    if(requests!=undefined && requests.length!=0){
        setrequest(requests)
    }
    else if(requests==undefined){
        setct(true)
        sets(false)
    }
    else if(requests.length==0){
        console.log('done')
        setct(true)
        sets(false)
    }
}
load()
    },[])
   async function accept(e){
      var parent=e.target.parentElement;
      var parent2=parent.parentElement;
      var key=parent2.getAttribute('data-key')
      var image,name,location,sdis,ldis,etype,date,contact;
      request.map((ele,index)=>{
         if(ele.id==key){
            image=ele.etype;
            name=ele.name;
            location=ele.location
            sdis=ele.sdis
            ldis=ele.ldis
            etype=ele.etype
            date=ele.date
            contact=ele.contact
         }
      })
      var Object={id:key,name:name,location:location,sdis:sdis,ldis:ldis,date:date,etype:etype,contact:contact}
      load(true)
      var data=await axios.post('https://event-app-7.onrender.com/main',Object)
      if(data.data=='done'){
        var newarr=request.filter((ele,index)=>{
    if(ele.id!=Object.id){
        return ele
    }
})
if(newarr.length==0){
    setct(true)
}
load(false)
setrequest(newarr)
      showacc(true)
      setTimeout(()=>{
         showacc(false)
      },2000)
      }
  }
  async function reject(e){
setreason(true)
var parent=e.target.parentElement.parentElement;
var key=parent.getAttribute('data-key')
setkey(key)
request.map((ele)=>{
if(ele.id==key){
    setcontacts(ele.contact)
}
})

  }
  function dele(e){
setface('main')
showdel(true)
}
  async function freject(e){
load(true)
var data=await axios.post('https://event-app-7.onrender.com/reject',{reason:reas,contact:contacts,key:key})
 var newarr=request.filter((ele,index)=>{
    if(ele.id!=key){
        return ele
    }
})
if(newarr.length==0){
    setct(true)
}
load(false)
setrequest(newarr)
setreason(false)
  }
async function adadd(){
     cap(true)
     setface('request')
     aadd(false)
     t('Add an event')
  }
  return (
    <>
<section id='console'>
    <div id='setb'>
                                <button onClick={adadd} id='deletem'>Add Events</button>
            <button onClick={dele} id='delete'>Delete Events</button>
    </div>
    {ct?<h1 id='cp'>You are all caught up for the notifications!</h1>:null}
{acc?   
         <h1 style={{color:'green'}}>Accepted the request!</h1>
:null}  
  {s?request.map((ele,index)=>{
        return(
            <div data-key={ele.id} id='req'>
        <h1 id='names'>Title: {ele.name} </h1>
        <h1 id='dates'>Date: {ele.date} </h1>
        <h1 id='locations'>Location: {ele.location} </h1>
        <p id='sdis'><span style={{fontWeight:'bold'}}>Short Discription:</span> {ele.sdis} </p>
        <p id='ldis'><span style={{fontWeight:'bold'}}>Long Discription:</span> {ele.ldis} </p>
<div id='buttons'><button  id='accept' onClick={accept}>Accept</button>
<button onClick={reject}  id='reject'>Reject</button></div>
    </div>
        )
    }):null}
   {reason? <div id='reason'>
        <h1 onClick={()=>{setreason(false)}} style={{alignSelf:'end',color:'black',cursor:'pointer'}}>x</h1>
        <h2>Please provide the reason</h2>
        <textarea onChange={(e)=>{setreas(e.target.value)}} id='st' rows={2}></textarea>
<button onClick={freject} id='rejectss'>Reject</button>    </div>:null}
</section>
    </>
  )
}

export default Admin

