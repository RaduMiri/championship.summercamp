package com.example.championship.summercamp.controller;

import com.example.championship.summercamp.service.GameServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GameViewer {
    @Autowired
    private GameServices gameServices;

    @GetMapping("/getGames")
    public String getGames(){return "gameTemplate";}
}
