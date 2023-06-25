import React from 'react';

class NoteFormInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    }

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value
      }
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value
      }
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    const validationResult = this._validateData();
    if(validationResult == ''){
      this.props.addNote(this.state);
      this._clearData();
    } else {
      alert(validationResult);
    }
  }

  _clearData(){
    this.setState(() => {
      return {
        title: '',
        body: ''
      }
    });
  }

  _validateData(){
    let validationMessage = '';
    if(this.state.title.length < 1 || this.state.title.length > 50) validationMessage = 'Judul harus diisi 1 - 50 karakter.'
    return validationMessage;
  }

  render() {
    return (
      <form className='note-input' onSubmit={this.onSubmitEventHandler}>
        <input type="text" placeholder="Judul" value={this.state.title} onChange={this.onTitleChangeEventHandler} />
        <small>Karakter: {this.state.title.length} / 50</small>
        <input type="text" placeholder="Catatan" value={this.state.body} onChange={this.onBodyChangeEventHandler} />
        <small>Karakter: {this.state.body.length}</small>
        <button type="submit">Tambah</button>
      </form>
    )
  }
}

export default NoteFormInput;