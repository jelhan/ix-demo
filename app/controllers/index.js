import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    delete(conference) {
      conference.destroyRecord()
        .catch(() => {
          alert('Das Löschen der Konferenz ist fehlgeschlagen.');
        });
    }
  }
});
