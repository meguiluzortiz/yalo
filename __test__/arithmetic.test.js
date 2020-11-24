const parse = require('../arithmetic.js');

describe('Arithmetic Parsing Tests', () => {
  it('Test Operator (+)', () => {
    const params = {
      expression: '5 + 5',
      save: 'addition',
      transitions: {
        next: 1,
        error: 2,
      },
      context: {},
    };
    const expressionResult = 10;

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toEqual(expressionResult);
    expect(result.transition).toEqual(params.transitions.next);
  });

  it('Test Operator (-)', () => {
    const params = {
      expression: '5 - 5',
      save: 'subtraction',
      transitions: {
        next: 1,
        error: 2,
      },
      context: {},
    };
    const expressionResult = 0;

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toEqual(expressionResult);
    expect(result.transition).toEqual(params.transitions.next);
  });

  it('Test Operator (/)', () => {
    const params = {
      expression: '5 / 5',
      save: 'division',
      transitions: {
        next: 1,
        error: 2,
      },
      context: {},
    };
    const expressionResult = 1;

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toEqual(expressionResult);
    expect(result.transition).toEqual(params.transitions.next);
  });

  it('Test Operator (^)', () => {
    const params = {
      expression: '5^5',
      save: 'power',
      transitions: {
        next: 1,
        error: 2,
      },
      context: {},
    };
    const expressionResult = 3125;

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toEqual(expressionResult);
    expect(result.transition).toEqual(params.transitions.next);
  });

  it('Test Operator (**)', () => {
    const params = {
      expression: '5**5',
      save: 'power',
      transitions: {
        next: 1,
        error: 2,
      },
      context: {},
    };
    const expressionResult = 3125;

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toEqual(expressionResult);
    expect(result.transition).toEqual(params.transitions.next);
  });

  it('Test Operator (!)', () => {
    const params = {
      expression: '5!',
      save: 'factorial',
      transitions: {
        next: 1,
        error: 2,
      },
      context: {},
    };
    const expressionResult = 120;

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toEqual(expressionResult);
    expect(result.transition).toEqual(params.transitions.next);
  });

  it('Test Multiple Operators (+, -, *)', () => {
    const params = {
      expression: '(5 + 10 - 10 * 2)',
      save: 'response',
      transitions: {
        next: 1,
        error: 2,
      },
      context: {},
    };
    const expressionResult = -5;

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toEqual(expressionResult);
    expect(result.transition).toEqual(params.transitions.next);
  });

  it('Test Multiple Operators (/, ^, !)', () => {
    const params = {
      expression: '(5!) + (5^5) - (10 / 5)',
      save: 'result',
      transitions: {
        next: 1,
        error: 2,
      },
      context: {},
    };
    const expressionResult = 3243;

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toEqual(expressionResult);
    expect(result.transition).toEqual(params.transitions.next);
  });

  it('Test Multiple Operators (+, -, *, /, **, !)', () => {
    const params = {
      expression: '(5!) + (5 + 5) + (5 - 5) + (5 * 5) + (5 ** 5) + (5 / 5)',
      save: 'result',
      transitions: {
        next: 1,
        error: 2,
      },
      context: {},
    };
    const expressionResult = 3281;

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toEqual(expressionResult);
    expect(result.transition).toEqual(params.transitions.next);
  });

  it('Test Context (value / (99 ** 2))', () => {
    const params = {
      expression: 'value/(99**2)',
      save: 'result',
      transitions: {
        next: 1,
        error: 2,
      },
      context: {
        value: 180,
      },
    };
    const expressionResult = 0.01836547291;

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toBeCloseTo(expressionResult);
    expect(result.transition).toEqual(params.transitions.next);
  });

  it('Test Invalid Expression (str / 2)', () => {
    const params = {
      expression: '(str/2)',
      save: 'result',
      transitions: {
        next: 101,
        error: 102,
      },
      context: {
        str: 'string-value',
      },
    };
    const expressionResult = 'NaN';

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toEqual(expressionResult);
    expect(result.transition).toEqual(params.transitions.error);
  });

  it('Test Context (10/2)', () => {
    const params = {
      expression: '(10/2)',
      save: 'result',
      transitions: {
        next: 25,
        error: 50,
      },
      context: {},
    };
    const expressionResult = 5;

    const result = parse(params);
    expect(result).toHaveProperty(params.save);
    expect(result[params.save]).toEqual(expressionResult);
    expect(result.transition).toEqual(params.transitions.next);
  });
});
