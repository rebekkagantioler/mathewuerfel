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

## Passwort im Lehrpersonenbereich zurücksetzen

Einmalig das aktualisierte `supabase/schema.sql` im SQL Editor ausführen.
Danach einen eigenen, langen Lehrpersonen-Schlüssel setzen (Platzhalter ersetzen):

```sql
insert into public.teacher_reset_settings (id, secret_hash)
values (true, extensions.crypt('HIER-EIGENEN-LANGEN-SCHLUESSEL-EINSETZEN', extensions.gen_salt('bf')))
on conflict (id) do update set secret_hash=excluded.secret_hash;
```

Den Schlüssel nur bei der Lehrperson aufbewahren; nicht in die App-Konfiguration
schreiben. Er ist unabhängig vom bisherigen Code zum Öffnen des Lehrpersonenbereichs.
Falls pgcrypto im Schema `public` installiert ist, im obigen SQL `extensions.crypt`
und `extensions.gen_salt` durch `public.crypt` und `public.gen_salt` ersetzen.

Im Lehrpersonenbereich das bekannte Online-Profil auswählen und „Einmalcode erstellen“
anklicken. Nach Eingabe des Lehrpersonen-Schlüssels erscheint ein 16-stelliger Code.
Das Kind gibt ihn beim Öffnen seines Profils anstelle des Passworts ein. Danach
wird es nach einem neuen Passwort und dessen Bestätigung gefragt. Der Code gilt
24 Stunden, ersetzt einen bisherigen Rücksetzcode und wird nach erfolgreicher
Änderung ungültig. Lernstände bleiben erhalten. Bei Abbruch bleibt der Code gültig.
Das alte Passwort bleibt bis zum erfolgreichen Ändern gültig.

Nach der Einrichtung mit einem Testprofil prüfen: falscher Lehrpersonen-Schlüssel,
Code erstellen, Eingabe über beide Profil-Anmeldewege, Abbruch und unterschiedliche
Passwortbestätigung, erfolgreiche Änderung, erneute Verwendung des verbrauchten
Codes, Anmeldung mit altem/neuem Passwort und unveränderter Lernstand.

## Alle Profile für Lehrpersonen

Nach erneutem Ausführen von `supabase/schema.sql` im Lehrpersonenbereich
„Alle Online-Profile laden / aktualisieren“ wählen und den oben eingerichteten
Lehrpersonen-Schlüssel eingeben. Die Liste umfasst alle Online-Profile dieses
Supabase-Projekts. Gleiche Namen werden durch Level, eine Profilkennung und das
Datum der letzten Speicherung unterschieden. Die Profile werden nicht zur
Startseite der Kinder hinzugefügt und nicht lokal gespeichert. Der Schlüssel
bleibt nur während der geöffneten App im Arbeitsspeicher.
Aufträge und Minus-Einstellungen lassen sich für diese Profile online speichern.
Die Liste lässt sich über denselben Knopf aktualisieren. Rein lokale Profile
anderer Geräte sind erst nach ihrer Online-Verbindung verfügbar.

## Zuverlässige Online-Speicherung

Jede Änderung eines verbundenen Profils wird sofort in einer dauerhaften
Warteschlange vorgemerkt und nach kurzer Wartezeit online gesendet. Fehlversuche
werden wiederholt; Internet-Rückkehr und Öffnen der App lösen weitere Versuche aus.
Die Warteschlange enthält Lernstände, aber keine Passwörter. Nach einem Neustart
muss das betroffene Profil mit seinem Passwort geöffnet werden, bevor wartende
Änderungen hochgeladen werden können. Bis dahin wird es als ungesichert angezeigt.
„Lernstand online gespeichert“ erscheint erst nach erfolgreicher Online-Speicherung.

Alte rein lokale Profile müssen vor dem Weiterspielen online verbunden werden;
der bisherige Lernstand wird dabei mit übernommen. Bei bereits verbundenen
Profilen wird vor dem Ersetzen eines höheren lokalen Stands durch einen niedrigeren
Online-Stand die Sicherung des höheren Stands angeboten. Abbrechen behält den
Stand auf dem Gerät. Ausstehende Änderungen verhindern die automatische
App-Aktualisierung und das Entfernen des betroffenen Profils vom Gerät.
Für diese Verbesserungen ist kein weiteres SQL-Update nötig.

Beim Übergang von älteren App-Versionen auf dem betroffenen iPad aktualisieren,
dann das vorhandene Profil öffnen. Falls die App einen höheren Stand auf dem
Gerät meldet, dessen Online-Sicherung bestätigen. Erst nach bestätigter
Online-Speicherung den Stand auf einem anderen Gerät prüfen. Die Änderung allein
stellt bisher nur lokal gespeicherte Lernstände nicht aus der Ferne wieder her.

Einmalcodes erscheinen zusätzlich in einem auswählbaren Textfeld mit
„Code kopieren“. Falls die Zwischenablage nicht freigegeben ist, lässt sich
der markierte Code über das Kopiermenü des Geräts übernehmen. Beim Wechsel
des ausgewählten Profils wird der angezeigte Code entfernt.
