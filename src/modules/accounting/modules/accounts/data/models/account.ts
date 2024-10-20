class Account {
  id: number|null;
  code: number;
  name: string;
  description: string|null;
  level: Level;
  nature: Nature;
  father_id: number | null;
  serial_company: number | null;
  children: Account[] | [];

  constructor({
    id,
    code,
    name,
    description,
    level,
    nature,
    father_id,
    serial_company,
    children,
  } : {
    id: number|null;
    code: number;
    name: string;
    description: string | null;
    level: Level;
    nature: Nature;
    father_id: number | null;
    serial_company: number | null;
    children: Account[];
  }) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.level = level;
    this.nature = nature;
    this.father_id = father_id;
    this.serial_company = serial_company;
    this.children = children;
  }
}

const accountToJson = (account: Account) =>{
  return {
    codigo: account.code,
    nombre: account.name,
    descripcion: account.description,
    nivel: levelToJson(account.level),
    naturaleza: natureToJson(account.nature),
    padre_id: account.father_id,
    empresa_serial: account.serial_company,
  };
}

const accountFromJson= (json: any) : Account =>{
  const descendants : any[] = json.descendants;
  return new Account({
    id: json.id,
    code: json.codigo,
    name: json.nombre,
    description: json.descripcion,
    level: levelFromJson(json.nivel),
    nature: natureFromJson(json.nature),
    father_id: json.padre_id,
    serial_company: json.empresa_serial,
    children: descendants.length !== 0 ? descendants.map((item)=> {
      return accountFromJson(item);
    }) : [],
  });
}

const natureToJson =  (nature: Nature) : string =>{
  if (nature === Nature.debtor) return "deudora"
  //else if (nature === Nature.creditor)
  return "acreedora";
}

const natureFromJson = (nature: string) : Nature=>{
  if (nature === 'acreedora') return Nature.creditor;
  //else if (nature === 'deudora') return Nature.debtor;
  else return Nature.debtor;
}

const levelToJson = (level: Level) : string | null =>{
  if (level === Level.class) return 'clase';
  else if (level === Level.group) return 'grupo';
  else if (level === Level.account) return 'cuenta';
  else if (level === Level.sub_account) return 'subcuenta';
  else if (level === Level.assistant) return 'auxiliar';
  //else if (level === Level.sub_assistant) return 'subauxiliar';
  else return 'subauxiliar';
}

const levelFromJson = (level: string) : Level=>{
  if (level === 'clase') return Level.class;
  else if (level === 'grupo') return Level.group;
  else if (level === 'cuenta') return Level.account;
  else if (level === 'subcuenta') return Level.sub_account;
  else if (level === 'auxiliar') return Level.assistant;
  //else if (level === 'subauxiliar') return Level.sub_assistant;
  else return Level.sub_assistant;
}

enum Level {
  class = 'class',
  group = 'group',
  account = 'account',
  sub_account = 'sub_account',
  assistant = 'assistant',
  sub_assistant = 'sub_assistant',
}

enum Nature {
  creditor = 'creditor',
  debtor = 'debtor',
}


export { Account, accountFromJson, accountToJson, Level, Nature }
