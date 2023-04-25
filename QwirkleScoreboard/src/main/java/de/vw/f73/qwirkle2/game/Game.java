package de.vw.f73.qwirkle2.game;

import java.util.List;

import org.springframework.stereotype.Component;

import de.vw.f73.qwirkle2.player.Player;

@Component
public class Game {

    private List<Player> players;

    public Game(List<Player> players) {
        this.players = players;
    }

    public List<Player> getPlayers() {
        return this.players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

}
