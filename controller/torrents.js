var express = require('express');
var tpb = require('../lib/thepiratebay');
var yts = require('../lib/yts');
var imdb = require('imdb-api');

var torrents = express.Router();

torrents.post('/', function(req, res){
    var query = req.body.torrent;
    var TPB_TORRENT_DATA = [];
    var YTS_TORRENT_DATA = [];
    var IMDB_MOVIE_IMG;

    tpb.search(query).then(function(data){
        data.map(function(torrent){
            var title = torrent.title;
            var seeds = torrent.seeds;
            var leechs = torrent.leechs;
            var size = torrent.size;
            var magnet = torrent.torrent_link;
            TPB_TORRENT_DATA.push({'title': title, 'seeds': seeds, 'leechs': leechs, 'size': size, 'link': magnet});
        });
    });

    yts.search(query).then(function(data){
        data.map(function(torrent){
            var title = torrent.title;
            var seeds = torrent.seeds;
            var leechs = torrent.leechs;
            var size = torrent.size;
            var magnet = torrent.torrent_link;
            YTS_TORRENT_DATA.push({'title': title, 'seeds': seeds, 'leechs': leechs, 'size': size, 'link': magnet});
        });
    });

    imdb.get(query).then(function(data){
        var img = data.poster;
        IMDB_MOVIE_IMG = img;
    });

    setTimeout(function(){

        res.render('torrents', {
            imgsrc: IMDB_MOVIE_IMG,
            data: TPB_TORRENT_DATA,
            data2: YTS_TORRENT_DATA
        });
    }, 5000);
});

module.exports = torrents;

