package com.example.championship.summercamp.service;

import com.example.championship.summercamp.model.Player;
import com.example.championship.summercamp.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerServices {
    @Autowired
    private PlayerRepository playerRepository;

    public Player getOne(Integer id){
        return playerRepository.findById(id).get();
    }

    public List<Player> getAll(){
        return playerRepository.findAll();
    }

    public Player createPlayer(Player newPlayer){

        return playerRepository.save(newPlayer);
    }

    public Player updatePlayer(Player newPlayer, Integer id){
        if(playerRepository.existsById(id)==false) //can be simplified to !playerRepository.existsById(id)
            return null; //print message somehow
        Player dbPlayer = playerRepository.getOne(id); //getOne is deprecated, it says?
        if(newPlayer.getFirstName()!=null)
            dbPlayer.setFirstName(newPlayer.getFirstName());
        if(newPlayer.getLastName()!=null)
            dbPlayer.setLastName(newPlayer.getLastName());
        if(newPlayer.getTeam()!=null)
        {
            //
            dbPlayer.setTeam(newPlayer.getTeam());
        }
        if(newPlayer.getAge()!=null)
            dbPlayer.setAge(newPlayer.getAge());
        return playerRepository.save(dbPlayer);
    }

    public void deletePlayer(Integer id) { playerRepository.deleteById(id); }

    public void deleteAllPlayers(){playerRepository.deleteAll();}

//    public List<Player> filterByFirstName(String firstName)
//    {
//        return playerRepository.findAll);
//    }
}
