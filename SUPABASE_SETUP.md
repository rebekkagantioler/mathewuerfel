# Supabase einrichten

1. Bei [Supabase](https://supabase.com/dashboard) ein kostenloses Projekt anlegen.
2. Im **SQL Editor** den Inhalt von `supabase/schema.sql` ausführen.
3. Unter **Project Settings → API** die Projekt-URL und den **Publishable key** kopieren. Keinen `secret`- oder `service_role`-Schlüssel in die App eintragen.
4. `supabase-config.example.js` zu `supabase-config.js` kopieren, die beiden Werte einsetzen und anschließend die Datei nicht committen.

Die App verwendet einen mindestens sechsstelligen Kinder-PIN, um einen Lernstand zu öffnen oder zu speichern. Der PIN selbst wird nur geprüft; die Datenbank speichert ausschließlich einen sicheren Hash.

Hinweis: Ein PIN-System ist für Lernprofile mit möglichst wenigen persönlichen Daten gedacht. Für besonders schutzbedürftige Daten oder einen breit öffentlichen Einsatz sollte zusätzlich eine Eltern-Anmeldung und ein Schutz gegen automatisierte PIN-Versuche eingerichtet werden.
