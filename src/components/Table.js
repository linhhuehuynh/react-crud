import React from 'react';

const table = (props) => {
    return (
        <tr>
                        <td>{props.id}</td>
                        <td>{props.title}</td>
                        <td>{props.body}</td>
                        <td><button className="button buttontext" onClick={props.onUpdate}> Update</button></td>
                        <td><button className="button buttontext" onClick={props.onDelete}>Delete</button></td>
        </tr>
      );
}
 
export default table;