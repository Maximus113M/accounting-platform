class Account {
  id: number|null;
  code: number;
  name: string;
  description: string|null;
  level: Level | undefined;
  nature: Nature | undefined;
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
    level: Level | undefined;
    nature: Nature | undefined;
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

const natureFromJson = (nature: string) : Nature|undefined=>{
  if (nature === 'acreedora') return Nature.creditor;
  else if (nature === 'deudora') return Nature.debtor;
}

const levelFromJson = (level: string) : Level|undefined=>{
  if (level === 'clase') return Level.class;
  else if (level === 'grupo') return Level.group;
  else if (level === 'cuenta') return Level.account;
  else if (level === 'subcuenta') return Level.sub_account;
  else if (level === 'auxiliar') return Level.assistant;
  else if (level === 'subauxiliar') return Level.sub_assistant;
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


export { Account, accountFromJson }
