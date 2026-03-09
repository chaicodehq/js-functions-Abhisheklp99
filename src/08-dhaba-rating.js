/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
export function createFilter(field, operator, value) {
  // Your code here

  if(![ ">", "<", ">=", "<=", "==="].includes(operator)) return ()=>{return false};

  return (obj)=>{
     const val = obj[field];
    if (val == null) return false;

    if(operator==='<'){

      return val < value   
    }
    else if(operator==='>'){

      return val > value   
    }
    else if(operator==='>='){
      return val >= value   
      
    }
    else if(operator==='<='){
      return val <= value   
      
    }
    else {
      return val === value   

    }
  }


}

export function createSorter(field, order = "asc") {
  // Your code here

  // if(order.toLowerCase() ==='asc'){

  //   return (a,b)=>{
  //     const val1=a[field];
  //     const val2=b[field];
  //     if(!val1) return -1;
  //     if(!val2) return -1;
  //     return val1 -val2
  //   }
    
    
  // }
  // else if(order.toUpperCase() ==='desc'){
    
    
  //   return (a,b)=>{
  //     const val1=a[field];
  //     const val2=b[field];
  //     if(!val1) return -1;
  //     if(!val2) return -1;
  //     return val2 -val1
  //   }


  // }
  // else {
    
  // }

  
 const isAscTrue= order.toLowerCase() === "asc";
  
  return (a, b) => {
    const val1 = a[field];
    const val2 = b[field];
    

    if (val1 == null) return 1;
    if (val2 == null) return -1;
    
    if (isAscTrue) {
      return val1 > val2 ? 1 : val1 < val2 ? -1 : 0;
    } else {
      return val2 > val1 ? 1 : val2 < val1 ? -1 : 0;
    }
  };

}

export function createMapper(fields) {
  // Your code here
return (obj)=>{
 return fields.reduce((acc,item)=>{

  if(item in obj){
    acc[item] =obj[item]
  }
return acc
 },{})
}
  


}

export function applyOperations(data, ...operations) {
  // Your code here

  if(!Array.isArray(data)) return [];
  let res=data
// for(let i=0;i<operations.length;i++){
//   res.push(operations[i](data))
// }
// return res
for(let i=0;i<operations.length;i++){
  res=operations[i](res)
}
return res


}
