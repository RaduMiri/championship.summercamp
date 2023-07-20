package com.example.championship.summercamp.repository;

import com.example.championship.summercamp.model.Game;
import com.example.championship.summercamp.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {
    //Filters
    List<Game> findByGameType(String gameType);
    List<Game> findByField(String field);
    List<Game> findByScore1(Integer score1);
    List<Game> findByScore2(Integer score2);
    @Query("SELECT p FROM Game p WHERE " +
            "p.gameType = :searchString " +
            "OR p.field = :searchString " +
            "OR p.score1 = :score1 " +
            "OR p.score2 = :score2 " +
            "OR p.team1.name = :searchString " +
            "OR p.team1.colour = :searchString " +
            "OR p.team2.name = :searchString " +
            "OR p.team2.colour = :searchString" )
    List<Game> findByGameTypeFieldScore1Score2Team1NameTeam1ColourTeam2NameTeam2Colour(String searchString, Integer score1, Integer score2);

    //Sorts
    List<Game> findByOrderByGameTypeAsc();
    List<Game> findByOrderByFieldAsc();
    List<Game> findByOrderByScore1Asc();
    List<Game> findByOrderByScore2Asc();
    List<Player> findByOrderByTeam1ColourAscTeam1NameAsc();
    List<Player> findByOrderByTeam2ColourAscTeam2NameAsc();

    List<Game> findByOrderByIdDesc();
    List<Game> findByOrderByGameTypeDesc();
    List<Game> findByOrderByFieldDesc();
    List<Game> findByOrderByScore1Desc();
    List<Game> findByOrderByScore2Desc();
    List<Player> findByOrderByTeam1ColourDescTeam1NameDesc();
    List<Player> findByOrderByTeam2ColourDescTeam2NameDesc();
}
