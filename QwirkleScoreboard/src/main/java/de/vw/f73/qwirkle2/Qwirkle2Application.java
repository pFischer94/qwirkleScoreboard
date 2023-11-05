package de.vw.f73.qwirkle2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import de.vw.f73.qwirkle2.game.GameService;

@SpringBootApplication
public class Qwirkle2Application {

    @Autowired
    GameService gameService;

    public static void main(String[] args) {
        SpringApplication.run(Qwirkle2Application.class, args);

        // Alternative, um GameService über RestTemplate zu starten, führt aber zu Fehlern beim Beenden
        // RestTemplate braucht hier absolute URL inkl. http://
        // TestRestTemplate ruft auf sich selber (eigene Applikation) auf
        // RestTemplate ruft auf beliebige (externe) Adressen auf --> muss absolut sein
//        RestTemplate restTemplate = new RestTemplate();
//        restTemplate.getForObject("http://localhost:8080/game/start", Void.class);

        // funktioniert nicht, weil dann nicht gameService aus Spring context genutzt wird
//        Qwirkle2Application app = new Qwirkle2Application();
//        app.start();
    }

    // hier aktivieren für AutoStart auf Konsole
//    @PostConstruct
//    private void start() {
//        String prompt;
//        String input = "Ja";
//        do {
//            this.gameService.start();
//            prompt = "Nochmal? ";
//            input = Inputs.readString(prompt);
//        } while (input.equals("Ja"));
//        System.out.println("\nAuf Wiedersehen!\n\n");
//    }

}
