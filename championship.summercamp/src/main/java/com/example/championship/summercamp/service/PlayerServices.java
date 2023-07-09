package com.example.championship.summercamp.service;

import com.example.championship.summercamp.model.Player;
import com.example.championship.summercamp.model.Team;
import com.example.championship.summercamp.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerServices {
    @Autowired
    private PlayerRepository playerRepository;

    public Player getOne(Integer id){
        return playerRepository.findById(id).get();
    }

    public List<Player> getAll(){
        return playerRepository.findAll();
    }

    public Player createPlayer(Player newPlayer){
        return playerRepository.save(newPlayer);
    }

    public Player updatePlayer(Player newPlayer){
        return playerRepository.save(newPlayer);
    }

    public void deletePlayer(Integer id) { playerRepository.deleteById(id); }

    public void deleteAllPlayers(){playerRepository.deleteAll();}
}
