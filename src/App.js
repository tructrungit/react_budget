import React, {Component} from 'react';
import './App.css';
import Menu from "./component/menu";
import NoteList from "./component/noteList";
import NoteForm from "./component/noteForm";

class App extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <div className="container">
                    <div className="row">
                        <NoteList/>
                        <NoteForm/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
