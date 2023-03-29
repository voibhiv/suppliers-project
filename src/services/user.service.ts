import UserDomain from "@src/domain/user.domain";
import { BadRequestError, NotFoundError } from "@src/errors/errors.format";
import IUserRepo from "@src/repos/user.repos";
export class UserService {
  private repository: IUserRepo;
  
  constructor (repository: IUserRepo){
    this.repository = repository;
  }

  public async createUser(user: UserDomain): Promise<UserDomain> {
    const requiredFields = ["name", "username", "password", "email", "cpf", "cnpj"];

    // Verify if some of the fields required are not filled
    let invalidFields = "";
    for (const [key, value] of Object.entries(user)) {
      if (value === "" && requiredFields.includes(key)) {
        invalidFields += ((invalidFields === "") ? `${key}` : `, ${key}`);
      }
    }

    // Throw a Errow if exists invalidFields
    if (invalidFields) {
      throw new BadRequestError(`Existem campos inválidos: [${invalidFields}], verifique-os e tente novamente!`);
    }

    const newUser = this.repository.saveUser(user);
    
    // Throw a Errow if fail operation
    if (!newUser) {
      throw new NotFoundError("Erro na criação do Usuário, tente novamente mais tarde");
    }

    return newUser;

  }
}
