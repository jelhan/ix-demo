import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save(record) {
      record.save()
        .then(() => {
          this.transitionToRoute('index');
        });
    }
  }
});
