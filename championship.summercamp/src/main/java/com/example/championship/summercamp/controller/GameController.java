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

    @GetMapping(value = "/one/{id}")
    public Game getGame(@PathVariable Integer id){
        return gameServices.getOne(id);
        //if it doesn't find the game it will give a server error
    }

    @GetMapping(value = "/all")
    public List<Game> getAllGames(){
        return gameServices.getAll();
    }

    @PostMapping("/createGame")
    public Game postGame(@RequestBody Game newGame){
        return gameServices.createGame(newGame);
    }

    //set the proper attributes
    @PutMapping("/updateGame/{id}")
    public Game updateGame(@RequestBody Game newGame, @PathVariable Integer id){
        Game dbGame = gameServices.getOne(id);
        if(newGame.getGameType()!=null)
            dbGame.setGameType(newGame.getGameType());
        if(newGame.getTeam1()!=null)
            dbGame.setTeam1(newGame.getTeam1());
        if(newGame.getScore1()!=0)
            dbGame.setScore1(newGame.getScore1());
        if(newGame.getTeam2()!=null)
            dbGame.setTeam2(newGame.getTeam2());
        if(newGame.getScore2()!=0)
            dbGame.setScore2(newGame.getScore2());
        return gameServices.updateGame(dbGame);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGame(@PathVariable Integer id){
        gameServices.deleteGame(id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAllGames(){gameServices.deleteAllGames();}
}
