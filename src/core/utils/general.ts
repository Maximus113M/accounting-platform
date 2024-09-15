export const  deepClone = <T>(obj: T): T =>{
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
  
    if (obj instanceof Date) {
      return new Date(obj.getTime()) as any;
    }
  
    if (Array.isArray(obj)) {
      return obj.map(item => deepClone(item)) as any;
    }
  
    if (obj instanceof Set) {
      return new Set([...obj].map(item => deepClone(item))) as any;
    }
  
    if (obj instanceof Map) {
      return new Map([...obj.entries()].map(([key, value]) => [deepClone(key), deepClone(value)])) as any;
    }
  
    const objCopy: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        objCopy[key] = deepClone((obj as any)[key]);
      }
    }
  
    return objCopy;
  }