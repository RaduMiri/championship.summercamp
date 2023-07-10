package com.example.championship.summercamp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @OneToOne
    @JoinColumn(name = "captain_id", referencedColumnName = "id")
    private Player captain; //TODO: Captain should not be able to be assigned to a diffrent team
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