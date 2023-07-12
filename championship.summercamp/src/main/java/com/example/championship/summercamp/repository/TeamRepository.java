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
    //Team findByCaptainID(Integer id);
    //TODO:simultaneous filters?
    //Sorts
//    List<Team> findByOrderByIdAsc(); TODO:Ask if I should make this sort as well or the default sort is ok
    //Asc
    List<Team> findByOrderByNameAsc();
    List<Team> findByOrderByColourAsc();
    //Desc
    List<Team> findByOrderByIdDesc();
    List<Team> findByOrderByNameDesc();
    List<Team> findByOrderByColourDesc();
    //sort by captain id
    //Extra example
    //List<Passenger> findByLastNameOrderBySeatNumberAsc(String lastName);
}
