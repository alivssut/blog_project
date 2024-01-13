import React, { useState, useEffect, memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import ReactQuill, { Quill } from "react-quill";

function Comments(props) {


    return (

        <li class="clearfix">
            <img src="" class="avatar" alt="" />
            <div class="post-comments">
                <p class="meta">{props.date} <Link to={'/author/' + props.comment.owner_username}>{props.comment.owner_username}</Link> says : <i class="pull-right"></i></p>
                <p>
                    <ReactQuill
                        value={props.comment.body}
                        readOnly={true}
                        theme={"bubble"}
                    />
                </p>
            </div>
        </li>

    )
}

export default memo(Comments)