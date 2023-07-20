package com.example.championship.summercamp.repository;

import com.example.championship.summercamp.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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
    List<Player> findByTeamCaptainIsNotNull();
    @Query("SELECT p FROM Player p WHERE " +
            "p.firstName = :searchString " +
            "OR p.lastName = :searchString " +
            "OR p.age = :age " +
            "OR p.number = :number " +
            "OR p.team.name = :searchString " +
            "OR p.team.colour = :searchString")
    List<Player> findBySearchStringAndAgeAndNumber(String searchString, Integer age, Integer number);
    Boolean existsByTeamCaptainId(Integer playerId);

    //Sorts
    List<Player> findByOrderByFirstNameAsc();
    List<Player> findByOrderByLastNameAsc();
    List<Player> findByOrderByAgeAsc();
    List<Player> findByOrderByNumberAsc();
    List<Player> findByOrderByTeamColourAscTeamNameAsc();

    List<Player> findByOrderByIdDesc();
    List<Player> findByOrderByFirstNameDesc();
    List<Player> findByOrderByLastNameDesc();
    List<Player> findByOrderByAgeDesc();
    List<Player> findByOrderByNumberDesc();
    List<Player> findByOrderByTeamColourDescTeamNameDesc();
}
