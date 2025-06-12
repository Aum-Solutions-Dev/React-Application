import "./App.css";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import Todos from "./components/Todos/Todos.js";
import AddTodo from "./components/AddTodo/AddTodo.js";
import About from "./components/About/About.js";
import Weather from "./components/Weather/Weather.js";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Developer from "./components/Developer/Developer.js";
import Table from "./components/Table/Table.js";
import TeamLeader from "./components/TeamLeader/TeamLeader.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Joke from "./components/Joke/Joke.js";
import CovidData from "./components/CovidData/CovidData.js";
import Login from "./components/Login/Login.js";

function App() {
  /**
   * The useEffect hook checks if an authentication token exists in localStorage when the component mounts.
   * If the token is found, the isAuthenticated state is set to true, rendering the Dashboard component.
   * If not, the Login component is rendered, and upon successful login, it updates the state to true, allowing access to the dashboard.
   */
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    setIsAuthenticated(true);
  }
  /**
   * On app start, it checks localStorage for saved todos.
   * If found, it parses and loads them into state.
   * If not found, it initializes with an empty array.
   */
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  /**
   * Accepts a new title and desc from the form.
   * Generates a unique todoId (by incrementing the last one).
   * Constructs a new todo object.
   * Updates the state by adding the new todo to the existing list.
   * Uses array spread syntax (...todos) to keep existing todos and append a new one.
   */
  const addTodo = (title, desc) => {
    let todoId;
    if (todos.length === 0) {
      todoId = 1;
    } else {
      todoId = todos[todos.length - 1].todoId + 1;
    }
    const myTodo = {
      todoId: todoId,
      title: title,
      desc: desc,
      sCompleted: false,
    };
    setTodos([...todos, myTodo]);
  };

  /**
   * Removes the specified todo from the todos array.
   * Uses .filter() to ewmove the selected todo.
   */
  const onDelete = (todo) => {
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
  };

  /**
   * USE STATE:-
   * Creates a state variable todos that stores the list of todo items.
   * setTodos is the function to update that state.
   * The initial value is whatever was loaded from local storage.
   
   * USEEFFECT:-
   * Runs every time the todos state changes.
   * Saves the latest todos array into localStorage.
   * This keeps your todos persistent even after a page refresh.
   */
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /**
   * Wraps the app in a Router to enable routing.
   * Defines two routes:
   * / (Home): Renders the todo form (AddTodo) and the list (Todos).
   * /about: Shows the About page.
   * Header and Footer are shown on all pages.
   */
  return (
    <>
      <div className="wrapper">
        <Router>
          <div className="main">
            <div className="header">
              <Header title={"SkyTasks"} />
            </div>
            <div className="content-container">
              <Sidebar />
              <div className="content">
                <Routes>
                  <Route
                    path="/login"
                    element={
                      <Login onLoginSuccess={() => setIsAuthenticated(true)} />
                    }
                  />
                  <Route
                    path="/todo"
                    element={
                      <>
                        <AddTodo addTodo={addTodo} />
                        <Todos
                          todos={todos}
                          setTodos={setTodos}
                          onDelete={onDelete}
                        />
                      </>
                    }
                  />
                  <Route
                    exact
                    path="/"
                    element={
                      <>
                        <Home />
                        <Table />
                      </>
                    }
                  />
                  <Route exact path="/joke" element={<Joke />} />
                  <Route exact path="/covid-data" element={<CovidData />} />
                  <Route exact path="/weather" element={<Weather />} />
                  <Route exact path="/about" element={<About />} />
                  <Route exact path="/team-leader" element={<TeamLeader />} />
                  <Route exact path="/developer" element={<Developer />} />
                </Routes>
              </div>
            </div>
            <div className="footer">
              <Footer />
            </div>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
