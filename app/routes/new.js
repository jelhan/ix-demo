import Route from '@ember/routing/route';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import ConferenceValidations from '../validations/conference';

export default Route.extend({
  model() {
    return new Changeset({}, lookupValidator(ConferenceValidations), ConferenceValidations);
  }
});
