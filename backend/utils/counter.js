import  Count  from "../model/Count.js";

const increaseCount = async(fieldname) => {
  try{
     const fieldExist = await Count.findOne({ countName:fieldname });
        if (!fieldExist) {
          // throw
          throw new Error("field not exists");
        }
      //  console.log(fieldExist) 
      //  console.log(fieldExist._id) 
       const newValue = fieldExist.countValue + 1
      //  console.log(newValue)
    
      const updateCount = await Count.findByIdAndUpdate(fieldExist._id, {
          countValue: newValue
      });
      await updateCount.save();
      return newValue
  } catch (error){
     return "Counter not increase"
  }
};

export default increaseCount;



export const decreaseCount = async(fieldname) => {
  try{
     const fieldExist = await Count.findOne({ countName:fieldname });
        if (!fieldExist) {
          // throw
          throw new Error("field not exists");
        }
      //  console.log(fieldExist) 
      //  console.log(fieldExist._id) 
       const newValue = fieldExist.countValue - 1
      //  console.log(newValue)
    
      const updateCount = await Count.findByIdAndUpdate(fieldExist._id, {
          countValue: newValue
      });
      await updateCount.save();
      return newValue
  } catch (error){
     return "Counter not increase"
  }
};