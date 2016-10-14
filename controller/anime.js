var express = require('express');
var async = require('async');
var nyaa = require('../lib/nyaa');
var tokyo = require('../lib/tokyotosho');


var anime = express.Router();


anime.post('/', function(req, res){
    var query = req.body.torrent;
    var NYAA_TORRENT_DATA = [];
    var TOKYO_TORRENT_DATA = [];



    nyaa.search(query).then(function(data){
        data.map(function(torrent){
            var title = torrent.title;
            var seeds = torrent.seeds;
            var leechs = torrent.leechs;
            var size = torrent.size;
            var magnet = torrent.torrent_link;
            NYAA_TORRENT_DATA.push({'title': title, 'seeds': seeds, 'leechs': leechs, 'size': size, 'link': magnet});
        });
    });




    tokyo.search(query).then(function(data){
        data.map(function(torrent){
            var title = torrent.title;
            var seeds = torrent.seeds;
            var leechs = torrent.leechs;
            var size = torrent.size;
            var magnet = torrent.torrent_link;
            TOKYO_TORRENT_DATA.push({'title': title, 'seeds': seeds, 'leechs': leechs, 'size': size, 'link': magnet});
        });
    });




    setTimeout(function(){

        res.render('anime/torrents', {data: NYAA_TORRENT_DATA, data2: TOKYO_TORRENT_DATA});
    }, 5000);
});

module.exports = anime;




