import React from 'react';

const Entry = (props) => {

      return <tr>
        <td> {props.id} </td>
        <td> {props.identity} </td>
        <td> {props.location} </td>
        <td> {props.attempted} </td>
        <td> {props.accepted} </td>
      </tr>
    
};

export default Entry;