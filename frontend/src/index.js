import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Header from './components/header';
import Footer from './components/footer';
import RecipeReviewCard from './components/feed';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const routing = ( 
  <Router>
    <React.StrictMode>
      <Header/>
      <Switch>
        <Route exact path = '/' component = {App}/>
        <Route exact path = '/login' component = {Login}/>
        <Route exact path = '/register' component = {Register}/>
        <Route exact path = '/feed' component = {RecipeReviewCard}/>
      </Switch>
      <Footer/>
    </React.StrictMode>
  </Router>
);
ReactDOM.render(routing, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
