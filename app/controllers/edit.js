import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save(changeset) {
      changeset.save()
        .then(() => {
          this.transitionToRoute('index');
        });
    }
  }
});
