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

    public Game updateGame(Game newGame, Integer id){
        Game dbGame = gameRepository.getOne(id);
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
        return gameRepository.save(newGame);
    }

    public void deleteGame(Integer id) { gameRepository.deleteById(id); }

    public void deleteAllGames(){gameRepository.deleteAll();}
}
