package com.example.championship.summercamp.service;

import com.example.championship.summercamp.model.Game;
import com.example.championship.summercamp.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameServices {
    @Autowired
    private GameRepository gameRepository;

    public Game getOne(Integer id){
        return gameRepository.findById(id).get();
    }

    public List<Game> getAll(){
        return gameRepository.findAll();
    }

    public Game createGame(Game newGame){
        return gameRepository.save(newGame);
    }

    public Game updateGame(Game newGame){
        return gameRepository.save(newGame);
    }

    public void deleteGame(Integer id) { gameRepository.deleteById(id); }

    public void deleteAllGames(){gameRepository.deleteAll();}
}
