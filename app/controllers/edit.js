import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  geocoding: service(),

  actions: {
    async save(changeset) {
      if (changeset.get('change').hasOwnProperty('address')) {
        changeset.setProperties(
          await this.geocoding.coordinatesFor(
            changeset.get('address')
          )
        );
      }

      return changeset.save()
        .then(() => {
          this.transitionToRoute('index');
        });
    }
  }
});
