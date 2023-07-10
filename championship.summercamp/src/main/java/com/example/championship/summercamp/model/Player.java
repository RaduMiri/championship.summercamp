package com.example.championship.summercamp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
    private Integer age;
    @OneToOne(mappedBy = "captain")
    @JsonIgnore
    private Team teamCaptain;
    //This creates a column in player named team_id
    @ManyToOne
    @JoinColumn(foreignKey=@ForeignKey(name = "fk_player_team"))
    private Team team;
}
