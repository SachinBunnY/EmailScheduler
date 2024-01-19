import React, { useEffect, useState } from 'react';
import './App.css';
import jsonData from './data.json';
import { Table } from './components/Table';
import { Form } from './components/Form';
import searchIcon from'./assets/searchBarIcon.png';
import addIcon from './assets/addIcon.png'
interface Mail {
  title: string;
  description: string;
  subject: string;
  schedule:string;
}


function App() {
  const[mails, setMails] = useState<Array<Mail>>([]);
  const[isEditable, setIsEditable] = useState<any>('');
  const[filteredData, setFilteredData] = useState<Array<Mail>>([]);
  const[isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [editingIndex, setEditingIndex] = useState(null);
  const[newFormData, setNewFormData] = useState({
    title: "",
    description: "",
    subject: "",
    schedule: "",
  });

  const[editFormData, setEditFormData] = useState<any>({
    title: '',
    description: '',
    subject: '',
    schedule: '',
  });
  
  useEffect(()=>{
    setMails(jsonData);
    setFilteredData(jsonData);
  },[])



  const onCrossClick = ()=>{
    let checkBox:any = document.querySelector("#checkBox")
    if(checkBox["checked"] === true){
      checkBox["checked"] = false;
    }
    setNewFormData({
      title: "",
      description: "",
      subject: "",
      schedule: "",
    });
    setIsSubmitted(false)
  }

  const handleEdit = (index:any)=>{
    if(isEditable!=""){
      setIsEditable("")
    }else{
      setIsEditable(index)
    }
    setEditFormData({...filteredData[index]});
    setEditingIndex(index);
  }
  const handleCancel = ()=>{
    setEditingIndex(null);
    setIsEditable("")
  }

  const handleDelete = (index:number)=>{
    let data:any = filteredData.filter((data:any, dataIndex:any)=>{
      return dataIndex!=index;
    })
    setFilteredData(data)
  }

  const handleSearch = (e:any)=>{
    let userSearch:string = e.target.value;
    let filterData:any = mails.filter((mail:any)=>{
      return mail["title"].toLowerCase().indexOf(userSearch.toLowerCase())>-1;
    })
    setFilteredData(filterData);
  }

  const onSubmitClick = (selectedRepeat:string,selectedTime:string)=>{
    if(newFormData.title!='' && newFormData.description!='' && newFormData.subject!='' && selectedRepeat!=''&&selectedTime!=''){
      setNewFormData({...newFormData, schedule:`${selectedRepeat} at ${selectedTime}`});
      setIsSubmitted(true);
      setMails((prev)=>[...prev, newFormData]);
      setFilteredData((prev)=>[...prev, newFormData]);
      setNewFormData({
        title: "",
        description: "",
        subject: "",
        schedule: "",
      });
      onCrossClick();
    }
  }

  const handleInputChange = (e:any, fieldName:string) => {
    const value = e.target.value;
    console.log( "VALUE:", value);
    
    setEditFormData((prevData:any) => ({ ...prevData, [fieldName]: value }));
  };

  const handleSaveChange = (e:any) => {

    if (editingIndex !== null) {
      // If editing, update the item in the array
      const updatedMails = [...filteredData];
      updatedMails[editingIndex] = editFormData;
      setFilteredData(updatedMails);
      setEditingIndex(null);
    } 
    // Reset the form data
    setEditFormData({
      title: '',
      description: '',
      subject: '',
      schedule: '',
    });
    handleCancel()
  };

  return (
    <div className="App">
      <header id="parentContainer">
        <div id="topBar"></div>
        <div id="mainContainer">
            <div id="leftSideDiv"></div>
            <div id="middleContainer">
              <div id="middleTopBar"></div>
              <div id="mainDiv">
                <div id="searchBarAndAddBtnDiv">
                  <div id="searchBarDiv">
                    <input id='searchBar' type='text' placeholder='Search title' onChange={handleSearch}></input>
                    <img id='lensIcon' src={searchIcon} alt='search'/>
                  </div>
                  <div id="btnDiv">
                    <img id='plusIcon' src={addIcon} alt='add' />
                    <input id="checkBox" type='checkbox' ></input>
                    <div id='addBtn'>Add</div>
                    <div className='model'>
                      <Form onCrossClick={onCrossClick} onSubmitClick={onSubmitClick} setNewFormData={setNewFormData} newFormData={newFormData} isSubmitted={isSubmitted}/>
                    </div>
                  </div>
                </div>
                <Table mails={filteredData} isEditable={isEditable} setIsEditable={setIsEditable} handleEdit={handleEdit}
                 handleDelete={handleDelete} handleInputChange={handleInputChange} editFormData={editFormData} handleSaveChange={handleSaveChange} handleCancel={handleCancel}/>
              </div>
            </div>
        </div>
      </header>
    </div>
  );
}

export default App;
