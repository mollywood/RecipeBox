import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js';
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
    showEdit: false,
    currentIndex: 0,
    newRecipe:{recipeName:"", ingredients:[], directions:[]}
  }

  //deletes recipe
  deleteRecipe(index){
    let recipes = this.state.recipes.slice()
    recipes.splice(index, 1)
    this.setState({recipes})
  }

  //updates new recipe
  updateNewRecipe(recipeName, ingredients, directions){
    this.setState({newRecipe:{recipeName: recipeName, ingredients: ingredients, directions: directions}})
  }

  //saves a new recipe to recipes
  saveNewRecipe(){
    let recipes = this.state.recipes.slice()
    recipes.push({recipeName:this.state.newRecipe.recipeName, ingredients: this.state.newRecipe.ingredients, directions: this.state.newRecipe.directions})
    this.setState({recipes})
    this.setState({newRecipe: {recipeName: "", ingredients: [], directions: []}})
    this.close()
  }

  //edits a recipe name
  updateRecipeName(recipeName, currentIndex){
    let recipes = this.state.recipes.slice()
    recipes[currentIndex] = {recipeName: recipeName, ingredients: recipes[currentIndex].ingredients, directions: recipes[currentIndex].directions}
    this.setState({recipes})
  }

  //edits recipe ingredients
  updateIngredients(ingredients, currentIndex){
    let recipes = this.state.recipes.slice()
    recipes[currentIndex] = {recipeName:recipes[currentIndex].recipeName, ingredients:ingredients, directions: recipes[currentIndex].directions}
    this.setState({recipes})
  }

  //edits recipe directions
  updateDirections(directions, currentIndex){
    let recipes = this.state.recipes.slice()
    recipes[currentIndex] = {recipeName: recipes[currentIndex].recipeName, ingredients: recipes[currentIndex].ingredients, directions: directions}
    this.setState({recipes})
  }

  //closes a modal
  close = () => {
    if(this.state.showAdd){
      this.setState({showAdd: false})
    }
    else if(this.state.showEdit){
      this.setState({showEdit: false})
    }
  }

  //opens a modal
  open = (state, currentIndex) => {
    this.setState({[state]: true})
    this.setState({currentIndex})
  }

  render() {
    const {recipes, newRecipe, currentIndex} = this.state;
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
                    <Button bsStyle="default" onClick={(event) => this.open("showEdit", index)}>Edit Recipe</Button>
                  </ButtonToolbar>
                </Panel.Body>
              </Panel>
              
              
            ))}
          </Accordion>

          <Modal show={this.state.showEdit} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Recipe</Modal.Title>
                  <Modal.Body>
                    <FormGroup controlId="formBasicText">
                      <ControlLabel>Recipe Name</ControlLabel>
                      <FormControl
                      type="text" 
                      value={recipes[currentIndex].recipeName}
                      placeholder="Enter Text"
                      onChange={(event) => this.updateRecipeName(event.target.value, currentIndex)}
                      ></FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsTextArea">
                      <ControlLabel>Recipe Ingredients</ControlLabel>
                      <FormControl
                      type="textarea" 
                      value={recipes[currentIndex].ingredients}
                      placeholder="Enter Recipe Ingredients"
                      onChange={(event) => this.updateIngredients(event.target.value.split(","), currentIndex)}
                      ></FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsTextArea">
                      <ControlLabel>Recipe Directions</ControlLabel>
                      <FormControl
                      type="textarea" 
                      value={recipes[currentIndex].directions}
                      placeholder="Enter Recipe Directions"
                      onChange={(event) => this.updateDirections(event.target.value.split(","), currentIndex)}
                      ></FormControl>
                    </FormGroup>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={(event) => this.close()}>Save</Button>
                  </Modal.Footer>
                </Modal.Header>
              </Modal>

          {/* add recipe modal */}
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

          <Button bsStyle="primary" onClick={(event) => this.open("showAdd", currentIndex)}>Add Recipe</Button>

        </div>
      </div>
    );
  }
}

export default App;
