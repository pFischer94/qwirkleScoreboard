package de.vw.f73.qwirkle2.move;

public class Move {

    private int points;
    private int previousGameBiggestTurn;
    private int previousTotalBiggestTurn;

    public Move(int points, int previousGameBiggestTurn, int previousTotalBiggestTurn) {
        this.points = points;
        this.previousGameBiggestTurn = previousGameBiggestTurn;
        this.previousTotalBiggestTurn = previousTotalBiggestTurn;
    }

    public int getPreviousGameBiggestTurn() {
        return this.previousGameBiggestTurn;
    }

    public void setPreviousGameBiggestTurn(int previousGameBiggestTurn) {
        this.previousGameBiggestTurn = previousGameBiggestTurn;
    }

    public int getPreviousTotalBiggestTurn() {
        return this.previousTotalBiggestTurn;
    }

    public void setPreviousTotalBiggestTurn(int previousTotalBiggestTurn) {
        this.previousTotalBiggestTurn = previousTotalBiggestTurn;
    }

    public int getPoints() {
        return this.points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    @Override
    public String toString() {
        return "\nMove [points=" + this.points + ", previousGameBiggestTurn=" + this.previousGameBiggestTurn
                + ", previousTotalBiggestTurn=" + this.previousTotalBiggestTurn + "]";
    }

}
