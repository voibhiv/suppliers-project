interface UserProps {
  id?: string;
  name: string;
  username: string;
  password: string;
  email: string;
  cpf: string;
  cnpj: string;
  description: string;
}

export class UserDomain {
  id?: string;
  name: string;
  username: string;
  password: string;
  email: string;
  cpf: string;
  cnpj: string;
  description: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.username = props.username;
    this.password = props.password;
    this.email = props.email;
    this.cpf = props.cpf;
    this.cnpj = props.cnpj;
    this.description = props.description;
  }
}
