import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Footer from './components/footer/footer'
import NavigationBar from './components/navBar/NavigationBar'
import HomePage from './pages/homePage'
import PostList from './components/posts/postList'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <HomePage />
        <PostList />
        {/* <header className="App-header">
        
        </header> */}
        {/* <Switch> */}
          {/* <Route exact path="/" component={Body} /> */}
        {/* </Switch> */}
        <Footer />
        {/* <Body/> */}
      </Router>
    </div>
  );
}

export default App;
