import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, type, title }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type not allowed');
    }

    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();

      if (value > total) {
        throw Error('balance not available');
      }
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
