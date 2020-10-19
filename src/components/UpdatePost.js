import React from 'react';

const UpdatePost = (props) => {
    return (
        <div>
            {props.updateClicked ? 
                    <form onSubmit={props.handleSubmit}>
                    <input value={props.title} onChange={props.handleTitle}/>
                    <input value={props.body} onChange={props.handleBody}/>
                    <input type="submit"/>
                </form> : null
        }
        </div>
      );
}
 
export default UpdatePost;