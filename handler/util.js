const discord = require('discord.js');

class Util {
    constructor() {
        this.numberString = function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        this.chunk = function chunk(array, chunkSize) {
            let temp = [];
            for (let i = 0; i < array.length; i += chunkSize) {
              temp.push(array.slice(i, i + chunkSize));
            }
            return temp;
        };

        this.chunkString = function chunkString(str, size) {
            const numChunks = Math.ceil(str.length / size)
            const chunks = [numChunks]
      
            for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
              chunks[i] = str.substr(o, size)
            }
      
        return chunks
        };

        this.timeString = function timeString(seconds, forceHours = false) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            if (isNaN(seconds) === false) {
              return `${forceHours || hours >= 1 ? `${hours}:` : ""}${hours >= 1 ? `0${minutes}`.slice(-2) : minutes
                }:${`0${Math.floor(seconds % 60)}`.slice(-2)}`;
            } else {
              return `LIVE`;
            }
        };

        this.truncate = function truncate(str, num) {
          var ending = "..."
          if (str.length > num) {
            if (num > 2044 ) {
            str = str.slice(0,num-3);
            return str + ending;
            } else {
              str = str.slice(0,num);
              return str + ending;
            }
          } else {
            return str;
          }
        };

        this.parseDur = function parseDur(ms) {
          let seconds = ms / 1000;
          let days = parseInt(seconds / 86400);
          seconds = seconds % 86400;
          let hours = parseInt(seconds / 3600);
          seconds = seconds % 3600;
          let minutes = parseInt(seconds / 60);
          seconds = parseInt(seconds % 60);
    
          if (days) {
            return `${days} hari, ${hours} jam, ${minutes} menit`;
          } else if (hours) {
            return `${hours} jam, ${minutes} menit, ${seconds} detik`;
          } else if (minutes) {
            return `${minutes} menit, ${seconds} detik`;
          }
          return `${seconds} detik`;
        };

        this.durasi = function durasi(ms) {

            let waktu = (ms * 10)
            const res = {
              detik: parseInt((waktu / 1000) % 60),
              menit: parseInt((waktu / (1000 * 60)) % 60),
              jam: parseInt((waktu / (1000 * 60 * 60)))
            }
            
            let jam = res.jam;
            waktu = waktu % (1000 * 60 * 60);
            let menit = res.menit
            waktu = (waktu % (1000 * 60)) % 60;
            let detik = res.detik
            waktu = (waktu % 1000) % 60
      
            if (jam) {
              return `${jam} jam ${menit} menit ${detik} detik`
            } else
              if (menit) {
                return `${menit} menit ${detik} detik`
              }
      
            return `${detik} detik`
      
        };
    }
}

module.exports = Util;