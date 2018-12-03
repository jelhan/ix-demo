import DS from 'ember-data';

export default DS.Model.extend({
  address: DS.attr('string'),
  period: DS.attr('string'),
  name: DS.attr('string')
});
