package com.example.championship.summercamp.service;

import com.example.championship.summercamp.model.Player;
import com.example.championship.summercamp.repository.PlayerRepository;
import com.example.championship.summercamp.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class PlayerServices {
    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private TeamRepository teamRepository;

    public Player createPlayer(Player newPlayer){return playerRepository.save(newPlayer);}

    public Player updatePlayer(Player newPlayer, Integer id){
        Player dbPlayer = playerRepository.getOne(id);
        if(newPlayer.getFirstName()!=null)
            dbPlayer.setFirstName(newPlayer.getFirstName());
        if(newPlayer.getLastName()!=null)
            dbPlayer.setLastName(newPlayer.getLastName());
        if(newPlayer.getTeam()!=null)
            dbPlayer.setTeam(newPlayer.getTeam());
        if(newPlayer.getAge()!=null)
            dbPlayer.setAge(newPlayer.getAge());
        if(newPlayer.getNumber()!=null)
            dbPlayer.setNumber(newPlayer.getNumber());
        return playerRepository.save(dbPlayer);
    }

    public void deletePlayer(Integer id){
        playerRepository.deleteById(id);
    }
    public void deleteAllPlayers(){playerRepository.deleteAll();}

    //Filters
    public Player getOne(Integer id){return playerRepository.findById(id).get();}
    public List<Player> findByFirstName(String firstName){return playerRepository.findByFirstName(firstName);}
    public List<Player> findByLastName(String lastName){return playerRepository.findByLastName(lastName);}
    public List<Player> findByNumber(Integer number){return playerRepository.findByNumber(number);}
    public List<Player> findByAge(Integer age){return playerRepository.findByAge(age);}
    public List<Player> findByTeamCaptainId(Integer teamCaptainId){return playerRepository.findByTeamCaptainId(teamCaptainId);}
    public List<Player> findByTeamId(Integer teamId){return playerRepository.findByTeamId(teamId);}
    public List<Player> findByFirstNameLastNameAgeNumberTeamNameTeamColour(String string) {
        Integer age = parsePositiveInteger(string);
        Integer number = age != null ? age : parsePositiveInteger(string);
        return playerRepository.findBySearchStringAndAgeAndNumber(string, age, number);
    }
    private Integer parsePositiveInteger(String str) {
        try {
            int intValue = Integer.parseInt(str);
            return intValue > 0 ? intValue : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }
    public Boolean isPlayerCaptain(Integer playerId) {return teamRepository.existsByCaptainId(playerId);}
    public List<Player> findByTeamCaptainIsNull(){return playerRepository.findByTeamCaptainIsNull();}
    public List<Player> findByTeamCaptainIsNotNull(){return playerRepository.findByTeamCaptainIsNotNull();}

    //Sorts
    public List<Player> getAll(){
        return playerRepository.findAll();
    }
    public List<Player> findByOrderByFirstNameAsc(){return playerRepository.findByOrderByFirstNameAsc();}
    public List<Player> findByOrderByLastNameAsc(){return playerRepository.findByOrderByLastNameAsc();}
    public List<Player> findByOrderByAgeAsc(){return playerRepository.findByOrderByAgeAsc();}
    public List<Player> findByOrderByNumberAsc(){return playerRepository.findByOrderByNumberAsc();}
    public List<Player> findByOrderByTeamColourAscTeamNameAsc(){return playerRepository.findByOrderByTeamColourAscTeamNameAsc();}


    public List<Player> findByOrderByIdDesc(){return playerRepository.findByOrderByIdDesc();}
    public List<Player> findByOrderByFirstNameDesc(){return playerRepository.findByOrderByFirstNameDesc();}
    public List<Player> findByOrderByLastNameDesc(){return playerRepository.findByOrderByLastNameDesc();}
    public List<Player> findByOrderByAgeDesc(){return playerRepository.findByOrderByAgeDesc();}
    public List<Player> findByOrderByNumberDesc(){return playerRepository.findByOrderByNumberDesc();}
    public List<Player> findByOrderByTeamColourDescTeamNameDesc(){return playerRepository.findByOrderByTeamColourDescTeamNameDesc();}
}
