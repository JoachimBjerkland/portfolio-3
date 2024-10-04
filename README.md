# portfolio-3

1.3 Cookies og mellomvare
COOKIES SJEKK: console.log(document.cookie)

Ny cookie med navnet user.role og verdien admin i consollen, under application -> cookie

--------------------------------------------------------------------------------------------------------------


Ved feilmelding av cookie:
Backend: npm install cookie-parser

Frontend: npm install js-cookie

--------------------------------------------------------------------------------------------------------------


1.3 Vurder komponent komposisjonen:


1. Splitting av komponenter

Del opp større komponenter som project-list og project-form inn i egne, separate komponenter.

Fordeler:
Økt gjenbrukbarhet: Ved å bryte ned større komponenter i mindre, mer spesialiserte komponenter, kan de brukes flere steder i applikasjonen.
Bedre oversikt: Koden blir mer modulær og lettere å forstå og vedlikeholde.
Enklere testing: Hver komponent kan testes individuelt.



Ulemper:
Flere filer og mapper: Dette kan føre til en mer kompleks mappestruktur med mange små filer.
Kan virke overflødig: Hvis komponentene ikke skal brukes om igjen, kan det virke unødvendig å splitte dem opp.

--------------------------------------------------------------------------------------------------------------

2. Bruk av "State Management"


Introduksjon av global state management (f.eks. med React Context eller Redux) for å håndtere tilstanden i applikasjonen, spesielt for data som skal deles mellom flere komponenter.

Fordeler:
Sentralisert datatilstand: Alle komponenter har tilgang til nødvendig data uten å måtte sende props gjennom flere komponentnivåer.
Bedre kontroll: Det blir enklere å oppdatere data og spore tilstanden gjennom applikasjonen.



Ulemper:
Økt kompleksitet: Bruk av state management introduserer en viss læringskurve og mer kode for å sette opp og administrere.
Overflødig for små applikasjoner: For en liten applikasjon med få komponenter kan det være unødvendig.

--------------------------------------------------------------------------------------------------------------

3. Håndtering av formtilstand med egne hooks

Flytt logikken for håndtering av skjemaet i project-form til en egen hook (useForm), i stedet for å ha alt i selve komponenten.

Fordeler:
Renere komponent: Skjemakomponenten blir mer fokuserte på visning, mens tilstandshåndtering flyttes til en dedikert hook.
Gjenbrukbarhet: Hooks kan brukes på tvers av flere skjemaer, hvis det er flere lignende skjemaer i applikasjonen.



Ulemper:
Abstraksjon: Flytting av tilstandslogikk til hooks kan gjøre komponenten vanskeligere å forstå for de som ikke er kjent med custom hooks.
Mindre direkte kobling: Logikken blir mer indirekte når den er i en separat hook.
