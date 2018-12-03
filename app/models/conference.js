import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr('string'),

  startDate: DS.attr('string'),
  endDate: DS.attr('string'),

  address: DS.attr('string'),
  lat: DS.attr('number'),
  lng: DS.attr('number'),

  period: computed('startDate', 'endDate', function() {
    let { startDate: startDateString, endDate: endDatestring } = this;
    let startDate = new Date(startDateString);
    let endDate = new Date(endDatestring);

    let dayOnly = { day: 'numeric' };
    let monthOnly = Object.assign({ month: 'long' }, dayOnly);
    let fullDate = Object.assign({ year: 'numeric' }, monthOnly);
    let period = '';

    if (!startDateString || !endDatestring) {
      return null;
    }

    if (startDate.getYear() !== endDate.getYear()) {
      period = startDate.toLocaleDateString('de-DE', fullDate);
    }
    else if (startDate.getMonth() !== endDate.getMonth()) {
      period = startDate.toLocaleDateString('de-DE', monthOnly);
    }
    else if (startDate.getDay() !== endDate.getDay()) {
      period = startDate.toLocaleDateString('de-DE', dayOnly).concat('.');
    }

    if (period.length > 0) {
      period = period.concat(' - ');
    }

    return period.concat(
      endDate.toLocaleDateString('de-DE', fullDate)
    );

  })
});
