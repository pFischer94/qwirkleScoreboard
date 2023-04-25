package de.vw.f73.qwirkle2.player;

import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    private PlayerRepository repo;

    public PlayerService(PlayerRepository repo) {
        this.repo = repo;
    }

    public Player createPlayer(String name) {
        Player player = new Player(name);
        return this.repo.save(player);
    }

    public void addPoints(Player player, int points) {
        player.setGamePoints(player.getGamePoints() + points);
        player.setTurns(player.getTurns() + 1);
        player.setTotalPoints(player.getTotalPoints() + points);
        if (player.getGameBiggestTurn() < points) {
            player.setGameBiggestTurn(points);
        }
        if (player.getTotalBiggestTurn() < points) {
            player.setTotalBiggestTurn(points);
        }
        this.repo.save(player);
    }

    public void deductPoints(Player player, int points) {
        player.setGamePoints(player.getGamePoints() - points);
        player.setTotalPoints(player.getTotalPoints() - points);
        this.repo.save(player);
    }

}
