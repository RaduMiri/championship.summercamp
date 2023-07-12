package com.example.championship.summercamp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String gameType;
    private String field;
    private Integer score1;
    private Integer score2;
    @ManyToOne
    @JoinColumn (name = "team1")
    private Team team1;
    @ManyToOne
    @JoinColumn (name = "team2")
    private Team team2;

    //time TODO:research
    //field
}

