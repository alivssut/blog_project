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
import RichTextEditor from './pages/postCreate';
import CategoryPosts from './pages/categoryPosts';
import TagPosts from './pages/tagPosts';
import UserProfile from './pages/profile/userProfilePage';

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
          <Route exact path="posts/create" element={<RichTextEditor/>} />
          <Route exact path="category/:categorySlug" element={<CategoryPosts/>} />
          <Route exact path="tag/:tagSlug" element={<TagPosts/>} />
          <Route exact path="user/:userId" element={<UserProfile/>} />
        </Routes >
        <Footer />
      </Router>
    </div>
  );
}

export default App;
