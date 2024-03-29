package com.example.championship.summercamp.service;

import com.example.championship.summercamp.model.Game;
import com.example.championship.summercamp.model.Player;
import com.example.championship.summercamp.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameServices {
    @Autowired
    private GameRepository gameRepository;

    public Game createGame(Game newGame){return gameRepository.save(newGame);}

    public Game updateGame(Game newGame, Integer id){
        Game dbGame = gameRepository.getOne(id);
        if(newGame.getGameType()!=null)
            dbGame.setGameType(newGame.getGameType());
        if(newGame.getField()!=null)
            dbGame.setField(newGame.getField());
        if(newGame.getTeam1()!=null)
            dbGame.setTeam1(newGame.getTeam1());
        if(newGame.getScore1()!=0)
            dbGame.setScore1(newGame.getScore1());
        if(newGame.getTeam2()!=null)
            dbGame.setTeam2(newGame.getTeam2());
        if(newGame.getScore2()!=0)
            dbGame.setScore2(newGame.getScore2());
        return gameRepository.save(dbGame);
    }

    public void deleteGame(Integer id) { gameRepository.deleteById(id); }
    public void deleteAllGames(){gameRepository.deleteAll();}

    //Filters
    public Game getOne(Integer id){return gameRepository.findById(id).get();}
    public List<Game> findByGameType(String gameType){return gameRepository.findByGameType(gameType);}
    public List<Game> findByField(String field){return gameRepository.findByField(field);}
    public List<Game> findByScore1(Integer score1){return gameRepository.findByScore1(score1);}
    public List<Game> findByScore2(Integer score2){return gameRepository.findByScore2(score2);}
    public List<Game> findByGameTypeFieldScore1Score2Team1NameTeam1ColourTeam2NameTeam2Colour(String string) {
        Integer score1 = parsePositiveInteger(string);
        Integer score2 = score1 != null ? score1 : parsePositiveInteger(string);
        return gameRepository.findByGameTypeFieldScore1Score2Team1NameTeam1ColourTeam2NameTeam2Colour(string, score1, score2);
    }
    private Integer parsePositiveInteger(String str) {
        try {
            int intValue = Integer.parseInt(str);
            return intValue > 0 ? intValue : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }
    
    //Sorts
    public List<Game> getAll(){
        return gameRepository.findAll();
    }
    public List<Game> findByOrderByGameTypeAsc(){return gameRepository.findByOrderByGameTypeAsc();}
    public List<Game> findByOrderByFieldAsc(){return gameRepository.findByOrderByFieldAsc();}
    public List<Game> findByOrderByScore1Asc(){return gameRepository.findByOrderByScore1Asc();}
    public List<Game> findByOrderByScore2Asc(){return gameRepository.findByOrderByScore2Asc();}
    public List<Player> findByOrderByTeam1ColourAscTeam1NameAsc(){return gameRepository.findByOrderByTeam1ColourAscTeam1NameAsc();}
    public List<Player> findByOrderByTeam2ColourAscTeam2NameAsc(){return gameRepository.findByOrderByTeam2ColourAscTeam2NameAsc();}
    
    public List<Game> findByOrderByIdDesc(){return gameRepository.findByOrderByIdDesc();}
    public List<Game> findByOrderByGameTypeDesc(){return gameRepository.findByOrderByGameTypeDesc();}
    public List<Game> findByOrderByFieldDesc(){return gameRepository.findByOrderByFieldDesc();}
    public List<Game> findByOrderByScore1Desc(){return gameRepository.findByOrderByScore1Desc();}
    public List<Game> findByOrderByScore2Desc(){return gameRepository.findByOrderByScore2Desc();}
    public List<Player> findByOrderByTeam1ColourDescTeam1NameDesc(){return gameRepository.findByOrderByTeam1ColourDescTeam1NameDesc();}
    public List<Player> findByOrderByTeam2ColourDescTeam2NameDesc(){return gameRepository.findByOrderByTeam2ColourDescTeam2NameDesc();}
}
