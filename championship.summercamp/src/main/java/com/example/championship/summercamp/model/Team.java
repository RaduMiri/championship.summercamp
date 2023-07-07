package com.example.championship.summercamp.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//We are not allowed to use two constructors?
@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @OneToMany(mappedBy = "team1")
    private List<Game> game_team_1;
    @OneToMany(mappedBy = "team2")
    private List<Game> game_team_2;
}