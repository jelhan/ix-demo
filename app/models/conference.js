import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  address: DS.attr('string'),
  name: DS.attr('string'),
  startDate: DS.attr('string'),
  endDate: DS.attr('string'),

  period: computed('startDate', 'endDate', function() {
    let startDateFormatted = (new Date(this.startDate)).toLocaleString();
    let endDateFormatted = (new Date(this.endDate)).toLocaleString();
    return `${startDateFormatted} - ${endDateFormatted}`;
  })
});
