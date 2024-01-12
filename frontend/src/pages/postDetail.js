import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import './postDetail.css';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.bubble.css'
import "./../static/css/postdetail.css";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const [id, setId] = useState();
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('');
  const [summary, setSummary] = useState('');
  const [ownerId, setOwnerId] = useState();
  const [created, setCreated] = useState('');
  const [updated, setUpdated] = useState('');
  const [slug, setSlug] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    axios({
      method: "get",
      url: "http://localhost:8000/api/v1/posts/" + postId + "/id/",
      headers: {
        "Content-Type": "multipart/form-data", "authorization": "token " + localStorage.getItem('token')
      },
    }).then((response) => {
      const data = response.data;
      setTitle(data.title);
      setBody(data.body);
      setCategories(data.category.map(item => [{ "id": item.id, "name": item.name }]))

      setTags(data.tags);
      setId(data.id);
      setImageUrl(data.image);
      setOwnerId(data.owner.id);
      setSlug(data.slug);
      const date = new Date(data.created)
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
      })
      setCreated(formattedDate)
      date = new Date(data.updated)
      formattedDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
      })
      setUpdated(formattedDate)
    }).catch((error) => {
    });
  }, []);

  useEffect(() => {

    // console.log("Changed Widgets: ", categories)

  }, [categories])

  if (!title) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className="post-detail-container">
      <h1 className="post-detail-heading">{title}</h1>
      <div className='post-detail-categories'>
        {categories.map((category, index) => (
          <Link to={'/categories/' + category[0].id} className='post-detail-link'>
            <span key={index} className="post-detail-category">{category[0].name} . </span>
          </Link>
        ))}
      </div>
      <p>last update: {created}</p>
      <img className="post-detail-image" src={imageUrl} alt="post" />
      <div class="post-detail-tags">
        {tags.map((tag, index) => (
          <Link to={'/tags/' + tag} className='post-detail-link'>
            <span key={index} className="post-detail-tag">{tag}</span>
          </Link>
        ))}
      </div>
      <div className='post-detail-body'>
        <ReactQuill
          value={body}
          readOnly={true}
          theme={"bubble"}
        />
      </div>
      <div className="post-detail-author">
        <h4>Written by: {ownerId}</h4>
      </div>
    </div>
  );
};

export default PostDetail;