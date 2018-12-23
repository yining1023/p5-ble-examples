// Initializing a p5.ble class definition
class p5BLE {
  constructor() {
    // this.name = name;
  }

  connect(serviceUuid, callback) {
    let options = {
      filters: [{
        services: [serviceUuid]
      }]
    }

    console.log('Requesting Bluetooth Device...');

    return navigator.bluetooth.requestDevice(options)
    .then(device => {
      console.log('Got device', device.name);
      return device.gatt.connect();
    })
    .then(server => {
        console.log('Getting Service...');
        return server.getPrimaryService(serviceUuid);
      })
      .then(service => {
        console.log('Getting Characteristics...');
        return service.getCharacteristics();
      })
      .then(characteristics => {
        console.log('Got LED Characteristic');
        console.log('characteristics: ', characteristics);
        callback(null, characteristics);
      })
      .catch(error => {
        console.log('Argh! ' + error);
        callback(error);
      });
  }

  write(characteristic, inputValue) {
    let bufferToSend = Uint8Array.of(inputValue);
    characteristic.writeValue(bufferToSend);
    console.log('Writing '+ inputValue + ' to led Characteristic...');
  }
}
