const os = require('os-utils')

let tick = 0;
const getData = socket => {

    os.cpuUsage(cpuPercent => {
        socket.emit('eeg', {
            name: tick++,
            value: cpuPercent
        })
    })
}

module.exports = getData;