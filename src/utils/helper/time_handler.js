
export function timeHandler(s1, s2) {
    
    if (s1.length !== 25 || s2.length !== 25) return false; 
    
    const arrival = new Date(s1); 
    const dept = new Date(s2); 
    
    // Validate valid date objects
    if (isNaN(arrival.getTime()) || isNaN(dept.getTime())) return false; 
    
  
    return arrival.getTime() > dept.getTime();
}
