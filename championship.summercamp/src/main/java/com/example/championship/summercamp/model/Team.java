package com.example.championship.summercamp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @OneToMany(mappedBy = "team")
    @JsonIgnore
    private List<Player> players;
    @OneToMany(mappedBy = "team1")
    @JsonIgnore
    private List<Game> game_team_1;
    @OneToMany(mappedBy = "team2")
    @JsonIgnore
    private List<Game> game_team_2;
}