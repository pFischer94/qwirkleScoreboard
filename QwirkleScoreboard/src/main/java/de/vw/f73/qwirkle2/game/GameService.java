package de.vw.f73.qwirkle2.game;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import de.vw.f73.qwirkle2.move.Move;
import de.vw.f73.qwirkle2.player.Player;
import de.vw.f73.qwirkle2.player.PlayerRepository;
import de.vw.f73.qwirkle2.player.PlayerService;
import de.vw.f73.qwirkle2.utils.Inputs;

@Service
public class GameService {

    @Value("${valueName}")
    String valueName;

    private PlayerRepository repo;
    private PlayerService playerService;

    private int amountOfPlayers;
    private List<Player> playersInDB;
    private StringBuilder playerRegex = new StringBuilder();
    private List<Player> playersGame = new ArrayList<>();
    private String input;
    private String prompt;
    private static int EMPTY_LINES = 20;
    private List<Move> moves = new ArrayList<>();

    public GameService(PlayerRepository repo, PlayerService playerService) {
        this.repo = repo;
        this.playerService = playerService;
    }

    public void start() {
        System.out.println(this.valueName);

        setup();
        routine();
        end();
    }

    public void setup() {
        for (int i = 0; i < EMPTY_LINES; i++) {
            System.out.println();
        }
        System.out.println("Herzlich Willkommen in der Qwirkle Dokumentation!");
        printAllPlayersInDB();
        this.playerRegex.deleteCharAt(this.playerRegex.length() - 1);

        this.prompt = "Bitte die Anzahl der Spieler:innen eingeben: ";
        int position;
        this.amountOfPlayers = Integer.parseInt(Inputs.readString(this.prompt, "[2-9]"));
        for (int i = 0; i < this.amountOfPlayers; i++) {
            this.prompt = String.format("Bitte ID von Spieler:in %d oder \"Neu\" eingeben: ", i + 1);
            this.input = Inputs.readString(this.prompt, this.playerRegex.toString() + "|Neu");
            if (this.input.equals("Neu")) {
                this.prompt = "Bitte den neuen Namen eingeben: ";
                this.input = Inputs.readString(this.prompt).trim();
                this.playersGame.add(this.playerService.createPlayer(this.input));
            } else {
                this.playersGame.add(this.repo.findById(Integer.parseInt(this.input)).get());
                position = this.playerRegex.indexOf(this.input);
                this.playerRegex.replace(position, position + this.input.length(),
                        "notSelectableNotSelectableNotSelectab");
            }
        }
    }

    private void printAllPlayersInDB() {
        this.playersInDB = this.repo.findAll();
        System.out.println("\nAlle SpielerInnen:");
        System.out.printf("%3s  %-12s  %-12s  %-13s %n",
                "ID", "Name", "Gesamtpunkte", "Stärkster Zug");
        for (Player player : this.playersInDB) {
            System.out.println(player.toStringDB());
            this.playerRegex.append(player.getId()).append("|");
        }
        System.out.println();
    }

    void routine() {
        Player player;
        int points;
        do {
            for (int i = 0; i < this.playersGame.size(); i++) {
                player = this.playersGame.get(i);
                printScore();
                this.prompt = String.format("%s's Punkte: ", player.getName());
                this.input = Inputs.readString(this.prompt, "[1-9][0-9]?|Ende|Korrektur");
                if (this.input.equals("Ende")) {
                    break;
                } else if (this.input.equals("Korrektur")) {
                    i = (i + this.playersGame.size() - 1) % this.playersGame.size();
                    if (this.moves.size() == 0) {
                        continue;
                    }
                    player = this.playersGame.get(i);
                    player.undoMove(this.moves.get(this.moves.size() - 1));
                    this.repo.save(player);
                    this.moves.remove(this.moves.size() - 1);
                    i = (i + this.playersGame.size() - 1) % this.playersGame.size();
                } else {
                    points = Integer.parseInt(this.input);
                    this.moves.add(new Move(points, player.getGameBiggestTurn(), player.getTotalBiggestTurn()));
                    this.playerService.addPoints(player, points);
                }
            }
        } while (!this.input.equals("Ende"));
    }

    void end() {
        for (Player player : this.playersGame) {
            printScore();
            this.prompt = String.format("%s's Minuspunkte: ", player.getName());
            this.input = Inputs.readString(this.prompt, "[1-6]|0");
            this.playerService.deductPoints(player, Integer.parseInt(this.input));
        }
        Collections.sort(this.playersGame);
        printFinalScore();
        printAllPlayersInDB();
        System.out.println();
        reset();
    }

    private void reset() {
        this.playersGame = new ArrayList<>();
        this.amountOfPlayers = 0;
        this.playersInDB = null;
        this.playerRegex = new StringBuilder();
        this.input = null;
        this.prompt = null;
    }

    private void printScore() {
        for (int i = 0; i < EMPTY_LINES; i++) {
            System.out.println();
        }
        System.out.println("Aktueller Spielstand:");
        System.out.printf("%-12s  %-6s  %-4s  %-13s %n",
                "Name", "Punkte", "Züge", "Stärkster Zug");
        for (Player player : this.playersGame) {
            System.out.println(player.toStringGame());
        }
        System.out.println();
    }

    private void printFinalScore() {
        for (int i = 0; i < EMPTY_LINES; i++) {
            System.out.println();
        }
        System.out.println("Endergebnis:");
        System.out.printf("%-12s  %-6s  %-4s  %-13s %n",
                "Name", "Punkte", "Züge", "Stärkster Zug");
        for (Player player : this.playersGame) {
            System.out.println(player.toStringGame());
        }
        System.out.printf("%nHerzlichen Glückwunsch %s!%n%n", this.playersGame.get(0).getName());
    }

}
