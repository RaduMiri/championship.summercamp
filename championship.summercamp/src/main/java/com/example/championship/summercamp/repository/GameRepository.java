package com.example.championship.summercamp.repository;

import com.example.championship.summercamp.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {
    //Filters
    List<Game> findByGameType(String gameType);
    List<Game> findByField(String field);
    List<Game> findByScore1(Integer score1);
    List<Game> findByScore2(Integer score2);
    //TODO:team ids MAYBE JUST USE TO COPY TEAM WHATEVER AND SEE, or google it idk
    //team1 id
    //team2 id

    //Sorts
    List<Game> findByOrderByGameTypeAsc();
    List<Game> findByOrderByFieldAsc();
    List<Game> findByOrderByScore1Asc();
    List<Game> findByOrderByScore2Asc();
    //team1
    //team2

    List<Game> findByOrderByIdDesc();
    List<Game> findByOrderByGameTypeDesc();
    List<Game> findByOrderByFieldDesc();
    List<Game> findByOrderByScore1Desc();
    List<Game> findByOrderByScore2Desc();
    //team1
    //team2
}
