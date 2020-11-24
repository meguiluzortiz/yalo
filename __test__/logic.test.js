const parse = require('../logic.js');

describe('Logic API Testing', () => {
  it('Test Operator (>) as truthy', () => {
    const params = {
      expression: '10 > 0',
      save: 'greaterThan',
      transitions: {
        isTrue: 1,
        isFalse: 2,
        isError: 3,
      },
      context: {},
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeTruthy();
    expect(result.transition).toEqual(params.transitions.isTrue);
  });

  it('Test Operator (>) as falsy', () => {
    const params = {
      expression: '10 < 0',
      save: 'greaterThan',
      transitions: {
        isTrue: 1,
        isFalse: 2,
        isError: 3,
      },
      context: {},
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeFalsy();
    expect(result.transition).toEqual(params.transitions.isFalse);
  });

  it('Test Operator (>=)', () => {
    const params = {
      expression: '20 >= 10',
      save: 'greaterOrEqual',
      transitions: {
        isTrue: 1,
        isFalse: 2,
        isError: 3,
      },
      context: {},
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeTruthy();
    expect(result.transition).toEqual(params.transitions.isTrue);
  });

  it('Test Operator (<)', () => {
    const params = {
      expression: '10 < 20',
      save: 'lessThan',
      transitions: {
        isTrue: 1,
        isFalse: 2,
        isError: 3,
      },
      context: {},
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeTruthy();
    expect(result.transition).toEqual(params.transitions.isTrue);
  });

  it('Test Operator (<=)', () => {
    const params = {
      expression: '20 <= 20',
      save: 'lessOrEqual',
      transitions: {
        isTrue: 1,
        isFalse: 2,
        isError: 3,
      },
      context: {},
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeTruthy();
    expect(result.transition).toEqual(params.transitions.isTrue);
  });

  it('Test Operator (==)', () => {
    const params = {
      expression: '20 == 20',
      save: 'equal',
      transitions: {
        isTrue: 1,
        isFalse: 2,
        isError: 3,
      },
      context: {},
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeTruthy();
    expect(result.transition).toEqual(params.transitions.isTrue);
  });

  it('Test Operator (!=)', () => {
    const params = {
      expression: '20 != 10',
      save: 'notEqual',
      transitions: {
        isTrue: 1,
        isFalse: 2,
        isError: 3,
      },
      context: {},
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeTruthy();
    expect(result.transition).toEqual(params.transitions.isTrue);
  });

  it('Test Operator (||)', () => {
    const params = {
      expression: 'true || false',
      save: 'or',
      transitions: {
        isTrue: 1,
        isFalse: 2,
        isError: 3,
      },
      context: {},
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeTruthy();
    expect(result.transition).toEqual(params.transitions.isTrue);
  });

  it('Test Operator (&&)', () => {
    const params = {
      expression: 'true && true',
      save: 'and',
      transitions: {
        isTrue: 1,
        isFalse: 2,
        isError: 3,
      },
      context: {},
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeTruthy();
    expect(result.transition).toEqual(params.transitions.isTrue);
  });

  it('Test Multiple Operators (>, &&, <)', () => {
    const params = {
      expression: '(5 > 2) && (5 < 10)',
      save: 'result',
      transitions: {
        isTrue: 1,
        isFalse: 2,
        isError: 3,
      },
      context: {},
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeTruthy();
    expect(result.transition).toEqual(params.transitions.isTrue);
  });

  it('Test Multiple Operators (>=, ||, <=)', () => {
    const params = {
      expression: '(10 >= 10) || (50 <= 10)',
      save: 'result',
      transitions: {
        isTrue: 1,
        isFalse: 2,
        isError: 3,
      },
      context: {},
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeTruthy();
    expect(result.transition).toEqual(params.transitions.isTrue);
  });

  it('Test Multiple Operators (==, &&, !=)', () => {
    const params = {
      expression: '(100 == 100) && (100 != 10)',
      save: 'result',
      transitions: {
        isTrue: 1,
        isFalse: 2,
        isError: 3,
      },
      context: {},
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeTruthy();
    expect(result.transition).toEqual(params.transitions.isTrue);
  });

  it('Test Context (amount > min)', () => {
    const params = {
      expression: '(amount > min)',
      save: 'validAmount',
      transitions: {
        isTrue: 5,
        isFalse: 10,
        isError: 25,
      },
      context: {
        amount: 150,
        min: 45,
      },
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeTruthy();
    expect(result.transition).toEqual(params.transitions.isTrue);
  });

  it('Test Context (age >= 18)', () => {
    const params = {
      expression: '(age) >= 18)',
      save: 'adult',
      transitions: {
        isTrue: 15,
        isFalse: 23,
        isError: 45,
      },
      context: {
        age: 15,
      },
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeFalsy();
    expect(result.transition).toEqual(params.transitions.isFalse);
  });

  it('Test (age >= 18)', () => {
    const params = {
      expression: '(age) >= 18)',
      save: 'adult',
      transitions: {
        isTrue: 15,
        isFalse: 23,
        isError: 45,
      },
      context: {},
    };

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toEqual('Undefined symbol age');
    expect(result.transition).toEqual(params.transitions.isError);
  });
});
