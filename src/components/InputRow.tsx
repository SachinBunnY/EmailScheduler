import React from "react";
import './InputRow.css'
import saveIcon from '../assets/saveIcon.png';
import cancelIcon from '../assets/cancelIcon.png';

interface InputProps{
    index: number;
    handleCancel:any;
    handleInputChange:any;
    editFormData:any;
    handleSaveChange:any;
}
export function InputRow({ index, handleCancel, handleInputChange,editFormData,handleSaveChange}:InputProps){
    return(
        <tr key={index} className="tableRow">
            <td><input className="inputRow" type="text" value={editFormData.title} onChange={(e:any)=>handleInputChange(e, 'title')}></input></td>
            <td><input className="inputRow" type="text" value={editFormData.description} onChange={(e:any)=>handleInputChange(e, 'description')}></input></td>
            <td><input className="inputRow" type="text" value={editFormData.subject} onChange={(e:any)=>handleInputChange(e, 'subject')}></input></td>
            <td><input className="inputRow" type="text" value={editFormData.schedule} onChange={(e:any)=>handleInputChange(e, 'schedule')}></input></td>
            <td className="saveAndCancelBtn">
                <img className="saveBtn" src={saveIcon} alt="save" onClick={handleSaveChange}/>
                <img className="cutBtn" src={cancelIcon} alt="cancel" onClick={handleCancel} />
            </td>
        </tr>
    )
}