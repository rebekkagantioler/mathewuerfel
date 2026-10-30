# Supabase einrichten

1. Bei [Supabase](https://supabase.com/dashboard) ein kostenloses Projekt anlegen.
2. Im **SQL Editor** den Inhalt von `supabase/schema.sql` ausführen.
3. Unter **Project Settings → API** die Projekt-URL und den **Publishable key** kopieren. Keinen `secret`- oder `service_role`-Schlüssel in die App eintragen.
4. `supabase-config.example.js` zu `supabase-config.js` kopieren, die beiden Werte einsetzen und anschließend die Datei nicht committen.

Die App verwendet einen mindestens sechsstelligen Kinder-PIN, um einen Lernstand zu öffnen oder zu speichern. Der PIN selbst wird nur geprüft; die Datenbank speichert ausschließlich einen sicheren Hash.

Hinweis: Ein PIN-System ist für Lernprofile mit möglichst wenigen persönlichen Daten gedacht. Für besonders schutzbedürftige Daten oder einen breit öffentlichen Einsatz sollte zusätzlich eine Eltern-Anmeldung und ein Schutz gegen automatisierte PIN-Versuche eingerichtet werden.

## Rücksetzen und mehrere Geräte

Nach diesem Update `supabase/schema.sql` erneut im SQL Editor ausführen. Die
bestehenden Profile bleiben erhalten; die beiden Funktionen für Rücksetzcodes
und das zusätzliche Hash-Feld werden ergänzt.

Beim Anlegen ist ein Passwort aus mindestens sechs Ziffern erforderlich. Neue
Profile sind automatisch online verbunden. Auf einem weiteren Gerät „Profil
wiederfinden“ wählen, Namen suchen und Passwort eingeben. Beim Öffnen eines
bereits bekannten Online-Profils wird der aktuelle Stand erneut geladen.

In den Profileinstellungen „Rücksetzcode erstellen“ wählen und den angezeigten
Code als Lehrperson separat aufbewahren. „Passwort vergessen?“ verlangt nach
der Profilauswahl diesen Code und ein neues Passwort. Der Code gilt einmal;
anschließend einen neuen erstellen. Ohne zuvor hinterlegten Code kann die
Lehrperson den Zugang nur über die Datenbankverwaltung wiederherstellen.

Ein Profil bitte jeweils auf einem Gerät zur selben Zeit bearbeiten: gespeichert
wird weiterhin der vollständige Lernstand, parallele Sitzungen werden nicht
zusammengeführt. Bestehende rein lokale Profile lassen sich in ihren
Einstellungen mit einem Passwort online verbinden.
