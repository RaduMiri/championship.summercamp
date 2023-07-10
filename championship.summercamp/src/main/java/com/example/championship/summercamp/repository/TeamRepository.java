package com.example.championship.summercamp.repository;

import com.example.championship.summercamp.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    List<Team> findByName(String name);
    //TODO:Filter methods just like find methods
}
