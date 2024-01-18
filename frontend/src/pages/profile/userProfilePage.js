import React from 'react';
import { useState, useEffect } from "react";
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import './../../static/css/userProfile.css'
import Image from 'react-bootstrap/Image';
import PostList from '../../components/posts/postList';
import PaginationComponent from '../../components/pagination';

export default function UserProfile(props) {
    const { userId } = useParams();
    const [avatarUrl, setAvatarUrl] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [joinedDate, setJoinedDate] = useState('');
    const [aboutUser, setAboutUser] = useState('');
    const [email, setEmail] = useState('');
    const [posts, setPosts] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/user/" + userId).then((response) => {
            if (response.status === 200) {
                setAvatarUrl(response.data.avatar)
                setUsername(response.data.username)
                setFirstName(response.data.first_name)
                setLastName(response.data.last_name)
                const date = new Date(response.data.date_joined)
                const formattedDate = date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                })
                setJoinedDate(formattedDate)
                setAboutUser(response.data.about_user)
                setEmail(response.data.email)
            }
        }).catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/user/" + userId + "/posts?page=" + currentPage).then((response) => {
            if (response.status === 200) {
                setPosts(response.data.results)
                setCount(response.data.count)
            }
        }).catch((error) => console.log(error));
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='user-profile-container'>
            <div className='user-profile-about' >
                <div className='user-profile-avatar'>
                    <Image src={"http://localhost:8000/" + avatarUrl} roundedCircle />
                </div>
                <div>
                    <h3>{username}</h3>
                    <h6>{firstName} {lastName}</h6>
                    <p>{aboutUser}</p>
                    <p>{email}</p>
                    <p>joined date: {joinedDate}</p>
                </div>
            </div>
            { count ?
                <div className='user-profile-posts'>
                    <PostList posts={posts} />
                    <PaginationComponent count={count} currentPage={currentPage} handlePageChange={handlePageChange} contentPerPage={5} />
                </div>
                :
                <div></div>
            }

        </div>
    );
}
