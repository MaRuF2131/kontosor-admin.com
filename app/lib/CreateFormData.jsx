export const CreateFormData = async (data) => {
    try { 
        const newData= new FormData();
        Object.entries(data).forEach(([key,value]) => {
        if(key==="image" || key==="video" || key==='thumbnail' || key==='audio' ||key==="pdf" || key==="coverImage" || key==="profileImage"||key==="cv"){
            console.log(key,value);           
            newData.append(key,value[0]);
            return;
        }
        console.log("no",key,value);
        
        newData.append(key,value);
        });  

    return newData;
    } catch (error) {
        console.error("Error on create form data:", error);
        throw error;
    }
};