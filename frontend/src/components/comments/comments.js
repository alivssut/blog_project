import React, { useState, useEffect, memo, useCallback } from 'react'
import './../../static/css/comments.css'
import CommentCard from './commentCard';
import axios from "axios";

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
            setComments(data.results)
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
                                    <CommentCard comment={comment} date={formattedDate}/>
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