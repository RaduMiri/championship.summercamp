package com.example.championship.summercamp.repository;

import com.example.championship.summercamp.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {
    //Filters
    List<Player> findByFirstName(String firstName);
    List<Player> findByLastName(String lastName);
    List<Player> findByAge(Integer age);
    List<Player> findByNumber(Integer number);
    List<Player> findByTeamCaptainId(Integer teamCaptainId); //for nested objects just mention the attribute you want to execute the search by
    List<Player> findByTeamId(Integer teamId);

    List<Player> findByTeamCaptainIsNull();
    //Sorts
    //TODO:Sorts by teamcap and team, now that I know they work
    List<Player> findByOrderByFirstNameAsc();
    List<Player> findByOrderByLastNameAsc();
    List<Player> findByOrderByAgeAsc();
    List<Player> findByOrderByNumberAsc();

    List<Player> findByOrderByIdDesc();
    List<Player> findByOrderByFirstNameDesc();
    List<Player> findByOrderByLastNameDesc();
    List<Player> findByOrderByAgeDesc();
    List<Player> findByOrderByNumberDesc();
}
