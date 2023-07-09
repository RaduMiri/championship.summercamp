package com.example.championship.summercamp.controller;

import com.example.championship.summercamp.model.Player;
import com.example.championship.summercamp.service.PlayerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/player")
public class PlayerController {
    @Autowired
    private PlayerServices playerServices;

    @GetMapping("/one/{id}")
    public Player getPlayer(@PathVariable Integer id){
        return playerServices.getOne(id);
    }

    @GetMapping(value = "/all")
    public List<Player> getAllPlayers(){return playerServices.getAll();}

    //Not working properly
    @PostMapping("/createPlayer")
    public Player postPlayer(@RequestBody Player newPlayer){

        return playerServices.createPlayer(newPlayer);
    }

    @PutMapping("/updatePlayer/{id}")
    public Player updatePlayer(@RequestBody Player newPlayer, @PathVariable Integer id){
        Player dbPlayer = playerServices.getOne(id);
        if(newPlayer.getName()!=null)
            dbPlayer.setName(newPlayer.getName());
        if(newPlayer.getTeam()!=null)
            dbPlayer.setTeam(newPlayer.getTeam());
        return playerServices.updatePlayer(dbPlayer);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePlayer(@PathVariable Integer id){
        playerServices.deletePlayer(id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAllPlayers(){playerServices.deleteAllPlayers();}
}
