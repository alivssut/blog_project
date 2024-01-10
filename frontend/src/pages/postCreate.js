import React, { useCallback, useRef, useState } from 'react';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import ImageUploader from "quill-image-uploader";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button } from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable';
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import { Multiselect } from "multiselect-react-dropdown";

Quill.register("modules/imageUploader", ImageUploader);

export default function RichTextEditor() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [urlTitle, setUrlTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoriesSlected, setCategoriesSelected] = useState([]);
    const [tags, setTags] = useState([]);


    const options = [
      { key: 1, value: 'Option1' },
      { key: 2, value: 'Option2' },
      { key: 3, value: 'Option3' },
    ];

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
      headers: { "Content-Type": "multipart/form-data", "authorization": "token 8d603a78f3a342f4dca0bb2b81fb609b82ccf1e4"
    },
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (response) {
        //handle error
        console.log(response);
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
          </Form.Group>

          <Form.Group controlId="category">
          <label>
          Category
            <Multiselect
            options={options}
            selectedValues={categories}
            onSelect={handleCategorySelect}
            onRemove={handleCategorySelect}
            displayValue="value"
          />
          </label>
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
      </label></Form.Group> 
          
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
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
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}