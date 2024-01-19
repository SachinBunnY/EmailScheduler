import React from "react";
import "./Row.css"
import editBtn from '../assets/editBtn.png';
import dltBtn from '../assets/deleteBtn.png';

interface RowProps{
    mail:any;
    index: number;
    handleEdit:any;
    handleDelete:any;
}

export function Row({mail, index, handleEdit, handleDelete}:RowProps){
    return(
        <tr key={index} className="tableRow">
            <td>{mail.title}</td>
            <td className="tableDesc">{mail.description}</td>
            <td>{mail.subject}</td>
            <td>{mail.schedule}</td>
            <td id="editDltBtn">
                <img className="editBtn" src={editBtn} alt="edit" onClick={()=>handleEdit(index)}></img>
                <img className='dltBtn' src={dltBtn} alt="delete" onClick={()=>{handleDelete(index)}}></img>
            </td>
        </tr>
    )
}