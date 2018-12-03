export default function() {
  this.resource('conferences');

  this.passthrough('https://api.opencagedata.com/geocode/v1/json');
}
