var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var _ = require("underscore");


// rivals markup is asp, and table based. frickin gross
var data = []

var url = "http://sports.yahoo.com/footballrecruiting/football/recruiting/rankings/rank-rivals250/2015"
request(url, function(error, response, html){
  if(error) throw error
  setTimeout(function(){
    if(!error){
      var $ = cheerio.load(html)
      var players = $("tr")
      // console.log("wrapped teams", teams)
      _.each(players, function(player){
        var playersObj = {}
        playersObj.name = $(player).find(".name").find("a").text()
        playersObj.location = $(player).find(".location").children().first().text()
        data.push(playersObj)
      })
      console.log("players are:", data)
    }
    

    fs.writeFile("players.json", data, function(err){
      if(err) throw error

      console.log("players found")
    })
  },1000)
})


console.log('Running...');