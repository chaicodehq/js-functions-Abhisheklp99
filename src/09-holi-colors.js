/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
 *   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
//  *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
//  *   // red and blue objects are UNCHANGED
 */
export function mixColors(color1, color2) {
  // Your code here
if (
    !color1 || !color2 ||
    typeof color1.name !== 'string' || typeof color2.name !== 'string' ||
    typeof color1.r !== 'number' || typeof color1.g !== 'number' || typeof color1.b !== 'number' ||
    typeof color2.r !== 'number' || typeof color2.g !== 'number' || typeof color2.b !== 'number'
  ) {
    return null;
  }
  // .filter((item)=>typeof item ==='number').reduce((acc,item) =>acc+item  ,0) / 3
//   const res={};

//   let val1=Object.values(color1).filter((item)=>typeof item ==='number')
//   let val2=Object.values(color2).filter((item)=>typeof item ==='number')
// if(val1.length === val2.length){
//   for(let i=0;i<val1.length;i++){
//     if(i===0){
//     res['r']= Math.round((val1[i] +val2[i])/2)
//   }
//   else if(i===1){
//     res['b']= Math.round((val1[i] +val2[i])/2)
//   }else{    
//     res['g']= Math.round((val1[i] +val2[i])/2)
// }

//   }



// }

// return {name:`${color1.name}-${color2.name}`,...res}

return {
    name: `${color1.name}-${color2.name}`,
    r: Math.round((color1.r + color2.r) / 2),
    g: Math.round((color1.g + color2.g) / 2),
    b: Math.round((color1.b + color2.b) / 2)
  };


}


console.log();


export function adjustBrightness(color, factor) {
  // Your code here

  if(!color || typeof factor !=="number") return null;

  return {
    name:color.name,
  r: Math.round(Math.max(0, Math.min(color.r * factor, 255))),
    g: Math.round(Math.max(0, Math.min(color.g * factor, 255))),
    b: Math.round(Math.max(0, Math.min(color.b * factor, 255))),
  }



}

export function addToPalette(palette, color) {
  // Your code here
  if(!Array.isArray(palette)) return [color];
  if(!color) return [...palette]

  return [...palette,color]
}

export function removeFromPalette(palette, colorName) {
  // Your code here

  if(!Array.isArray(palette)) return [];

  return palette.filter((color)=>color.name !==colorName)


}

export function mergePalettes(palette1, palette2) {
  // Your code here
const p1 = Array.isArray(palette1) ? palette1 : [];
  const p2 = Array.isArray(palette2) ? palette2 : [];
  let res=[...p1,...p2];
return res.filter((color, index, arr) => (
    index === arr.findIndex((item) => item.name === color.name) 
  ));
}
