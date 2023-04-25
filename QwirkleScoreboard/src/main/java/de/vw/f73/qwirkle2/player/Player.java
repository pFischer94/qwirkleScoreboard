package de.vw.f73.qwirkle2.player;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;

@Entity
public class Player implements Comparable<Player> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    @Transient
    private int gamePoints;
    private int totalPoints;
    @Transient
    private int turns;
    @Transient
    private int gameBiggestTurn;
    private int totalBiggestTurn;

    public Player() {

    }

    public Player(String name) {
        this.name = name;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getGamePoints() {
        return this.gamePoints;
    }

    public void setGamePoints(int gamePoints) {
        this.gamePoints = gamePoints;
    }

    public int getTotalPoints() {
        return this.totalPoints;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }

    public int getTurns() {
        return this.turns;
    }

    public void setTurns(int turns) {
        this.turns = turns;
    }

    public int getGameBiggestTurn() {
        return this.gameBiggestTurn;
    }

    public void setGameBiggestTurn(int gameBiggestTurn) {
        this.gameBiggestTurn = gameBiggestTurn;
    }

    public int getTotalBiggestTurn() {
        return this.totalBiggestTurn;
    }

    public void setTotalBiggestTurn(int totalBiggestTurn) {
        this.totalBiggestTurn = totalBiggestTurn;
    }

    public String toStringDB() {
        return String.format("%2d  %-12s  %12d  %13d",
                this.id, this.name, this.totalPoints, this.totalBiggestTurn);
    }

    public String toStringGame() {
        return String.format("%-12s  %6d  %4d  %13d",
                this.name, this.gamePoints, this.turns, this.gameBiggestTurn);
    }

    @Override
    public int compareTo(Player o) {
        // 1 --> no switch
        if (this.gamePoints != o.gamePoints) {
            return o.gamePoints - this.gamePoints;
        } else if (this.turns != o.turns) {
            return this.turns - o.turns;
        } else if (this.gameBiggestTurn != o.gameBiggestTurn) {
            return o.gameBiggestTurn - this.gameBiggestTurn;
        } else {
            return 1;
        }
    }

}
