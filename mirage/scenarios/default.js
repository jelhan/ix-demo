export default function(server) {
  server.create('conference', {
    name: 'Ember{{fest}}',

    startDate: '2018-10-11',
    endDate: '2018-10-12',

    address: 'Kloveniersburgwal 50, 1012 CX Amsterdam, Netherlands',
    lat: 52.370379,
    lng: 4.8954818
  });
  server.create('conference', {
    name: 'EmberConf',

    startDate: '2019-03-18',
    endDate: '2019-03-20',

    address: '777 NE Martin Luther King Jr Blvd, Portland, OR 97232',
    lat: 45.5283308,
    lng: -122.66566
  });
}
