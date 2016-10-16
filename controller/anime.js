var express = require('express');
var async = require('async');
var nyaa = require('../lib/nyaa');
var tokyo = require('../lib/tokyotosho');
var HummingbirdAPI = require('hummingbird-api');
var settings = require('../settings');


var anime = express.Router();
var hb = new HummingbirdAPI(settings.HUMMINGBIRD_API_KEY);


anime.post('/', function(req, res){
    var query = req.body.torrent;
    var NYAA_TORRENT_DATA = [];
    var TOKYO_TORRENT_DATA = [];
    var HB_POSTER_DATA;



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


    hb.Anime.getAnime(query.split(" ").join("-").toLowerCase()).then(function(res){
        var img = res.cover_image;
        HB_POSTER_DATA = img;
    }).catch(function(err){console.log(err);});

    setTimeout(function(){

        res.render('anime/torrents', {data: NYAA_TORRENT_DATA, data2: TOKYO_TORRENT_DATA, imgsrc: HB_POSTER_DATA});
    }, 5000);
});

module.exports = anime;




