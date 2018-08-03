import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';



class App extends Component {

  state ={
    recipes: [
      {recipeName: 'Moms Spaghetti', 
      ingredients: ['Spaghetti', 'Ground Beef', 'Canned Tomatoes'],
      directions: ['Brown ground beef in pan', 'Add canned tomatoes and crush']} , 
      {recipeName: 'Moms Spaghetti 2', 
      ingredients: ['Spaghetti', 'Ground Beef', 'Canned Tomatoes'],
      directions: ['Brown ground beef in pan', 'Add canned tomatoes and crush']}
    ],
    showAdd: false,
    newRecipe:{recipeName:"", ingredients:[], directions:[]}
  }

  deleteRecipe(index){
    let recipes = this.state.recipes.slice()
    recipes.splice(index, 1)
    this.setState({recipes})
  }

  updateNewRecipe(recipeName, ingredients, directions){
    this.setState({newRecipe:{recipeName: recipeName, ingredients: ingredients, directions: directions}})
  }

  saveNewRecipe(){
    let recipes = this.state.recipes.slice()
    recipes.push({})
    this.setState({recipes})
    this.setState({newRecipe: {recipeName: "", ingredients: [], directions: []}})
    this.close()
  }

  close = () => {
    if(this.state.showAdd){
      this.setState({showAdd: false})
    }
  }

  open = (state) => {
    this.setState({[state]: true})
  }

  render() {
    const {recipes, newRecipe} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">The Recipe Box</h1>
        </header>
        <div className="container">
          <Accordion>
            {recipes.map((recipe, index) => (
              <Panel eventKey = {index} key = {index}>
                <Panel.Heading>{recipe.recipeName}</Panel.Heading>
                <Panel.Body>
                  <ul>
                    {recipe.ingredients.map((ingredient) =>
                      <li key={ingredient}>{ingredient}</li>
                    )}
                  </ul>
                  <ol>
                    {recipe.directions.map((direction) =>
                      <li key= {index}>{direction}</li>
                    )}
                  </ol>
                  <ButtonToolbar>
                    <Button bsStyle="danger" onClick={(event) => this.deleteRecipe(index)}>Delete Recipe</Button>
                    <Button bsStyle="default">Edit Recipe</Button>
                  </ButtonToolbar>
                </Panel.Body>
              </Panel>
            ))}
          </Accordion>

          <Modal show={this.state.showAdd} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Add Recipe</Modal.Title>
              <Modal.Body>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Recipe Name</ControlLabel>
                  <FormControl
                  type="text" 
                  value={newRecipe.recipeName}
                  placeholder="Enter Recipe Name"
                  onChange={(event) => this.updateNewRecipe(event.target.value, newRecipe.ingredients, newRecipe.directions)}
                  ></FormControl>
                </FormGroup>
                <FormGroup controlId="formControlsTextArea">
                  <ControlLabel>Recipe Ingredients</ControlLabel>
                  <FormControl
                  type="textarea" 
                  value={newRecipe.ingredients}
                  placeholder="Enter Recipe Ingredients"
                  onChange={(event) => this.updateNewRecipe(newRecipe.recipeName, event.target.value.split(","), newRecipe.directions)}
                  ></FormControl>
                </FormGroup>
                <FormGroup controlId="formControlsTextArea">
                  <ControlLabel>Recipe Directions</ControlLabel>
                  <FormControl
                  type="textarea" 
                  value={newRecipe.directions}
                  placeholder="Enter Recipe Directions"
                  onChange={(event) => this.updateNewRecipe(newRecipe.recipeName, newRecipe.ingredients, event.target.value.split(","))}
                  ></FormControl>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={(event) => this.saveNewRecipe()}>Save</Button>
              </Modal.Footer>
            </Modal.Header>
          </Modal>

          <Button bsStyle="primary" onClick={(event) => this.open("showAdd")}>Add Recipe</Button>

        </div>
      </div>
    );
  }
}

export default App;
