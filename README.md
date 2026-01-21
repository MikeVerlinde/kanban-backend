# Applicatie
<img width="1728" height="1117" alt="image" src="https://github.com/user-attachments/assets/4ee72a96-ed84-44c7-ad17-3eef440ecded" />
<img width="1660" height="1027" alt="image" src="https://github.com/user-attachments/assets/057913aa-bf7d-4969-8452-962da7b08a85" />
https://github.com/user-attachments/assets/524ef546-8ae1-4be9-965f-390882cf4b9d

De applicatie maakt gebruik van de volgende technologieën:

- **Frontend:** Nextjs, React, Tailwind, Typescript
- **Backend:** Nestjs, Typescript, Docker
- **Database:** MySQL, Prisma ORM, Docker

De applicatie voldoet aan alle eisen, beschreven als:

- Tickets maken met prioriteit, titel en beschrijving
- Tickets verplaatsen naar andere lanes
- Live data via websockets
- (Optioneel) Lanes maken
- (Optioneel) Drag & drop voor het verplaatsen van tickets
- (Optioneel) Authenticatie
- (Optioneel) User assignen aan ticket

# Setup
Start eerst de backend, daarna de frontend, beide volgens onderstaande instructies.
### Backend
- Clone the backend repository:
```git clone [https/ssh url]```

- Start de API en database:
```docker-compose up -d```

- Open sh in de docker container:
```docker exec -it kanban-api sh```

- Push de database structuur van Prisma schema naar de database (in dit geval nodig omdat de kanban_user geen permissie heeft om de shadow DB aan te maken. In production gebruik je normaliter Prisma migrations in the CI/CD). 
```npx prisma db push```

- Run de seed:
```npx prisma db seed```

De API en database staan nu klaar.

### Frontend
Clone de frontend repository:
```git clone [https/ssh url]```

Installeer de dependencies:
```npm i```

Build de frontend:
```npm run build```

Start de frontend:
```npm run start```

De frontend staat nu klaar. 

### Applicatie testen
- Ga naar de browser en open `http://localhost:3000`
- Login met de gebruikersnaam `Mike` en het wachtwoord `Mike123!`

### Disclaimer en overwegingen
Gebruik deze repository niet in productie. Het is een proof-of-concept, die wegens restricties in tijd en scope, niet alle best practices toepast die noodzakelijk zijn voor productie. Hieronder een aantal overwegingen:

#### Authenticatie en authorizatie
De app maakt gebruik van een eenvoudige password-based authenticatie implementatie. De wachtwoorden worden gehashed en geverifieerd met behulp van Argon2id. In productie wordt Knowledge Based Auhtentication (KBA), waaronder wachtwoorden vallen, afgeraden door de NIST. In plaats daarvan dient men te gaan voor Evidence Based Authentication (EBA), zoals biometrics of een One-Time Password gegenereerd door een fysiek apparaat, in combinatie met maatregelen zoals rate limiting, of voor protocollen als OAuth 2.0. De app maakt gebruik van JWT tokens opgeslagen in een cookie wat, in tegenstelling tot session-based, stateless is. 

#### Database
De applicatie maakt gebruik van de MySQL database, gerunt in een Docker container met volume. Dit biedt een snelle en overdraagbare opzet voor een demo als deze, maar wordt niet aangeraden in productie, gezien Docker containers niet zijn ontworpen voor data persistency en reliability over lange periodes van tijd. Tevens wordt voor grote hoeveelheden data in productie aangeraden om, waar van toepassing, indexes te gebruiken.

#### Frontend
De app gebruikt, zoals aangeraden door de nieuwere versies van React en Nextjs, een combinatie van server- en client-components. Voor het automatisch redirecten van niet-ingelogde gebruikers wordt de Nextjs proxy gebruikt. Voor productie applicaties worden on andere de volgende technieken aangeraden: cached components voor snellere laadtijden, suspense boundaries voor fallbacks tijdens het laden, error boundaries voor fallbacks in het geval van een error, uitgebreidere error handling van de fetches (niet door errors the throwen, maar door info te returnen), etc.
