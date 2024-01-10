import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import ImageUploader from "quill-image-uploader";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button } from 'react-bootstrap'
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import { Multiselect } from "multiselect-react-dropdown";
import { useNavigate  } from 'react-router-dom';

Quill.register("modules/imageUploader", ImageUploader);

export default function RichTextEditor() {
    const [content, setContent] = useState('');
    const [contentErrorMessage, setContentErrorMessage] = useState('');
    const [title, setTitle] = useState('');
    const [titleErrorMessage, setTitlerrorMessage] = useState('');
    const [urlTitle, setUrlTitle] = useState('');
    const [urlTitleErrorMessage, setUrlTitleErrorMessage] = useState('');
    const [summary, setSummary] = useState('');
    const [summaryErrorMessage, setSummaryErrorMessage] = useState('');
    const [image, setImage] = useState('');
    const [imageErrorMessage, setImageErrorMessage] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoriesErrorMessage, setCategoriesErrorMessage] = useState([]);
    const [categoriesSlected, setCategoriesSelected] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagsErrorMessage, setTagsErrorMessage] = useState([]);
    const [error, setError] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

      axios({
          method: "get",
          url: "http://localhost:8000/api/v1/auth/user/",
          headers: { "Content-Type": "multipart/form-data", "authorization": "token " + localStorage.getItem('token')
        },
        }).then((response) => {


          axios.get("http://localhost:8000/api/v1/categories/").then((response) => {
            if (response.status === 200 ){
              const convertedJson = response.data.results.map(item => {
                return Object.keys(item).reduce((acc, key) => {
                  if (key === 'id') {
                    acc['key'] = item[key];
                  } else if (key === 'name') {
                    acc['value'] = item[key];
                  }
                  return acc;
                }, {});
              });
              setCategoryOptions(convertedJson)
            
            }
          }).catch((error) => console.log(error));


        }).catch((error) => {
          if (error.response.status === 401)
              navigate("/login/");
        });
    



    }, []); 


    const modules = {
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }, { direction: 'ltr' }], // text direction
    
            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, false] }],
    
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['link', 'video'],
            ['clean'],
          ],
        }
      };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'script',
    'indent',
    'direction',
    'align',
    'link',
    'image',
    'video',
  ];

  const handleContentChange = (content) => {
    setContent(content);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleUrlTitleChange = (event) => {
    setUrlTitle(event.target.value);
  };
  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    setImageFile(file)
  };

  const handleCategorySelect = (selectedList, selectedItem) => {
      const selectedKeys = selectedList.map(item => item.key);
      setCategoriesSelected(selectedKeys)
      setCategories(selectedList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('slug', urlTitle);
    bodyFormData.append('body', content);
    bodyFormData.append('summary', summary);
    bodyFormData.append('tags', tags);
    bodyFormData.append('image', imageFile);
    bodyFormData.append('category', categoriesSlected);
    axios({
      method: "post",
      url: "http://localhost:8000/api/v1/posts/create/",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data", "authorization": "token " + localStorage.getItem('token')
    },
    })
      .then(function (response) {
        if (response.status === 201){
          navigate("/posts/"+response.data.id);
        }
      })
      .catch(function (error) {
        //handle error
        if(error.response.data.hasOwnProperty('title')){
          setTitlerrorMessage(error.response.data.title.join(', '))
        }else{
          setTitlerrorMessage('')
        }
        if(error.response.data.hasOwnProperty('summary')){
          setSummaryErrorMessage(error.response.data.summary.join(', '))
        }else{
          setSummaryErrorMessage('')
        }
        if(error.response.data.hasOwnProperty('body')){
          setContentErrorMessage(error.response.data.body.join(', '))
        }else{
          setContentErrorMessage('')
        }
        if(error.response.data.hasOwnProperty('slug')){
          setUrlTitleErrorMessage(error.response.data.slug.join(', '))
        }else{
          setUrlTitleErrorMessage('')
        }
        if(error.response.data.hasOwnProperty('image')){
          setImageErrorMessage(error.response.data.image.join(', '))
        }else{
          setImageErrorMessage('')
        }
        if(error.response.data.hasOwnProperty('category')){
          setCategoriesErrorMessage(error.response.data.category.join(', '))
        }else{
          setCategoriesErrorMessage('')
        }
        if(error.response.data.hasOwnProperty('tags')){
          setTagsErrorMessage(error.response.data.tags.join(', '))
        }else{
          setTagsErrorMessage('')
        }
      });
  };

  return (

      <div>
      <Form onSubmit={handleSubmit}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter the title"
              maxLength="200"
            />
            <p className='text-danger'>{titleErrorMessage}</p>
          </Form.Group>

          <Form.Group controlId="summary">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              as="textarea"
              value={summary}
              onChange={handleSummaryChange}
              placeholder="Enter the summary"
              maxLength="800"
            />
            <p className='text-danger'>{summaryErrorMessage}</p>
          </Form.Group>

          <Form.Group controlId="urlTitle">
            <Form.Label>Url title</Form.Label>
            <Form.Control
              type="text"
              value={urlTitle}
              onChange={handleUrlTitleChange}
              placeholder="Enter the url title (slug)"
              maxLength="800"
            />
            <p className='text-danger'>{urlTitleErrorMessage}</p>
          </Form.Group>

          <Form.Group controlId="category">
          <label>
          Category
            <Multiselect
            options={categoryOptions}
            selectedValues={categories}
            onSelect={handleCategorySelect}
            onRemove={handleCategorySelect}
            displayValue="value"
          />
          </label>
          <p className='text-danger'>{categoriesErrorMessage}</p>
          </Form.Group>

          <Form.Group controlId="tags">
          <label>
          Tags
          <TagsInput
            value={tags}
            onChange={setTags}
            name="tags"
            placeHolder="enter tags"
          />
      </label>
      <p className='text-danger'>{tagsErrorMessage}</p>
      </Form.Group> 
          
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            <p className='text-danger'>{imageErrorMessage}</p>
          </Form.Group>
          
          {image && (
            <div style={{ marginTop: '10px' }}>
              <img src={image} alt="تصویر انتخاب شده" style={{ maxWidth: '100%' }} />
            </div>
          )}
      </div>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <ReactQuill
              value={content}
              onChange={handleContentChange}
              modules={modules}
              formats={formats}
            />
            <p className='text-danger'>{contentErrorMessage}</p>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p>{error}</p>
      </Form>
    </div>
  );
}