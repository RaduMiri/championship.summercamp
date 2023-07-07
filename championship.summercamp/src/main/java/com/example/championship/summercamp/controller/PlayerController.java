package com.example.championship.summercamp.controller;

import com.example.championship.summercamp.model.Player;
import com.example.championship.summercamp.service.PlayerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/player")
public class PlayerController {
    @Autowired
    private PlayerServices playerServices;

    @GetMapping("/one/{id}")
    public Player getPlayer(@PathVariable Integer id){
        return playerServices.getOne(id);
    }
}
