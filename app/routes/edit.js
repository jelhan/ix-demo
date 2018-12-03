import Route from '@ember/routing/route';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import ConferenceValidations from '../validations/conference';

export default Route.extend({
  model({ conference_id }) {
    return this.store.findRecord('conference', conference_id)
      .then((conference) => {
        return new Changeset(conference, lookupValidator(ConferenceValidations), ConferenceValidations);
      });
  }
});
