import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save(changeset) {
      let record = this.store.createRecord('conference', changeset.get('change'));
      record.save()
        .then(() => {
          this.transitionToRoute('index');
        });
    }
  }
});
