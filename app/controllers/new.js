import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  geocoding: service(),

  actions: {
    async save(changeset) {
      let record = this.store.createRecord('conference', changeset.get('change'));
      record.setProperties(
        await this.geocoding.coordinatesFor(
          record.address
        )
      );

      return record.save()
        .then(() => {
          this.transitionToRoute('index');
        });
    }
  }
});
