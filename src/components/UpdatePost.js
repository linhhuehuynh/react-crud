import React from 'react';

const UpdatePost = (props) => {
    return (
        <div>
            {props.updateClicked ? 
                    <form onSubmit={props.handleSubmit}>
                    <h3>EDIT POST {props.id}</h3>
                    <label>Title</label><br></br>
                    <input className="textbox" value={props.title} onChange={props.handleTitle}/><br></br>
                    <label>Body</label><br></br>
                    <textarea className="textbox" name="body" rows="10" cols="50" value={props.body} onChange={props.handleBody}></textarea><br></br>
                    <input className="button buttontext" type="submit"/>
                    {/* <input onClick={props.handleCancel} className="button buttontext" value="Cancel" type="button"/>                     */}
                </form> : null
        }
        </div>
      );
}
 
export default UpdatePost;