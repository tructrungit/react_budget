import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyCx4B03-fq1wgp317Jg3LvnXqe8IOpn3JA",
    authDomain: "note-react-c91cd.firebaseapp.com",
    databaseURL: "https://note-react-c91cd.firebaseio.com",
    projectId: "note-react-c91cd",
    storageBucket: "note-react-c91cd.appspot.com",
    messagingSenderId: "886103754924",
    appId: "1:886103754924:web:172632bb5c48e48fa53709",
    measurementId: "G-82XJMNWSKJ"
};
// Initialize Firebase
export const firebaseConnect = firebase.initializeApp(firebaseConfig);
export const expenseData = firebase.database().ref('expense');
export const salary = firebase.database().ref('salary');
export const monthlyEarning = firebase.database().ref('monthlyEarning');





// push data ex1, using set function: must input name == note3 after noteData/
// var data = firebase.database().ref('noteData/note3');
// data.set({
//     id: 3,
//     title: 'Title 3 created',
//     content: 'Content 3 created'
// })

// push data ex2, using push function, firebase will automatically generate name for node
// var data = firebase.database().ref('noteData');
// data.push({
//     id: 4,
//     title: 'Title auto generated created',
//     content: 'Content auto generated created'
// })

// edit data
// var data = firebase.database().ref('noteData/note3');
// data.set({
//     id: 1,
//     title: 'Title 1 edited',
//     content: 'Content 1 edited'
// })

// get data
// var data = firebase.database().ref('noteData');
// data.once('value').then((snapshot) => {
//     console.log(snapshot.val());
// })

// delete data
// var data = firebase.database().ref('noteData');
// data.child('-M9WaZSfCmwZnTyFfpby').remove();