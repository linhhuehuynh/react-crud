import React from 'react'

const UpdatePost = (props) => {
    return (
        <div>
            {props.updateClicked ? 
                    <form onSubmit={props.handleSubmit}>
                    <label>Title</label><br></br>
                    <span><input type="text" id="title" name="title" value={props.title} onChange={props.handleTitle}/></span><br></br>
                    <label>Body</label><br></br>
                    <span><textarea name="body" rows="5" cols="30" value={props.body} onChange={props.handleBody}></textarea><br></br></span>
                    <input type="submit"/>
                </form> : null
        }
        </div>
      );
}
 
export default UpdatePost;