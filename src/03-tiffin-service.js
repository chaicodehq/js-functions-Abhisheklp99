/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
//  *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here

  if(typeof mealType!=='string' || !mealType || !name || typeof name !=='string' || name ===''|| !['veg','nonveg','jain'].includes(mealType.toLocaleLowerCase())) return null;
  const dailyRate= mealType.toLowerCase()==='veg'? 80:
mealType.toLowerCase()==='nonveg' ? 120 :90;
const totalCost=dailyRate * days;

  return {name,mealType,days,dailyRate,totalCost}

  }





export function combinePlans(...plans) {
  // Your code here

  if( !plans || plans.length===0 ) return null

    let totalCustomers=0;
let totalRevenue=0;
let mealBreakdown={}
const newPlan = plans.reduce((acc,plan)=>{
 if(plan.name){
      acc.totalCustomers=(acc.totalCustomers || 0 )  +1
    }
     if(plan.totalCost){
      acc.totalRevenue=(acc.totalRevenue || 0)+  plan.totalCost
    }
    if(plan.mealType.toLowerCase()==='veg'){
      acc.mealBreakdown.veg=( acc.mealBreakdown.veg  || 0) +1;
    }
    if(plan.mealType.toLowerCase()==='nonveg'){
    acc.mealBreakdown.nonveg=(acc.mealBreakdown.nonveg || 0) +1;
    }

return acc

 },{totalCustomers, totalRevenue, mealBreakdown:{} })
  

  // return { totalCustomers, totalRevenue, mealBreakdown }

  return newPlan;


//   let totalCustomers=0;
// let totalRevenue=0;
// let mealBreakdown={}
  // for(let i of plans){
  //   for(let plan of i){

  //     if(plan.name){
  //     totalCustomers+=1
  //   }
  //    if(plan.totalCost){
  //     totalRevenue+=plan.totalCost
  //   }
  //   if(plan.mealType.toLowerCase()==='veg'){
  //     mealBreakdown.veg=(mealBreakdown.veg || 0) +1;
  //   }
  //   if(plan.mealType.toLowerCase()==='nonveg'){
  //     mealBreakdown.nonveg=(mealBreakdown.nonveg || 0) +1;
  //   }


  //   }

  }



export function applyAddons(plan, ...addons) {
  // Your code here

  if(!plan) return null;

const newPlans={...plan};


const addOnTotalPrice=addons && addons.reduce((acc,item)=>{
return acc+item.price
},0)

newPlans.dailyRate=newPlans.dailyRate + addOnTotalPrice;
newPlans.totalCost=newPlans.dailyRate* newPlans.days;

newPlans.addonNames=addons.reduce((acc,item)=>{
  // console.log(item.name ,acc)
  acc.push(item.name);
  return acc
},[])


return newPlans


}
