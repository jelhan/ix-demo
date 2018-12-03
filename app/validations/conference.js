import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';

export default {
  address: validatePresence(true),
  startDate: validatePresence(true),
  endDate: validatePresence(true),
  name: [
    validatePresence(true),
    validateLength({ min: 5, max: 30 })
  ]
};
