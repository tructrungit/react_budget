import React, {Component} from 'react';
import NoteDetail from './noteDetail';
import { noteData } from './firebaseConnect';

class NoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            count: 1
        }
    }

    componentWillMount() {
        noteData.on('value', (notes) => {
            var arrayData = [];
            notes.forEach((item) => {
                var data = {};
                data.key = item.key;
                data.title = item.val().title;
                data.content = item.val().content;
                arrayData.push(data);
            });
            this.setState({
                data: arrayData
            })
        })
    }

    loadData() {
        if (this.state.data) {
            return this.state.data.map((value, key) => {
                return (
                    <NoteDetail key={value.key} keyId={value.key} title={value.title} content={value.content}/>
                )
             })
        }
    }

    render() {
        console.log(this.state.data)
        return (
            <div className="col">
                <div id="noteList" role="tablist" aria-multiselectable="true">
                    {this.loadData()}
                </div>
            </div>
        );
    }
}

export default NoteList;