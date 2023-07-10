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
        return gameServices.updateGame(newGame,id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGame(@PathVariable Integer id){
        gameServices.deleteGame(id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAllGames(){gameServices.deleteAllGames();}
}
