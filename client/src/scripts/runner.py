import socketio

sio = socketio.Client()

@sio.event
def message(data):
    print('Executing: ', data)
    exec(data)

sio.connect('http://localhost:3001')
print('Connected. sid: ', sio.sid)
