const Ajv = require('ajv');
const schema = require('./schemas/logic.json');
const { evaluate } = require('mathjs');

const parse = (params) => {
  const valid = validate(params);
  if (!valid) throw new Error("Params don't have the required json schema");

  const { expression, save, transitions, context } = params;
  const {
    isTrue: trueTransition, //
    isFalse: falseTransition, //
    isError: errorTransition,
  } = transitions;
  const result = {};

  try {
    const transformed = transform(expression);
    const evaluation = evaluate(transformed, context);
    result[save] = evaluation;
    result.transition = evaluation ? trueTransition : falseTransition;
  } catch (e) {
    result[save] = e.message;
    result.transition = errorTransition;
  }

  return result;
};

const validate = (data) => {
  const ajv = new Ajv();
  const validator = ajv.compile(schema);
  return validator(data);
};

const transform = (initialValue) => {
  const filters = [
    { value: '||', newValue: 'or' },
    { value: '&&', newValue: 'and' },
    { value: '(', newValue: '' },
    { value: ')', newValue: '' },
  ];

  return filters.reduce(
    (val, item) => (val.includes(item.value) ? val.split(item.value).join(item.newValue) : val),
    initialValue
  );
};

module.exports = parse;
