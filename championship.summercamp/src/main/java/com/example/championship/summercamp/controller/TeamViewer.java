package com.example.championship.summercamp.controller;

import com.example.championship.summercamp.service.TeamServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class TeamViewer {
    @Autowired
    private TeamServices teamServices;
    @GetMapping("/getTeams")
    public String getTeams(){return "teamTemplate";}
}
