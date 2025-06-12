import React, { useState } from 'react';

const AddTodo = (props) => {

   const containerStyles = {
      backgroundColor: "#f9f9f9", // Light gray background
      padding: "40px",
      borderRadius: "15px", // More rounded corners
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)", // Soft shadow effect
      maxWidth: "450px", 
      margin: "50px auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "all 0.3s ease-in-out", // Subtle transition effect for smooth hover
   };

    const inputStyles = {
      width: "100%",
      padding: "12px 15px",
      margin: "10px 0",
      border: "1px solid #ddd",
      borderRadius: "10px",
      fontSize: "16px",
      transition: "border-color 0.3s ease", // Smooth transition on focus
   };

   const buttonStyles = {
      width: "100%",
      padding: "12px",
      marginTop: "15px",
      backgroundColor: "#4CAF50", // Green background for button
      border: "none",
      color: "#fff",
      fontSize: "16px",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "background-color 0.3s ease", // Smooth transition on hover
   };

   const buttonHoverStyles = {
      backgroundColor: "#45a049", // Darker green on hover
   };

   // Input focus styles
   const handleFocus = (e) => {
      e.target.style.borderColor = "#4CAF50"; // Green border on focus
   };

   const handleBlur = (e) => {
      e.target.style.borderColor = "#ddd"; // Revert to light gray on blur
   };

   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");

   const submit = (e) => {
      e.preventDefault();  // 
      if (!title || !desc) {
         alert("Title or Description can not be blank");
      }else{
      props.addTodo(title,desc);
      setTitle("");  // By pressing on submit button the page will be re-render and the title will be blank
      setDesc("");}  // By pressing on submit button the page will be re-render and the title will be blank
   }
   

   return (
      <div className='add-todo-container' style={containerStyles}>
         <form onSubmit={submit} style={{ width: "100%" }}>
            <div className="mb-3">
               <h3 style={{ color: "#333" }}>Add a TODO</h3>
               <label htmlFor="title" className="form-label" style={{ color: "#666" }}>Todo Title</label>
               <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title"  style={inputStyles} 
                  onFocus={handleFocus} 
                  onBlur={handleBlur} />
            </div>
            <div className="mb-3">
               <label htmlFor="desc" className="form-label" style={{ color: "#666" }}>Todo Description</label>
               <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="desc"  style={inputStyles} 
                  onFocus={handleFocus} 
                  onBlur={handleBlur}/>
            </div>
            <button type="submit" className="btn btn-sm btn-success" style={buttonStyles}
               onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyles.backgroundColor} // Hover effect
               onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"} // Reset to original color
               >Submit</button>
         </form>
      </div>
   )
};

export default AddTodo;
