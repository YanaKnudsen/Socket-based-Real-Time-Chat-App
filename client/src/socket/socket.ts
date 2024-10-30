import io from 'socket.io-client';


//socket io has two functionalities: listen to the event and emit the event.
//emit: sending the data to all users who is listening to that event, the can also send data back

//export const socket = io.connect('http://localhost:3000');
export const socket = io('http://localhost:3000');