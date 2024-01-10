import React, { useState } from 'react';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import ImageUploader from "quill-image-uploader";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button } from 'react-bootstrap'
Quill.register("modules/imageUploader", ImageUploader);

export default function RichTextEditor() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [urlTitle, setUrlTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [image, setImage] = useState('');
    const handleChange = (content) => {
        setContent(content);
        console.log(content)
    };

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
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // انجام عملیات مربوط به ثبت فرم
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

          <Form.Group controlId="urlTitle">
          <label>

          Category

          {/* <select value={value} onChange={handleCategoryChange}>

            <option value="fruit">Fruit</option>

            <option value="vegetable">Vegetable</option>

            <option value="meat">Meat</option>

          </select> */}

          </label>
          </Form.Group>

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
              onChange={handleChange}
              modules={modules}
              formats={formats}
            />
        </Form.Group>

        <Button variant="primary" type="submit">
          ارسال
        </Button>
      </Form>
    </div>
  );
}