package de.vw.f73.qwirkle2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class Qwirkle2Application {

    public static void main(String[] args) {
        SpringApplication.run(Qwirkle2Application.class, args);
        // check, wie direkter Start ohne SwaggerUI?
        // RestTemplate braucht hier absolute URL inkl. http://
        // TestRestTemplate ruft auf sich selber (eigene Applikation) auf
        // RestTemplate ruft auf beliebige (externe) Adressen auf --> muss absolut sein

        // Exception in thread "restartedMain" java.lang.reflect.InvocationTargetException
        // java.lang.IllegalArgumentException: URI is not absolute

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getForObject("http://localhost:8080/game/start", Void.class);
    }

}
