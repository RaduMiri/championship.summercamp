package com.example.championship.summercamp.controller;

import com.example.championship.summercamp.service.GameServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class GameViewer {
    @Autowired
    private GameServices gameServices;

    @GetMapping({"/listAllGames"})
    public ModelAndView listAllGames() {
        ModelAndView mav = new ModelAndView("list-games");
        mav.addObject("games", gameServices.getAll());
        return mav;
    }
}
