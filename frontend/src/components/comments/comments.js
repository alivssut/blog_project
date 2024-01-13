import React, { useState, useEffect, memo, useCallback } from 'react'
import './../../static/css/comments.css'
import CommentCard from './commentCard';
import axios from "axios";
import CommentCreate from './CommentCreate';

function Comments(props) {
    const [comments, setComments] = useState([]);

    useEffect(() => {

        axios({
            method: "get",
            url: "http://localhost:8000/api/v1/posts/" + props.postSlug + "/comments/",
            headers: {
                "Content-Type": "multipart/form-data", "authorization": "token " + localStorage.getItem('token')
            },
        }).then((response) => {
            const data = response.data;
            const data_ = data.results.map(item => {
                const owner_id = item.owner.id;
                const owner_first_name = item.owner.first_name;
                const owner_last_name = item.owner.last_name;
                const owner_username = item.owner.username;
                const newItem = {
                    ...item,
                    owner_id: owner_id,
                    owner_first_name: owner_first_name,
                    owner_last_name: owner_last_name,
                    owner_username: owner_username,
                };
                delete newItem.owner;
                return newItem
            })
            setComments(data_)
        }).catch((error) => {
        });
    }, []);


    return (
        <div class="container bootstrap snippets bootdey">
            <div class="row">
                <div class="col-md-12">
                    <div class="blog-comment">
                        <h3 class="text-success">Comments</h3>
                        <hr />
                        <CommentCreate postId={props.postId} />
                        <ul class="comments">
                            {comments.map((comment) => {
                                const date = new Date(comment.created)
                                const formattedDate = date.toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric"
                                })
                                return (
                                    <CommentCard comment={comment} date={formattedDate} />
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Comments)