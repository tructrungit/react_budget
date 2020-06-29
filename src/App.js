import React, {Component} from 'react';
import './App.css';
import firebaseConnect, {noteData} from "./firebaseConnect";
import Menu from "./component/menu";
import NoteList from "./component/noteList";
import NoteForm from "./component/noteForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    pushData = (item) => {
        noteData.push(item);
        noteData.once('value').then((snapshot) => {
          console.log(snapshot.val())
        })
    }

    render() {
        // noteData.once('value').then((snapshot) => {
        //   console.log(snapshot.val())
        // })
        return (
            <div>
                <Menu/>
                <div className="container">
                    <div className="row">
                        <NoteList/>
                        <NoteForm getData={(item) => this.pushData(item)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
