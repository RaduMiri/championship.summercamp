package com.example.championship.summercamp.repository;

import com.example.championship.summercamp.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    //Filters
    List<Team> findByName(String name);
    List<Team> findByColour(String colour);
    List<Team> findByCaptainFirstName(String firstName);
    List<Team> findByCaptainLastName(String lastName);
    Boolean existsByCaptainId(Integer playerId);
    //TODO: JPA contains
    //Sorts
    //Asc
    List<Team> findByOrderByNameAsc();
    List<Team> findByOrderByColourAsc();
    List<Team> findByOrderByCaptainFirstNameAscCaptainLastNameAsc();
    //Desc
    List<Team> findByOrderByIdDesc();
    List<Team> findByOrderByNameDesc();
    List<Team> findByOrderByColourDesc();
    List<Team> findByOrderByCaptainFirstNameDescCaptainLastNameDesc();
    //Extra example
    //List<Passenger> findByLastNameOrderBySeatNumberAsc(String lastName);
}
