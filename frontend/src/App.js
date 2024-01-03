import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Footer from './components/footer/footer'
import NavigationBar from './components/navBar/NavigationBar'
import HomePage from './pages/homePage'
import Login from './pages/auth/login'
import PostList from './components/posts/postList'
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/auth/register';
import PostPage from './pages/post';
import PostDetail from './pages/postDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        {/* <PostList /> */}
        <Routes > 
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="login" element={<Login/>} />
          <Route exact path="register" element={<Register/>} />
          <Route exact path="posts" element={<PostPage/>} />
          <Route exact path="posts/:postId" element={<PostDetail/>} />
        </Routes >
        <Footer />
      </Router>
    </div>
  );
}

export default App;
