import React from "react";
import './Table.css';
import { Row } from "./Row";
import { InputRow } from "./InputRow";

interface TableProps {
  mails: any[];
  isEditable: number;
  setIsEditable: (isEditable: number) => void;
  handleEdit:any;
  handleDelete:any;
  handleInputChange:any;
  editFormData:any;
  handleSaveChange:any;
  handleCancel:any
}

export function Table({ mails, isEditable, handleEdit, handleDelete, handleInputChange, editFormData, handleSaveChange,handleCancel }: TableProps) {
  
  return (
    <div id="dataTableDiv">
      <table>
        <thead id="tableHead">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Subject</th>
            <th>Schedule</th>
            <th>Actions</th>
          </tr>
        </thead>
        {mails.length > 0 && (
        <tbody id="tableBody">
          {mails.map((mail: any, index: number) => {
            return (<>
              {isEditable !== index ? 
              (<Row mail={mail} index={index} handleEdit={handleEdit} handleDelete={handleDelete}/>):
              (<InputRow index={index} handleCancel={handleCancel} 
              handleInputChange={handleInputChange} editFormData={editFormData} handleSaveChange={handleSaveChange} />)}
              </>);
          })}
        </tbody>
        )}
      </table>
    </div>
  );
}
