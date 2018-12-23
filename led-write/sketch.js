const serviceUuid = "19b10000-e8f2-537e-4f6c-d104768a1214";
let ledCharacteristic;
let myBLE;
let input;

function setup() {
  myBLE = new p5BLE();

  // Create a 'Connect' button
  const connectButton = createButton('Connect')
  connectButton.mousePressed(connectToBle);
  connectButton.position(15, 65);

  // Create a text input
  input = createInput();
  input.position(15, 100);

  // Create a 'Write' button
  const writeButton = createButton('Write');
  writeButton.position(input.x + input.width + 15, 100);
  writeButton.mousePressed(writeToBle);
}

function connectToBle() {
  myBLE.connect(serviceUuid, gotCharacteristics);
}

function gotCharacteristics(error, characteristics) {
  if (error) console.log('error: ', error);
  console.log('characteristics: ', characteristics);
  ledCharacteristic = characteristics[0];
}

function writeToBle() {
  const inputValue = input.value();
  myBLE.write(ledCharacteristic, inputValue);
}
