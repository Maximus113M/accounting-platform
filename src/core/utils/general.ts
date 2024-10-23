import { Level } from "src/modules/accounting/modules/accounts/data/models/account";

export const deepClone = <T>(obj: T): T => {
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

export function getLevelName(level: Level){
  switch (level) {
    case Level.class:
      return 'Clase';
    case Level.group:
      return 'Grupo';
    case Level.account:
      return 'Cuenta';
    case Level.sub_account:
      return 'Sub-cuenta';
    case Level.assistant:
      return 'Auxiliar';
    case Level.sub_assistant:
      return 'Sub-auxiliar';
  
    default:
      return ' - - ';
  }
}

const orderedAccountTypes= [
  Level.class,
  Level.group,
  Level.account,
  Level.sub_account,
  Level.assistant,
  Level.sub_assistant,
];

export function getNextLevel(level: Level) {
  const foundIndex= orderedAccountTypes.findIndex((levelItem)=> levelItem === level);
  if(foundIndex > -1){
    if(foundIndex === orderedAccountTypes.length - 1){
      return undefined;
    }
    return orderedAccountTypes[foundIndex+1];
  }
}