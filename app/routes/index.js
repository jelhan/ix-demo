import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return [
      {
        address: 'Kloveniersburgwal 50, 1012 CX Amsterdam, Netherlands',
        period: '11. & 12. Oktober 2018',
        name: 'EmberFest'
      },
      {
        address: '777 NE Martin Luther King Jr Blvd, Portland, OR 97232',
        period: '18. - 20. März 2019',
        name: 'EmberConf'
      }
    ];
  }
});
