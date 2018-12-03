import Route from '@ember/routing/route';

export default Route.extend({
  model({ conference_id }) {
    return this.store.findRecord('conference', conference_id);
  }
});
