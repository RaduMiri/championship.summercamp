package com.example.championship.summercamp.controller;

import com.example.championship.summercamp.model.Game;
import com.example.championship.summercamp.service.GameServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game")
public class GameController {
    @Autowired
    private GameServices gameServices;

    @PostMapping("/createGame")
    public Game postGame(@RequestBody Game newGame){
        return gameServices.createGame(newGame);
    }

    //set the proper attributes
    @PutMapping("/updateGame/{id}")
    public Game updateGame(@RequestBody Game newGame, @PathVariable Integer id){return gameServices.updateGame(newGame,id);}

    @DeleteMapping("/delete/{id}")
    public void deleteGame(@PathVariable Integer id){
        gameServices.deleteGame(id);
    }
    @DeleteMapping("/deleteAll")
    public void deleteAllGames(){gameServices.deleteAllGames();}

    //Filters
    @GetMapping({"/findById/{id}","/one/{id}"})
    public Game getGame(@PathVariable Integer id){return gameServices.getOne(id);}
    @GetMapping("/findByGameType/{gameType}")
    public List<Game> findByGameType(@PathVariable String gameType) {return gameServices.findByGameType(gameType);}
    @GetMapping("/findByField/{field}")
    public List<Game> findByField(@PathVariable String field) {return gameServices.findByField(field);}
    @GetMapping("/findByScore1/{score1}")
    public List<Game> findByScore1(@PathVariable Integer score1) {return gameServices.findByScore1(score1);}
    @GetMapping("/findByScore2/{score2}")
    public List<Game> findByScore2(@PathVariable Integer score2) {return gameServices.findByScore2(score2);}
    //team1
    //team2
    
    //Sorts
    @GetMapping({"/findByOrderByIdAsc", "/all"})
    public List<Game> getAllGames(){
        return gameServices.getAll();
    }
    @GetMapping("/findByOrderByGameTypeAsc")
    public List<Game> findByOrderByGameTypeAsc(){return gameServices.findByOrderByGameTypeAsc();}
    @GetMapping("/findByOrderByFieldAsc")
    public List<Game> findByOrderByFieldAsc(){return gameServices.findByOrderByFieldAsc();}
    @GetMapping("/findByOrderByScore1Asc")
    public List<Game> findByOrderByScore1Asc(){return gameServices.findByOrderByScore1Asc();}
    @GetMapping("/findByOrderByScore2Asc")
    public List<Game> findByOrderByScore2Asc(){return gameServices.findByOrderByScore2Asc();}
    //team1
    //team2

    @GetMapping({"/findByOrderByIdDesc"})
    public List<Game> findByOrderByIdDesc(){return gameServices.findByOrderByIdDesc();}
    @GetMapping("/findByOrderByGameTypeDesc")
    public List<Game> findByOrderByGameTypeDesc(){return gameServices.findByOrderByGameTypeDesc();}
    @GetMapping("/findByOrderByFieldDesc")
    public List<Game> findByOrderByFieldDesc(){return gameServices.findByOrderByFieldDesc();}
    @GetMapping("/findByOrderByScore1Desc")
    public List<Game> findByOrderByScore1Desc(){return gameServices.findByOrderByScore1Desc();}
    @GetMapping("/findByOrderByScore2Desc")
    public List<Game> findByOrderByScore2Desc(){return gameServices.findByOrderByScore2Desc();}
    //team1
    //team2
}
