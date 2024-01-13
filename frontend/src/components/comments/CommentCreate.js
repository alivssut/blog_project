import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import ImageUploader from "quill-image-uploader";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button } from 'react-bootstrap'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

Quill.register("modules/imageUploader", ImageUploader);

export default function CommentCreate(props) {
    const [content, setContent] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState('');
    const [userUsername, setUserUsername] = useState('');
    const [userFirstName, setIsUserFirstName] = useState('');
    const [userLastName, setIsUserLastName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        axios({
            method: "get",
            url: "http://localhost:8000/api/v1/auth/user/",
            headers: {
                "Content-Type": "multipart/form-data", "authorization": "token " + localStorage.getItem('token')
            },
        }).then((response) => {
            setIsLogin(true);
            setUserId(response.data.pk);
            setUserUsername(response.data.username);
            setIsUserFirstName(response.data.first_name);
            setIsUserLastName(response.data.last_name);
        }).catch((error) => {
            if (error.response.status === 401)
                setIsLogin(false);
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
                ['link'],
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
    ];
    const handleContentChange = (content) => {
        setContent(content);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append('body', content);
        bodyFormData.append('post', props.postId);
        axios({
            method: "post",
            url: "http://localhost:8000/api/v1/comments/create/",
            data: bodyFormData,
            headers: {
                "Content-Type": "multipart/form-data", "authorization": "token " + localStorage.getItem('token')
            },
        })
            .then(function (response) {
                if (response.status === 201) {
                    setContent('')
                }
            })
            .catch(function (error) {
                //handle error

            });
    };
    if (!isLogin) {
        return (<div>To post a comment, login first</div>);
    }

    return (
        <div>
            <Form onSubmit={handleSubmit} style={{ 'margin-bottom': '20px' }}>
                <Form.Group controlId="content">
                    <ReactQuill
                        style={{ 'background-color': "snow" }}
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