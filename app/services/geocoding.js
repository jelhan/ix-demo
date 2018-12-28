import Service, { inject as service } from '@ember/service';
import config from '../config/environment';

export default Service.extend({
  coordinatesFor(address) {
    if (this.cache.has(address)) {
      return this.cache.get(address);
    }

    let apiKey = config.openCage.apiKey;
    let url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
    return this.ajax.request(url)
      .then((data) => {
        let result = data.results.length > 0 ? data.results[0].geometry : null;
        this.cache.set(address, result);
        return result;
      });
  },

  init() {
    this._super(...arguments);

    this.cache = new Map();
  },

  ajax: service()
});
