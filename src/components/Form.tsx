import React, { useEffect, useState } from "react";
import './Form.css';

interface FormProps{
    onCrossClick:any;
    onSubmitClick:any;
    setNewFormData:any;
    newFormData:any;
    isSubmitted:boolean;
}

export function Form({onCrossClick, onSubmitClick, setNewFormData, newFormData, isSubmitted}:FormProps){
    const [selectedFrequency, setSelectedFrequency] = useState<string>("Weekly");
    const [selectedRepeat, setSelectedRepeat] = useState<string>("");
    const [isActive, setIsActive] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<any>("10:00AM")

    useEffect(()=>{
        if(isSubmitted){
            setSelectedFrequency("Weekly");
            setSelectedRepeat("");
            setIsActive("");
        }
    },[isSubmitted])

    const handleFrequencyChange = (e:any)=>{
        e.preventDefault();
        setSelectedFrequency(e.target.value);
    }
    const handleRepeatChange = (e:any)=>{
        e.preventDefault();
        setSelectedRepeat(e.target.value);
    }
    const handleRepeatWeekChange = (value:string)=>{
        setSelectedRepeat(value)
        setIsActive(value)
    }
    const handleTimeChange = (e:any)=>{
        e.preventDefault();
        setSelectedTime(e.target.value)
    }
    
    return(
        <>
            <p id='addSchedule'>Add Schedule</p>
            <form className='modelForm' onSubmit={(e)=>{e.preventDefault()}}>
                <div className='inputSections'>
                    <label className='labels'>Title</label>
                    <input className='inputs' placeholder="Sample Title" value={newFormData.title} onChange={(e) => {
                        setNewFormData({ ...newFormData, title: e.target.value });
                        }}></input>
                </div>
                <div className='inputSections'>
                    <label className='labels'>Description</label>
                    <input className='inputs onlyForDesc' placeholder='Lorem ipsum dolor sit amet,\r\nconsectetur adipiscing alit.'
                        value={newFormData.description}
                        onChange={(e) => {
                        setNewFormData({ ...newFormData, description: e.target.value });
                        }}></input>
                </div>
                <div className='inputSections'>
                    <label className='labels'>Subject</label>
                    <input className='inputs' placeholder="Sample Subject"
                    value={newFormData.subject}
                    onChange={(e) => {
                      setNewFormData({ ...newFormData, subject: e.target.value });
                    }}></input>
                </div>
                <div className='inputSections'>
                    <label className='labels'>Frequency</label>
                    <select name="frequency" id="frequency" className="inputs" value={selectedFrequency} onChange={handleFrequencyChange}>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Daily">Daily</option>
                    </select>
                </div>
                <div className='inputSections'>
                    <label className='labels'>Repeat</label>
                    {selectedFrequency==='Weekly'?<div className="repeatDiv">
                        <button className={isActive==='Sunday'?"repeatBtns active": "repeatBtns"} onClick={()=>{handleRepeatWeekChange("Sunday")}}>S</button>
                        <button className={isActive==='Monday'?"repeatBtns active": "repeatBtns"} onClick={()=>{handleRepeatWeekChange("Monday")}}>M</button>
                        <button className={isActive==='Teusday'?"repeatBtns active": "repeatBtns"} onClick={()=>{handleRepeatWeekChange("Teusday")}}>T</button>
                        <button className={isActive==='Wednesday'?"repeatBtns active": "repeatBtns"} onClick={()=>{handleRepeatWeekChange("Wednesday")}}>W</button>
                        <button className={isActive==='Thrusday'?"repeatBtns active": "repeatBtns"} onClick={()=>{handleRepeatWeekChange("Thrusday")}}>T</button>
                        <button className={isActive==='Friday'?"repeatBtns active": "repeatBtns"} onClick={()=>{handleRepeatWeekChange("Friday")}}>F</button>
                        <button className={isActive==='Saturday'?"repeatBtns active": "repeatBtns"} onClick={()=>{handleRepeatWeekChange("Saturday")}}>S</button>
                    </div>:
                    selectedFrequency==='Monthly'?
                    <div>
                        <select name="frequency" id="frequency" className="inputs" value={selectedRepeat} onChange={handleRepeatChange}>
                            <option value="First Monday">First Monday</option>
                            <option value="Last Friday">Last Friday</option>
                        </select>   
                    </div>:
                    <div style={{width: "13.5rem"}}>
                        <button className={isActive==='Daily'?"dailyBtn active": "dailyBtn"} onClick={()=>{handleRepeatWeekChange("Daily")}}>Daily</button>
                    </div>}
                </div>
                <div className='inputSections'>
                    <label className='labels'>Time</label>
                    <select name="frequency" id="frequency" className="inputs" value={selectedTime} onChange={handleTimeChange}>
                        <option value="10:00AM" >10:00AM</option>
                    </select>
                </div>
            </form>
            <div className='btnSection'>
                <button className='cancelBtn textDesign' onClick={()=>{onCrossClick()}}>Cancel</button>
                <button className='doneBtn textDesign' onClick={()=>{onSubmitClick(selectedRepeat,selectedTime)}}>Done</button>
            </div>
        </>
    )
}