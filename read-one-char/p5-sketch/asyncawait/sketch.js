// Copyright (c) 2018 p5ble
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// The serviceUuid must match the serviceUuid of the device you would like to connect
const serviceUuid = "19b10010-e8f2-537e-4f6c-d104768a1214";
let myCharacteristic;
let myValue = 0;
let myBLE;
let isConnected = false;

function setup() {
  // Create a p5ble class
  myBLE = new p5ble();

  createCanvas(200, 200);
  background(250);
  textSize(20);
  textAlign(CENTER, CENTER);

  // Write value on the canvas
  text(myValue, 100, 100);

  // Create a 'Connect' button
  const connectButton = createButton('Connect')
  connectButton.mousePressed(connectToBle);

  // Create a 'Read' button
  const readButton = createButton('Read')
  readButton.mousePressed(read);
}

async function connectToBle() {
  // Connect to a device by passing the service UUID
  const characteristics = await myBLE.connect(serviceUuid)
  console.log('characteristics: ', characteristics);
  myCharacteristic = characteristics[0];
  isConnected = true;
}

async function read() {
  // Read the value of the characteristic
  myValue = await myBLE.read(myCharacteristic);
  // You can also pass in the dataType
  // Options: 'unit8', 'uint16', 'uint32', 'int8', 'int16', 'int32', 'float32', 'float64', 'string'
  // myValue = await myBLE.read(myCharacteristic, 'string');
  background(250);
  // Write value on the canvas
  text(myValue, 100, 100);
}
