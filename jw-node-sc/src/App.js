import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import Projects from './Projects/Projects';
import Actions from './Actions/Actions';

class App extends Component {
  constructor(){
    super();
    this.state = {
      projects: [],
      actions: []
    }
  }

componentWillMount(){
  axios
  .get('http://localhost:4000/api/projects')
  .then(res => {
    console.log(res)
    this.setState({ projects: res.data })
  })
  .catch(err => {
    console.log(err);
  })

  axios
  .get('http://localhost:4000/api/actions')
  .then(res => {
    console.log(res)
    this.setState({ actions: res.data })
  })
  .catch(err => {
    console.log(err);
  })
}


  render() {
    console.log(this.state.projects)
    console.log(this.state.actions)
    return (
      <div className="App">
        <Route exact path="/" render={() => {
          return (
            <div>
              <h1>Here is the root!</h1>
              <Link to="/projects">To Projects</Link>
              <Link to="/actions">To Actions</Link>
            </div>
          )
        }} />
        <Route path="/projects" render={() => {
          return <Projects projects={this.state.projects} actions={this.state.actions} />
        }} />
        <Route path="/actions" render={() => {
          return <Actions actions={this.state.actions} />
        }} />
      </div>
    );
  }
}

export default App;
