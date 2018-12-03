export default function(server) {
  server.create('conference', {
    address: 'Kloveniersburgwal 50, 1012 CX Amsterdam, Netherlands',
    name: 'Ember{{fest}}',

    startDate: '2018-10-11',
    endDate: '2018-10-12'
  });
  server.create('conference', {
    address: '777 NE Martin Luther King Jr Blvd, Portland, OR 97232',
    name: 'EmberConf',

    startDate: '2019-03-18',
    endDate: '2019-03-20'
  });
}
