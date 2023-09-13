import { Account, AccountInstance } from "../models/account.model";

export default class AccountService {
  public getAccountByUsername = async (
    username: string
  ): Promise<AccountInstance> => {
    try {
      const account = await Account.findOne({
        where: {
          username: username,
        },
      });

      if (!account) throw new Error("Account not found");

      return account;
    } catch (err) {
      throw err;
    }
  };

  public getAccountById = async (id: number): Promise<AccountInstance> => {
    try {
      const account = await Account.findOne({
        where: {
          id: id,
        },
      });

      if (!account) throw new Error("Account not found");

      return account;
    } catch (err) {
      throw err;
    }
  };

  public updateAccountStatus = async (
    account: AccountInstance
  ): Promise<boolean> => {
    try {
      const result = await Account.update(
        { enable: true },
        {
          where: {
            id: account.id,
          },
        }
      );
      console.log(result);
      return true;
    } catch (err) {
      throw err;
    }
  };
}
