import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, remove, onChildAdded, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCF4NX2nvO4hqRdPjOH1a9_j4kBrDD0IWU",
    authDomain: "chat-app-d4fce.firebaseapp.com",
    projectId: "chat-app-d4fce",
    storageBucket: "chat-app-d4fce.appspot.com",
    messagingSenderId: "595254378414",
    appId: "1:595254378414:web:21c6fc3262770e0774d23f",
    measurementId: "G-JCD01Z1PHQ"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const createRoomForm = document.getElementById('create-room-form');

// variables
var msgTxt = document.getElementById('msgTxt');
var sender;
if(sessionStorage.getItem('sender')){
    sender = sessionStorage.getItem('sender');
} else {
    sender = prompt('PASSWORD');
    sender = prompt('Please Enter Your Username')
    sessionStorage.setItem('sender',sender);
}

// TO SEND MESSAGES
module.sendMsg = function sendMsg(){
    var msg = msgTxt.value;
    var timestamp = new Date().getTime();
    set(ref(db,"messages/"+timestamp),{
        msg : msg,
        sender : sender
    })

    msgTxt.value="";
}

// TO RECEIVE MSG
onChildAdded(ref(db,"messages"), (data)=>{
    if(data.val().sender == sender){
        messages.innerHTML += "<div style=justify-content:end class=outer id="+data.key+"><div id=inner class=me>you : "+data.val().msg+"<button id=dltMsg onclick=module.dltMsg("+data.key+")>DELETE</button></div></div>";
    } else {
        messages.innerHTML += "<div class=outer id="+data.key+"><div id=inner class=notMe>"+data.val().sender+" : "+data.val().msg+"</div></div>";
    }
})

// TO DELETE MSG
module.dltMsg = function dltMsg(key){
    remove(ref(db,"messages/"+key));
}

// WHEN MSG IS DELETED
onChildRemoved(ref(db,"messages"),(data)=>{
    var msgBox = document.getElementById(data.key);
    messages.removeChild(msgBox);
})