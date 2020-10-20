import React from 'react';

const UpdatePost = (props) => {
    return (
        <div>
            {props.updateClicked ? 
                    <form onSubmit={props.handleSubmit}>
                    <label>Title</label><br></br>
                    <input value={props.title} onChange={props.handleTitle}/><br></br>
                    <label>Body</label><br></br>
                    <textarea name="body" rows="5" cols="30" value={props.body} onChange={props.handleBody}></textarea><br></br>
                    <input type="submit"/>
                </form> : null
        }
        </div>
      );
}
 
export default UpdatePost;