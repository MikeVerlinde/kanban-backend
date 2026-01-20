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

- Push de database structuur van Prisma schema naar de database (in dit geval nodig omdat de kanban_user geen permissie heeft om de shadow DB aan te maken. in production gebruik je normaliter Prisma migrations in the CI/CD). 
```npx prisma db push```

- Run de seed:
```npx prisma db seed```

De API en database staan nu klaar.

### Frontend
Clone de frontend repository:
```git clone [https/ssh url]```

Build de frontend:
```npm run build```

Start de frontend:
```npm run start```

De frontend staat nu klaar. 

### Applicatie testen
- Ga naar de browser en open `http://localhost:3000`
- Login met de gebruikersnaam `Mike` en het wachtwoord `Mike123!`

### Disclaimer
Gebruik deze repository niet in productie. Het is een proof-of-concept, die wegens restricties in tijd, niet alle best practices toepast die noodzakelijk zijn voor productie.
