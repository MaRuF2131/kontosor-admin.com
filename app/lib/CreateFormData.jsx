export const CreateFormData = async (data) => {
    try { 
        const newData= new FormData();
        Object.entries(data).forEach(([key,value]) => {
        if(key==="image" || key==="video"){
            newData.append(key,value[0]);
            return;
        }
        newData.append(key,value);
        });  

    return newData;
    } catch (error) {
        console.error("Error on create form data:", error);
        throw error;
    }
};