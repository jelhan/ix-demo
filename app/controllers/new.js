import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save(data) {
      let record = this.store.createRecord('conference', data);
      record.save()
        .then(() => {
          this.transitionToRoute('index');
        });
    }
  }
});
