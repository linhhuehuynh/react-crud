import React from 'react';

const NewPost = (props) => {
    return (
        <div>
            <button onClick={props.onCreate}>Create a New Post</button>
            {props.createClicked ? 
                        <form onSubmit={props.handleSubmit}>
                        <label>Title</label><br></br>
                        <input type="text" id="title" name="title" onChange={props.handleChange}/><br></br>
                        <label>Body</label><br></br>
                        <textarea name="body" rows="5" cols="30" onChange={props.handleChange}></textarea><br></br>
                        <input type="submit"/>
                    </form> : null
            }

        </div>
     );
}
 
export default NewPost;